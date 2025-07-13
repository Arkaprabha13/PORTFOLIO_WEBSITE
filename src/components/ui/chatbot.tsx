import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { 
  X, Send, MessageCircle, Minimize2, Maximize2, AlertCircle, 
  User, Bot, Sparkles, ExternalLink, Coffee, Clock, Zap,
  ChevronDown, Volume2, Settings, Download, Share2
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

// Enhanced responsive hook
const useResponsive = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  return { deviceType, screenSize };
};

// IST Time utilities (enhanced)
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

// Enhanced responsive markdown components
const MarkdownComponents = {
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-1 py-0.5 rounded text-sm sm:text-base">
      {children}
    </strong>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-2 sm:mb-3 last:mb-0 leading-relaxed text-sm sm:text-base">
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-none mb-2 sm:mb-3 space-y-1 sm:space-y-2 ml-0">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside mb-2 sm:mb-3 space-y-1 sm:space-y-2 ml-2">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-xs sm:text-sm leading-relaxed flex items-start space-x-2">
      <span className="text-blue-500 mt-1 sm:mt-1.5 select-none">•</span>
      <span className="flex-1">{children}</span>
    </li>
  ),
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-sm sm:text-base font-bold mb-1 sm:mb-2 text-gray-900 dark:text-white flex items-center space-x-2">
      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
      <span>{children}</span>
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xs sm:text-sm font-bold mb-1 text-gray-900 dark:text-white">
      {children}
    </h3>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gray-200 dark:bg-gray-700 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-mono">
      {children}
    </code>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-blue-500 pl-3 sm:pl-4 italic text-gray-600 dark:text-gray-400 my-2 sm:my-3 text-sm sm:text-base">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base"
    >
      {children}
    </a>
  ),
};

