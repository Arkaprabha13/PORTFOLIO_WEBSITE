import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Send, MessageCircle, Minimize2, Maximize2, AlertCircle, 
  User, Bot, Sparkles, ExternalLink, Github, Linkedin, Mail,
  Coffee, Clock, Zap, Monitor, Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { chatService } from '@/lib/api';

// ===== INTERFACES =====
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
}

// ===== UTILITY FUNCTIONS =====
const ISTTimeUtils = {
  // Get current IST timestamp
  getCurrentIST: (): string => {
    return new Date().toISOString();
  },

  // Format timestamp to IST with various options
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

      // Relative time formatting for recent messages
      if (relative) {
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMins / 60);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
      }

      // Determine if it's today
      const isToday = date.toDateString() === now.toDateString();
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const isYesterday = date.toDateString() === yesterday.toDateString();

      // Format time with IST timezone
      const timeFormat: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      };

      if (showSeconds) {
        timeFormat.second = '2-digit';
      }

      const timeString = date.toLocaleTimeString('en-IN', timeFormat);

      // Compact mode
      if (compact) {
        if (isToday) return `${timeString} IST`;
        if (isYesterday) return 'Yesterday';
        return date.toLocaleDateString('en-IN', { 
          month: 'short', 
          day: 'numeric',
          timeZone: 'Asia/Kolkata'
        });
      }

      // Full formatting with IST indication
      if (isToday) {
        return showDate ? `Today, ${timeString} IST` : `${timeString} IST`;
      } else if (isYesterday) {
        return `Yesterday, ${timeString} IST`;
      } else {
        const dateString = date.toLocaleDateString('en-IN', {
          month: 'short',
          day: 'numeric',
          timeZone: 'Asia/Kolkata'
        });
        return `${dateString}, ${timeString} IST`;
      }
    } catch (error) {
      // Fallback to current IST time
      return new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      }) + ' IST';
    }
  },

  // Check if timestamp is from today
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

// ===== ENHANCED MARKDOWN COMPONENTS =====
const MarkdownComponents = {
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-1 py-0.5 rounded">
      {children}
    </strong>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-3 last:mb-0 leading-relaxed text-gray-700 dark:text-gray-300">
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-none mb-3 space-y-2 ml-0">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside mb-3 space-y-2 ml-2">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-sm leading-relaxed flex items-start space-x-2">
      <span className="text-blue-500 mt-1.5">•</span>
      <span className="flex-1">{children}</span>
    </li>
  ),
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-lg font-bold mb-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-base font-bold mb-2 text-gray-900 dark:text-white flex items-center space-x-2">
      <Sparkles className="w-4 h-4 text-yellow-500" />
      <span>{children}</span>
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-sm font-bold mb-2 text-gray-900 dark:text-white">
      {children}
    </h3>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 px-2 py-1 rounded text-sm font-mono border border-purple-200 dark:border-purple-700">
      {children}
    </code>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 pl-4 pr-4 py-2 italic text-gray-600 dark:text-gray-400 my-3 rounded-r-lg">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-blue-300 hover:decoration-blue-500 transition-colors inline-flex items-center space-x-1"
    >
      <span>{children}</span>
      <ExternalLink className="w-3 h-3" />
    </a>
  ),
};

