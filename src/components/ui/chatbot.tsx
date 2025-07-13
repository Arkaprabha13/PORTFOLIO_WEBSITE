import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Minimize2, Maximize2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatService } from '@/lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
}

// Custom markdown components for better styling
const MarkdownComponents = {
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold text-blue-600 dark:text-blue-400">{children}</strong>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside mb-2 space-y-1 ml-2">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside mb-2 space-y-1 ml-2">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-sm leading-relaxed">{children}</li>
  ),
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-base font-bold mb-2 text-gray-900 dark:text-white">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-sm font-bold mb-1 text-gray-900 dark:text-white">{children}</h3>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-2">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:underline"
    >
      {children}
    </a>
  ),
};

// Message content component with proper markdown rendering
const MessageContent: React.FC<{ message: Message }> = ({ message }) => {
  if (message.role === 'user') {
    return <p className="text-sm whitespace-pre-wrap">{message.content}</p>;
  }

  // ✅ Additional client-side filtering for any remaining <think> tags
  const cleanContent = message.content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

  return (
    <div className="text-sm">
      <ReactMarkdown components={MarkdownComponents}>
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
};

// Typing indicator component
const TypingIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-start"
  >
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

// Error message component
const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
  <div className="flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
  </div>
);

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, onMinimize, isMinimized }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize with greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage: Message = {
        role: 'assistant',
        content: "Hey! 👋 I'm **Arka's AI Assistant**. He's not live right now, but I'm here to help you with any questions about his work, projects, or experience. What would you like to know?",
        timestamp: new Date().toISOString()
      };
      setMessages([initialMessage]);
    }
  }, [isOpen, messages.length]);

  // ✅ Fixed sendMessage function with proper variable scoping and retry logic
  const sendMessage = async (retryCount = 0) => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    // ✅ Capture the input value before clearing it
    const currentInput = input;
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);
    setError(null);

    try {
      // ✅ Skip health check and try direct API call
      const historyForApi = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // ✅ Use the captured input value
      const data = await chatService.sendMessage(currentInput, historyForApi);
      
      setIsTyping(false);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: data.timestamp
      };

      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error: any) {
      setIsTyping(false);
      console.error('Error sending message:', error);
      
      // ✅ Retry once on network errors
      if (retryCount < 1 && (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError'))) {
        console.log('Retrying message send...');
        setTimeout(() => {
          // Restore the input for retry
          setInput(currentInput);
          sendMessage(retryCount + 1);
        }, 2000);
        return;
      }
      
      // Enhanced error handling with fallback
      let errorContent = "I'm having trouble connecting right now. ";
      
      if (error.message?.includes('404')) {
        errorContent += "The API endpoint was not found. ";
      } else if (error.message?.includes('422')) {
        errorContent += "There's a data format issue. ";
      } else if (error.message?.includes('500')) {
        errorContent += "The AI service is temporarily unavailable. ";
      } else if (error.message?.includes('Failed to fetch')) {
        errorContent += "Network connection failed. ";
      }
      
      errorContent += "Please try again or contact **Arkaprabha directly** at arkaofficial13@gmail.com";
      
      const errorMessage: Message = {
        role: 'assistant',
        content: errorContent,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear error when user starts typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (error) setError(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ 
          opacity: 1, 
          scale: isMinimized ? 0.3 : 1, 
          y: isMinimized ? 20 : 0 
        }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed bottom-4 right-4 z-50 ${
          isMinimized ? 'w-16 h-16' : 'w-96 h-[500px]'
        } transition-all duration-300`}
      >
        <Card className="w-full h-full flex flex-col shadow-2xl border-0 bg-white dark:bg-gray-900 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-blue-500" />
              </div>
              {!isMinimized && (
                <div>
                  <h3 className="font-semibold text-sm">Arka AI Assistant</h3>
                  <p className="text-xs opacity-90">
                    {isTyping ? 'Typing...' : 'Online'}
                  </p>
                </div>
              )}
            </div>
            {!isMinimized && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMinimize}
                  className="h-8 w-8 p-0 hover:bg-white/20"
                  aria-label="Minimize chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 hover:bg-white/20"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Messages Area */}
          {!isMinimized && (
            <>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {/* Error Display */}
                  {error && <ErrorMessage error={error} />}
                  
                  {/* Messages */}
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-3 py-2 ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        <MessageContent message={message} />
                        {message.timestamp && (
                          <div className="text-xs opacity-70 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && <TypingIndicator />}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t dark:border-gray-700">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Arka..."
                    className="flex-1"
                    disabled={isLoading}
                    maxLength={500}
                  />
                  <Button
                    onClick={() => sendMessage()}
                    disabled={isLoading || !input.trim()}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Press Enter to send • {input.length}/500
                </div>
              </div>
            </>
          )}

          {/* Minimized State */}
          {isMinimized && (
            <div 
              className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={onMinimize}
              aria-label="Expand chat"
            >
              <Maximize2 className="w-6 h-6 text-blue-500" />
            </div>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default Chatbot;