// Responsive Quick Actions
const QuickActions: React.FC<{ 
  onAction: (message: string) => void;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}> = ({ onAction, deviceType }) => {
  const actions = [
    { icon: User, label: "About", message: "Tell me about Arkaprabha's background and experience" },
    { icon: Zap, label: "Projects", message: "What are Arkaprabha's most impressive projects?" },
    { icon: Coffee, label: "Skills", message: "What technical skills does Arkaprabha have?" },
    { icon: ExternalLink, label: "GitHub", message: "Show me Arkaprabha's GitHub profile and repositories" },
  ];

  const gridCols = deviceType === 'mobile' ? 'grid-cols-1' : 'grid-cols-2';
  const buttonSize = deviceType === 'mobile' ? 'p-4' : 'p-3';

  return (
    <div className={`grid ${gridCols} gap-2 sm:gap-3 mb-4`}>
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onAction(action.message)}
          className={`flex items-center space-x-2 sm:space-x-3 ${buttonSize} bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:scale-105 active:scale-95`}
        >
          <action.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
            {action.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

// Enhanced responsive message content
const MessageContent: React.FC<{ 
  message: Message;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}> = ({ message, deviceType }) => {
  const avatarSize = deviceType === 'mobile' ? 'w-6 h-6' : 'w-7 h-7';
  const iconSize = deviceType === 'mobile' ? 'w-3 h-3' : 'w-4 h-4';

  if (message.role === 'user') {
    return (
      <div className="space-y-2">
        <div className="flex items-start space-x-2 sm:space-x-3">
          <div className={`${avatarSize} bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0`}>
            <User className={`${iconSize} text-white`} />
          </div>
          <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed flex-1 break-words">
            {message.content}
          </p>
        </div>
        {message.timestamp && (
          <div className={`text-xs opacity-70 ${deviceType === 'mobile' ? 'ml-8' : 'ml-10'} flex items-center space-x-1`}>
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
      <div className="flex items-start space-x-2 sm:space-x-3">
        <div className={`${avatarSize} bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0`}>
          <Bot className={`${iconSize} text-white`} />
        </div>
        <div className="text-sm sm:text-base flex-1 min-w-0">
          <ReactMarkdown components={MarkdownComponents}>
            {cleanContent}
          </ReactMarkdown>
        </div>
      </div>
      {message.timestamp && (
        <div className={`text-xs opacity-70 ${deviceType === 'mobile' ? 'ml-8' : 'ml-10'} flex items-center space-x-1 flex-wrap`}>
          <Clock className="w-3 h-3" />
          <span>{ISTTimeUtils.formatToIST(message.timestamp, { relative: true })}</span>
          <Badge variant="secondary" className="text-xs">IST</Badge>
        </div>
      )}
    </div>
  );
};

// Enhanced responsive typing indicator
const TypingIndicator: React.FC<{ deviceType: 'mobile' | 'tablet' | 'desktop' }> = ({ deviceType }) => {
  const containerPadding = deviceType === 'mobile' ? 'px-3 py-2' : 'px-4 py-3';
  const avatarSize = deviceType === 'mobile' ? 'w-6 h-6' : 'w-7 h-7';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex justify-start"
    >
      <div className={`bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg sm:rounded-xl ${containerPadding} flex items-center space-x-2 sm:space-x-3`}>
        <div className={`${avatarSize} bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0`}>
          <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
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
        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Arka is typing...</span>
      </div>
    </motion.div>
  );
};

// Enhanced error message
const ErrorMessage: React.FC<{ 
  error: string; 
  onRetry: () => void;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}> = ({ error, onRetry, deviceType }) => {
  const padding = deviceType === 'mobile' ? 'p-3' : 'p-4';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${padding} bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-700 rounded-lg sm:rounded-xl`}
    >
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 mb-3 break-words">{error}</p>
          <Button
            size="sm"
            variant="outline"
            onClick={onRetry}
            className="text-red-600 border-red-300 hover:bg-red-50 text-xs sm:text-sm"
          >
            Try Again
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Main responsive chatbot component
const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, onMinimize, isMinimized, onNewMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [dragY, setDragY] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { deviceType, screenSize } = useResponsive();

  // Responsive dimensions
  const getResponsiveDimensions = () => {
    if (isMinimized) {
      return deviceType === 'mobile' ? 'w-14 h-14' : 'w-16 h-16';
    }
    
    switch (deviceType) {
      case 'mobile':
        return 'w-full h-full'; // Full screen on mobile
      case 'tablet':
        return 'w-[90vw] max-w-md h-[80vh] max-h-[600px]';
      case 'desktop':
      default:
        return 'w-[420px] h-[600px]';
    }
  };

  const getResponsivePosition = () => {
    if (isMinimized) {
      return 'bottom-4 right-4';
    }
    
    switch (deviceType) {
      case 'mobile':
        return 'inset-0'; // Full screen on mobile
      case 'tablet':
        return 'bottom-4 right-4';
      case 'desktop':
      default:
        return 'bottom-4 right-4';
    }
  };

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

  // Enhanced send message function
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

  // Enhanced event handlers
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

  // Handle drag gestures for mobile
  const handleDragEnd = (event: any, info: PanInfo) => {
    if (deviceType === 'mobile' && info.offset.y > 100) {
      onClose();
    }
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
        className={`fixed ${getResponsivePosition()} z-50 ${getResponsiveDimensions()} transition-all duration-300`}
        drag={deviceType === 'mobile' && !isMinimized ? 'y' : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        style={{
          zIndex: 9999,
          ...(deviceType === 'mobile' && !isMinimized && {
            borderRadius: '20px 20px 0 0',
          })
        }}
      >
        {/* Mobile backdrop */}
        {deviceType === 'mobile' && !isMinimized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
            onClick={onClose}
          />
        )}

        <Card className={`w-full h-full flex flex-col shadow-2xl border-0 bg-white dark:bg-gray-900 overflow-hidden ${
          deviceType === 'mobile' && !isMinimized 
            ? 'rounded-t-[20px] rounded-b-none' 
            : isMinimized 
              ? 'rounded-full' 
              : 'rounded-xl sm:rounded-2xl'
        }`}>
          {/* Mobile drag handle */}
          {deviceType === 'mobile' && !isMinimized && (
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>
          )}

          {/* Enhanced Header */}
          <div className={`flex items-center justify-between ${
            deviceType === 'mobile' ? 'p-3' : 'p-4'
          } bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white relative overflow-hidden ${
            deviceType === 'mobile' && !isMinimized ? 'rounded-t-[20px]' : ''
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse" />
            <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
              <div className={`${
                deviceType === 'mobile' ? 'w-8 h-8' : 'w-10 h-10'
              } bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30`}>
                <MessageCircle className={`${
                  deviceType === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'
                } text-white`} />
              </div>
              {!isMinimized && (
                <div className="min-w-0 flex-1">
                  <h3 className={`font-bold ${
                    deviceType === 'mobile' ? 'text-xs' : 'text-sm'
                  } flex items-center space-x-1 sm:space-x-2`}>
                    <span className="truncate">Arka AI Assistant</span>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs flex-shrink-0">
                      {deviceType === 'mobile' ? 'AI' : 'Portfolio Guide'}
                    </Badge>
                  </h3>
                  <p className={`${
                    deviceType === 'mobile' ? 'text-xs' : 'text-xs sm:text-sm'
                  } opacity-90 flex items-center space-x-1 truncate`}>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                    <span className="truncate">{isTyping ? 'Arka is typing...' : 'Ready to help'}</span>
                    <span className="hidden sm:inline">•</span>
                    <Clock className="w-3 h-3 hidden sm:inline flex-shrink-0" />
                    <span className="hidden sm:inline truncate">{currentTime}</span>
                  </p>
                </div>
              )}
            </div>
            {!isMinimized && (
              <div className="flex items-center space-x-1 sm:space-x-2 relative z-10">
                {deviceType !== 'mobile' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMinimize}
                    className="h-6 w-6 sm:h-8 sm:w-8 p-0 hover:bg-white/20 rounded-full"
                    aria-label="Minimize chat"
                  >
                    <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-6 w-6 sm:h-8 sm:w-8 p-0 hover:bg-white/20 rounded-full"
                  aria-label="Close chat"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Enhanced Messages Area */}
          {!isMinimized && (
            <>
              <ScrollArea className="flex-1 p-3 sm:p-4 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
                <div className="space-y-3 sm:space-y-4">
                  {/* Quick Actions */}
                  {showQuickActions && messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <QuickActions onAction={handleQuickAction} deviceType={deviceType} />
                    </motion.div>
                  )}

                  {/* Error Display */}
                  <AnimatePresence>
                    {error && (
                      <ErrorMessage 
                        error={error} 
                        onRetry={retryLastMessage} 
                        deviceType={deviceType}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Messages */}
                  <AnimatePresence initial={false}>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[90%] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md border border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <MessageContent message={message} deviceType={deviceType} />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Typing Indicator */}
                  <AnimatePresence>
                    {isTyping && <TypingIndicator deviceType={deviceType} />}
                  </AnimatePresence>
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Enhanced Input Area */}
              <div className={`${
                deviceType === 'mobile' ? 'p-3' : 'p-4'
              } border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm`}>
                <div className="flex space-x-2 sm:space-x-3">
                  <div className="flex-1 relative">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder={deviceType === 'mobile' ? "Ask anything..." : "Ask about projects, skills, experience..."}
                      className={`pr-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg sm:rounded-xl ${
                        deviceType === 'mobile' ? 'text-base' : 'text-sm'
                      }`}
                      disabled={isLoading}
                      maxLength={500}
                      style={{ fontSize: deviceType === 'mobile' ? '16px' : undefined }} // Prevent zoom on iOS
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                      {input.length}/500
                    </div>
                  </div>
                  <Button
                    onClick={() => sendMessage()}
                    disabled={isLoading || !input.trim()}
                    size="sm"
                    className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 rounded-lg sm:rounded-xl ${
                      deviceType === 'mobile' ? 'px-3' : 'px-4'
                    } shadow-lg`}
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
                <div className={`text-xs text-gray-500 mt-2 flex items-center justify-between ${
                  deviceType === 'mobile' ? 'flex-col space-y-1' : 'flex-row'
                }`}>
                  <span>Press Enter to send</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>IST {currentTime.split(' IST')[0]}</span>
                    {deviceType !== 'mobile' && (
                      <span className="text-blue-600 dark:text-blue-400">• Powered by Arka AI</span>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Enhanced Minimized State */}
          {isMinimized && (
            <button
              type="button"
              className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-colors duration-200 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95"
              onClick={() => {
                console.log('🔄 Minimized button clicked - calling onMinimize');
                onMinimize();
              }}
              aria-label="Expand chat"
            >
              <div className="flex items-center justify-center w-full h-full relative">
                <MessageCircle className={`${
                  deviceType === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'
                } text-white`} />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-white animate-pulse" />
              </div>
            </button>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default Chatbot;
