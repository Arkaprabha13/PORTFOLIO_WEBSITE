import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Send, MessageCircle, Minimize2, Maximize2, AlertCircle, 
  User, Bot, Sparkles, ExternalLink, Coffee, Clock, Zap
} from 'lucide-react';
import { Button } from './button';
import { Card } from './card';
import { Input } from './input';
import { ScrollArea } from './scroll-area';
import { Badge } from './badge';
import { chatService } from '@/lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  id?: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
  onNewMessage?: (message: Message) => void;
}

// IST Time utilities
const ISTTimeUtils = {
  getCurrentIST: (): string => new Date().toISOString(),
  
  formatToIST: (timestamp: string, options?: {
    showDate?: boolean;
    showSeconds?: boolean;
    relative?: boolean;
    compact?: boolean;
  }): string => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const { showDate = false, showSeconds = false, relative = true, compact = false } = options || {};

      if (relative) {
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMins / 60);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
      }

      const isToday = date.toDateString() === now.toDateString();
      const timeFormat: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      };

      if (showSeconds) timeFormat.second = '2-digit';
      const timeString = date.toLocaleTimeString('en-IN', timeFormat);

      if (compact) {
        return isToday ? `${timeString} IST` : 'Earlier';
      }

      return isToday ? `${timeString} IST` : `${date.toLocaleDateString('en-IN', { 
        month: 'short', 
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
      })}, ${timeString} IST`;
    } catch (error) {
      return new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      }) + ' IST';
    }
  },

  isToday: (timestamp: string): boolean => {
    try {
      const date = new Date(timestamp);
      const today = new Date();
      return date.toDateString() === today.toDateString();
    } catch {
      return false;
    }
  }
};

// Enhanced markdown components
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

// Quick action buttons
const QuickActions: React.FC<{ onAction: (message: string) => void }> = ({ onAction }) => {
  const actions = [
    { icon: User, label: "About", message: "Tell me about Arkaprabha's background and experience" },
    { icon: Zap, label: "Projects", message: "What are Arkaprabha's most impressive projects?" },
    { icon: Coffee, label: "Skills", message: "What technical skills does Arkaprabha have?" },
    { icon: ExternalLink, label: "GitHub", message: "Show me Arkaprabha's GitHub profile and repositories" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onAction(action.message)}
          className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200"
        >
          <action.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

// Message content component
const MessageContent: React.FC<{ message: Message }> = ({ message }) => {
  if (message.role === 'user') {
    return (
      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-3 h-3 text-white" />
          </div>
          <p className="text-sm whitespace-pre-wrap leading-relaxed flex-1">{message.content}</p>
        </div>
        {message.timestamp && (
          <div className="text-xs opacity-70 ml-8 flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{ISTTimeUtils.formatToIST(message.timestamp, { compact: true })}</span>
          </div>
        )}
      </div>
    );
  }

  const cleanContent = message.content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-2">
        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-3 h-3 text-white" />
        </div>
        <div className="text-sm flex-1">
          <ReactMarkdown components={MarkdownComponents}>
            {cleanContent}
          </ReactMarkdown>
        </div>
      </div>
      {message.timestamp && (
        <div className="text-xs opacity-70 ml-8 flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{ISTTimeUtils.formatToIST(message.timestamp, { relative: true })}</span>
          <Badge variant="secondary" className="text-xs">IST</Badge>
        </div>
      )}
    </div>
  );
};

// Typing indicator
const TypingIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-start"
  >
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3 flex items-center space-x-3">
      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
        <Bot className="w-3 h-3 text-white" />
      </div>
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <span className="text-xs text-gray-600 dark:text-gray-400">Arka is typing...</span>
    </div>
  </motion.div>
);

// Error message component
const ErrorMessage: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg"
  >
    <div className="flex items-start space-x-3">
      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm text-red-700 dark:text-red-300 mb-3">{error}</p>
        <Button
          size="sm"
          variant="outline"
          onClick={onRetry}
          className="text-red-600 border-red-300 hover:bg-red-50"
        >
          Try Again
        </Button>
      </div>
    </div>
  </motion.div>
);

