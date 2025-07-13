import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Chatbot from '@/components/ui/chatbot';

interface ChatbotTriggerProps {
  initialDelay?: number;
  showNotificationDot?: boolean;
  enableKeyboardShortcut?: boolean;
}

const ChatbotTrigger: React.FC<ChatbotTriggerProps> = ({
  initialDelay = 5000,
  showNotificationDot = true,
  enableKeyboardShortcut = true
}) => {
  // ===== STATE MANAGEMENT =====
  const [showChatbot, setShowChatbot] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // ===== REFS =====
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const instanceId = useRef(`chatbot-trigger-${Math.random().toString(36).substr(2, 9)}`);

  // ===== DEBUG LOGGING =====
  useEffect(() => {
    console.log(`🚀 ChatbotTrigger ${instanceId.current} mounted`);
    return () => {
      console.log(`🔥 ChatbotTrigger ${instanceId.current} unmounted`);
    };
  }, []);

  // ===== POPUP LOGIC =====
  useEffect(() => {
    const hasShown = sessionStorage.getItem('chatbotPopupShown');
    const lastVisit = localStorage.getItem('lastPortfolioVisit');
    const isReturningUser = lastVisit && (Date.now() - parseInt(lastVisit)) < 24 * 60 * 60 * 1000;

    if (!hasShown) {
      const delay = isReturningUser ? initialDelay / 2 : initialDelay;
      
      timerRef.current = setTimeout(() => {
        if (document.visibilityState === 'visible' && !showChatbot) {
          setShowInitialPopup(true);
          sessionStorage.setItem('chatbotPopupShown', 'true');
        }
      }, delay);
    }

    localStorage.setItem('lastPortfolioVisit', Date.now().toString());

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [initialDelay, showChatbot]);

  // ===== KEYBOARD SHORTCUTS =====
  useEffect(() => {
    if (!enableKeyboardShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to open chat
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleOpenChatbot();
      }
      // Escape to close
      if (e.key === 'Escape' && showChatbot) {
        handleCloseChatbot();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardShortcut, showChatbot]);

  // ===== SCROLL VISIBILITY =====
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = 100;
      setIsVisible(scrolled > threshold || scrolled === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ===== EVENT HANDLERS =====
  const handleAcceptChat = useCallback(() => {
    console.log(`✅ Accept chat - ${instanceId.current}`);
    setShowInitialPopup(false);
    setShowChatbot(true);
    setIsMinimized(false);
    setUnreadMessages(0);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'chatbot_opened', {
        event_category: 'engagement',
        event_label: 'initial_popup'
      });
    }
  }, []);

  const handleDeclineChat = useCallback(() => {
    console.log(`❌ Decline chat - ${instanceId.current}`);
    setShowInitialPopup(false);
    
    // Show again after 30 minutes if user changes mind
    setTimeout(() => {
      sessionStorage.removeItem('chatbotPopupShown');
    }, 30 * 60 * 1000);
  }, []);

  const handleOpenChatbot = useCallback(() => {
    console.log(`🎯 Open chatbot - ${instanceId.current}`);
    setShowInitialPopup(false); // Close popup if open
    setShowChatbot(true);
    setIsMinimized(false);
    setUnreadMessages(0);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'chatbot_opened', {
        event_category: 'engagement',
        event_label: 'floating_button'
      });
    }
  }, []);

  const handleCloseChatbot = useCallback(() => {
    console.log(`🔒 Close chatbot - ${instanceId.current}`);
    setShowChatbot(false);
    setIsMinimized(false); // Reset minimized state when closing
  }, []);

  const handleMinimizeChatbot = useCallback(() => {
    console.log(`📦 Toggle minimize - ${instanceId.current} - Current: ${isMinimized}`);
    setShowChatbot(false);
    setIsMinimized(false);
    // Keep showChatbot = true when minimizing/expanding
  }, [isMinimized]);

  const handleNewMessage = useCallback(() => {
    if (!showChatbot || isMinimized) {
      setUnreadMessages(prev => prev + 1);
    }
  }, [showChatbot, isMinimized]);

  // ===== CONDITIONAL RENDER LOGIC =====
  const shouldShowFloatingButton = !showChatbot && !showInitialPopup && isVisible;
  const shouldShowChatbot = showChatbot;

  console.log(`📊 Render state - ${instanceId.current}:`, {
    showChatbot,
    isMinimized,
    showInitialPopup,
    shouldShowFloatingButton,
    shouldShowChatbot
  });

  return (
    <div 
      data-chatbot-trigger={instanceId.current}
      className="chatbot-trigger-container"
    >
      {/* ===== INITIAL POPUP ===== */}
      <AnimatePresence mode="wait">
        {showInitialPopup && (
          <motion.div
            key="initial-popup"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 z-[70] w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20" />
            
            <div className="relative z-10">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Hey! I'm Arka's AI Assistant 👋
                    </h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs">
                      Online
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Arkaprabha isn't live right now, but I'm here to help you explore his work, projects, and experience. I can answer questions about:
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center space-x-1 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                      <User className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs text-blue-700 dark:text-blue-300">Projects</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                      <Zap className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                      <span className="text-xs text-purple-700 dark:text-purple-300">Skills</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                      <Sparkles className="w-3 h-3 text-green-600 dark:text-green-400" />
                      <span className="text-xs text-green-700 dark:text-green-300">Experience</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleAcceptChat}
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Let's Chat!
                    </Button>
                    <Button
                      onClick={handleDeclineChat}
                      variant="outline"
                      size="sm"
                      className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Maybe Later
                    </Button>
                  </div>
                </div>
                
                <Button
                  onClick={handleDeclineChat}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== FLOATING CHAT BUTTON ===== */}
      <AnimatePresence mode="wait">
        {shouldShowFloatingButton && (
          <motion.div
            key="floating-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 z-[50]"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleOpenChatbot}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              type="button"
              aria-label="Open Arka AI Assistant"
            >
              <MessageCircle className="w-7 h-7" />
              
              {/* Notification indicators */}
              {showNotificationDot && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                  {unreadMessages > 0 ? (
                    <span className="text-xs text-white font-bold">
                      {unreadMessages > 9 ? '9+' : unreadMessages}
                    </span>
                  ) : (
                    <span className="text-xs text-white">!</span>
                  )}
                </div>
              )}
              
              {/* Pulse animation */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-ping opacity-20" />
              
              {/* Hover tooltip */}
              <AnimatePresence>
                {isHovered && enableKeyboardShortcut && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none"
                  >
                    Chat with Arka AI
                    <div className="text-xs text-gray-400 mt-1">Ctrl + K</div>
                    <div className="absolute top-3 right-0 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent transform translate-x-full" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MAIN CHATBOT ===== */}
      <AnimatePresence mode="wait">
        {shouldShowChatbot && (
          <Chatbot
            key="main-chatbot"
            isOpen={shouldShowChatbot}
            onClose={handleCloseChatbot}
            onMinimize={handleMinimizeChatbot}
            isMinimized={isMinimized}
            onNewMessage={handleNewMessage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotTrigger;