// ===== QUICK ACTION BUTTONS =====
const QuickActions: React.FC<{ onAction: (message: string) => void }> = ({ onAction }) => {
  const actions = [
    { 
      icon: User, 
      label: "About", 
      message: "Tell me about Arkaprabha's background and experience",
      color: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30"
    },
    { 
      icon: Zap, 
      label: "Projects", 
      message: "What are Arkaprabha's most impressive projects?",
      color: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30"
    },
    { 
      icon: Coffee, 
      label: "Skills", 
      message: "What technical skills does Arkaprabha have?",
      color: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30"
    },
    { 
      icon: Github, 
      label: "GitHub", 
      message: "Show me Arkaprabha's GitHub profile and repositories",
      color: "from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-900/30"
    },
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
          className={`flex items-center space-x-2 p-3 bg-gradient-to-r ${action.color} hover:scale-105 rounded-lg border border-gray-200 dark:border-gray-700/50 transition-all duration-200 group`}
        >
          <action.icon className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200">
            {action.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

// ===== ENHANCED MESSAGE COMPONENT =====
const MessageContent: React.FC<{ message: Message }> = ({ message }) => {
  const [showTimestampDetails, setShowTimestampDetails] = useState(false);

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
            {ISTTimeUtils.isToday(message.timestamp) && (
              <div className="w-2 h-2 bg-green-400 rounded-full" title="Today" />
            )}
          </div>
        )}
      </div>
    );
  }

  // Clean AI response content
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
      
      {/* Enhanced timestamp with IST display */}
      {message.timestamp && (
        <div 
          className="text-xs opacity-70 ml-8 cursor-pointer hover:opacity-100 transition-opacity"
          onClick={() => setShowTimestampDetails(!showTimestampDetails)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{ISTTimeUtils.formatToIST(message.timestamp, { relative: true })}</span>
              {ISTTimeUtils.isToday(message.timestamp) && (
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Today" />
              )}
            </div>
            <Badge variant="secondary" className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
              IST
            </Badge>
          </div>
          
          {/* Expandable timestamp details */}
          <AnimatePresence>
            {showTimestampDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2 rounded border border-gray-200 dark:border-gray-700"
              >
                <div className="space-y-1">
                  <div>Full time: {ISTTimeUtils.formatToIST(message.timestamp, { 
                    showDate: true, 
                    showSeconds: true, 
                    relative: false 
                  })}</div>
                  <div>Local time: {new Date(message.timestamp).toLocaleString()}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

// ===== ENHANCED TYPING INDICATOR =====
const TypingIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-start"
  >
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg px-4 py-3 flex items-center space-x-3">
      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
        <Bot className="w-3 h-3 text-white" />
      </div>
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
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

// ===== ENHANCED ERROR MESSAGE =====
const ErrorMessage: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-700 rounded-lg"
  >
    <div className="flex items-start space-x-3">
      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm text-red-700 dark:text-red-300 mb-3">{error}</p>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onRetry}
            className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
          >
            Try Again
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open('mailto:arkaofficial13@gmail.com')}
            className="text-blue-600 border-blue-300 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-blue-900/20"
          >
            <Mail className="w-3 h-3 mr-1" />
            Contact Direct
          </Button>
        </div>
      </div>
    </div>
  </motion.div>
);

// ===== MAIN CHATBOT COMPONENT =====
const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, onMinimize, isMinimized }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update current IST time every minute
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(ISTTimeUtils.formatToIST(ISTTimeUtils.getCurrentIST(), { 
        showSeconds: false, 
        relative: false 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Enhanced greeting message with current IST time
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

  // Enhanced send message function with IST timestamps
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
        timestamp: ISTTimeUtils.getCurrentIST(), // Use local IST time
        id: Date.now().toString()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error: any) {
      setIsTyping(false);
      console.error('Error sending message:', error);
      
      // Retry logic
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
          scale: 1, // ✅ Always keep scale at 1
          y: 0      // ✅ Remove y offset for minimized state
        }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed bottom-4 right-4 z-50 ${
          isMinimized ? 'w-16 h-16' : 'w-[420px] h-[600px]'
        } transition-all duration-300`}
      >
        <Card className="w-full h-full flex flex-col shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg overflow-hidden">
          {/* Enhanced Header with IST time */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse" />
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
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
              <div className="flex items-center space-x-2 relative z-10">
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

          {/* Enhanced Messages Area */}
          {!isMinimized && (
            <>
              <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
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

              {/* Enhanced Input Area with IST indicator */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about projects, skills, experience..."
                      className="pr-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl"
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
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 rounded-xl px-4 shadow-lg"
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
                    <span className="text-blue-600 dark:text-blue-400">• Powered by Arka AI</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Enhanced Minimized State */}
          {isMinimized && (
            <div 
              className="w-full h-full flex items-center justify-center cursor-pointer bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 group"
              onClick={onMinimize}
              aria-label="Expand chat"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                <MessageCircle className="w-8 h-8 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </motion.div>
            </div>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default Chatbot;