// Main chatbot component
const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, onMinimize, isMinimized, onNewMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update current IST time
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(ISTTimeUtils.formatToIST(ISTTimeUtils.getCurrentIST(), { 
        showSeconds: false, 
        relative: false 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize with greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const currentISTTime = ISTTimeUtils.formatToIST(ISTTimeUtils.getCurrentIST(), {
        showDate: true,
        relative: false
      });
      
      const initialMessage: Message = {
        role: 'assistant',
        content: `## Welcome to Arkaprabha's Portfolio! 👋

I'm **Arka AI**, your personal guide to exploring Arkaprabha's work and expertise.

**Current Time:** ${currentISTTime}

I can help you discover:

**🚀 Featured Projects**
• Krishak AI - Agricultural disease detection platform
• AutoML SaaS Platform - Automated machine learning solutions  
• RAG-Powered Assistant - Advanced conversational AI

**💼 Professional Background**
• Full-Stack ML Engineer from Kolkata, India
• B.Tech CSE (Data Science) with 9.1/10 CGPA
• 500+ LeetCode problems solved

**🔗 Quick Links**
• **Email**: arkaofficial13@gmail.com
• **GitHub**: https://github.com/Arkaprabha13
• **LinkedIn**: https://linkedin.com/in/arkaprabha-banerjee-936b29253

What would you like to know about Arkaprabha's work?`,
        timestamp: ISTTimeUtils.getCurrentIST(),
        id: 'initial'
      };
      setMessages([initialMessage]);
    }
  }, [isOpen, messages.length]);

  // Handle quick actions
  const handleQuickAction = (message: string) => {
    setInput(message);
    setShowQuickActions(false);
    setTimeout(() => sendMessage(0, message), 100);
  };

  // Send message function
  const sendMessage = async (retryCount = 0, quickMessage?: string) => {
    const messageToSend = quickMessage || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: messageToSend,
      timestamp: ISTTimeUtils.getCurrentIST(),
      id: Date.now().toString()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!quickMessage) setInput('');
    setIsLoading(true);
    setIsTyping(true);
    setError(null);
    setShowQuickActions(false);

    try {
      const historyForApi = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const data = await chatService.sendMessage(messageToSend, historyForApi);
      setIsTyping(false);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: ISTTimeUtils.getCurrentIST(),
        id: Date.now().toString()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (onNewMessage) {
        onNewMessage(assistantMessage);
      }
      
    } catch (error: any) {
      setIsTyping(false);
      console.error('Error sending message:', error);
      
      if (retryCount < 1 && (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError'))) {
        setTimeout(() => {
          if (!quickMessage) setInput(messageToSend);
          sendMessage(retryCount + 1, quickMessage);
        }, 2000);
        return;
      }
      
      let errorContent = "I'm experiencing connectivity issues. ";
      
      if (error.message?.includes('404')) {
        errorContent += "The API endpoint couldn't be reached. ";
      } else if (error.message?.includes('500')) {
        errorContent += "The AI service is temporarily unavailable. ";
      } else if (error.message?.includes('Failed to fetch')) {
        errorContent += "Network connection failed. ";
      }
      
      setError(errorContent + "Please try again or reach out to Arkaprabha directly.");
      
    } finally {
      setIsLoading(false);
    }
  };

  // Retry last message
  const retryLastMessage = () => {
    setError(null);
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (lastUserMessage) {
      sendMessage(0, lastUserMessage.content);
    }
  };

  // Event handlers
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
          scale: 1,
          y: 0
        }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed bottom-4 right-4 z-50 ${
          isMinimized ? 'w-16 h-16' : 'w-[420px] h-[600px]'
        } transition-all duration-300`}
      >
        <Card className="w-full h-full flex flex-col shadow-2xl border-0 bg-white dark:bg-gray-900 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              {!isMinimized && (
                <div>
                  <h3 className="font-bold text-sm flex items-center space-x-2">
                    <span>Arka AI Assistant</span>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                      Portfolio Guide
                    </Badge>
                  </h3>
                  <p className="text-xs opacity-90 flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>{isTyping ? 'Arka is typing...' : 'Ready to help'}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{currentTime}</span>
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
                  className="h-8 w-8 p-0 hover:bg-white/20 rounded-full"
                  aria-label="Minimize chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 hover:bg-white/20 rounded-full"
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
                  {/* Quick Actions */}
                  {showQuickActions && messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <QuickActions onAction={handleQuickAction} />
                    </motion.div>
                  )}

                  {/* Error Display */}
                  {error && <ErrorMessage error={error} onRetry={retryLastMessage} />}
                  
                  {/* Messages */}
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <MessageContent message={message} />
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && <TypingIndicator />}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about projects, skills, experience..."
                      className="pr-12"
                      disabled={isLoading}
                      maxLength={500}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                      {input.length}/500
                    </div>
                  </div>
                  <Button
                    onClick={() => sendMessage()}
                    disabled={isLoading || !input.trim()}
                    size="sm"
                    className="px-4"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
                  <span>Press Enter to send</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>IST {currentTime.split(' IST')[0]}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* FIXED: Single Minimized State - No Duplicates */}
          {isMinimized && (
            <button
              className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-colors duration-200 rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={onMinimize}
              type="button"
              aria-label="Expand chat"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default Chatbot;
