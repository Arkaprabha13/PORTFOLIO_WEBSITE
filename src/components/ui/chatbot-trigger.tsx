import React, { useState, useEffect, useRef } from 'react';
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
  const [showChatbot, setShowChatbot] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ CRITICAL: Add component instance tracking
  const instanceId = useRef(`trigger-${Math.random().toString(36).substr(2, 9)}`);

  // Debug logging to track instances
  useEffect(() => {
    console.log(`ChatbotTrigger ${instanceId.current} mounted`);
    return () => {
      console.log(`ChatbotTrigger ${instanceId.current} unmounted`);
    };
  }, []);

  // Enhanced popup logic
  useEffect(() => {
    const hasShown = sessionStorage.getItem('chatbotPopupShown');
    if (!hasShown) {
      timerRef.current = setTimeout(() => {
        if (document.visibilityState === 'visible') {
          setShowInitialPopup(true);
          sessionStorage.setItem('chatbotPopupShown', 'true');
        }
      }, initialDelay);
    }

    localStorage.setItem('lastPortfolioVisit', Date.now().toString());
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [initialDelay]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!enableKeyboardShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleOpenChatbot();
      }
      if (e.key === 'Escape' && showChatbot) {
        handleCloseChatbot();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardShortcut, showChatbot]);

  // Scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 100 || scrolled === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ FIXED: Proper event handlers
  const handleAcceptChat = () => {
    setShowInitialPopup(false);
    setShowChatbot(true);
    setIsMinimized(false);
    setUnreadMessages(0);
  };

  const handleDeclineChat = () => {
    setShowInitialPopup(false);
  };

  const handleOpenChatbot = () => {
    setShowChatbot(true);
    setIsMinimized(false);
    setUnreadMessages(0);
  };

  // ✅ CRITICAL FIX: Proper close/minimize handlers
  const handleCloseChatbot = () => {
    setShowChatbot(false);
    setIsMinimized(false); // Reset minimized state
  };

  const handleMinimizeChatbot = () => {
    setIsMinimized(!isMinimized);
    // Keep showChatbot = true when minimizing
  };

  const handleNewMessage = () => {
    if (!showChatbot || isMinimized) {
      setUnreadMessages(prev => prev + 1);
    }
  };

  return (
    <div data-chatbot-trigger={instanceId.current}>
      {/* Initial Popup */}
      <AnimatePresence mode="wait">
        {showInitialPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-4 right-4 z-[60] w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Hey! I'm Arka's AI Assistant 👋
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Arkaprabha isn't live right now, but I'm here to help you explore his work, projects, and experience.
                </p>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={handleAcceptChat}
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Let's Chat!
                  </Button>
                  <Button
                    onClick={handleDeclineChat}
                    variant="outline"
                    size="sm"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
              
              <Button
                onClick={handleDeclineChat}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ FIXED: Only show floating button when chatbot is completely closed */}
      <AnimatePresence mode="wait">
        {!showChatbot && !showInitialPopup && isVisible && (
          <motion.div
            key="floating-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-4 right-4 z-[50]"
          >
            <button
              onClick={handleOpenChatbot}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300"
              type="button"
              aria-label="Open chat"
            >
              <MessageCircle className="w-7 h-7" />
              
              {showNotificationDot && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-xs text-white font-bold">!</span>
                </div>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ CHATBOT: Only renders when showChatbot is true */}
      {showChatbot && (
        <Chatbot
          key="main-chatbot"
          isOpen={showChatbot}
          onClose={handleCloseChatbot}
          onMinimize={handleMinimizeChatbot}
          isMinimized={isMinimized}
          onNewMessage={handleNewMessage}
        />
      )}
    </div>
  );
};

export default ChatbotTrigger;
