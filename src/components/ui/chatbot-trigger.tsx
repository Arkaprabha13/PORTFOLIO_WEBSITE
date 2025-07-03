import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Chatbot from '@/components/ui/chatbot';

const ChatbotTrigger: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(false);
  const [hasShownInitialPopup, setHasShownInitialPopup] = useState(false);

  useEffect(() => {
    // Check if we've already shown the popup in this session
    const hasShown = sessionStorage.getItem('chatbotPopupShown');
    
    if (!hasShown) {
      // Show initial popup after 5 seconds
      const timer = setTimeout(() => {
        setShowInitialPopup(true);
        setHasShownInitialPopup(true);
        sessionStorage.setItem('chatbotPopupShown', 'true');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptChat = () => {
    setShowInitialPopup(false);
    setShowChatbot(true);
    setIsMinimized(false);
  };

  const handleDeclineChat = () => {
    setShowInitialPopup(false);
  };

  const handleOpenChatbot = () => {
    setShowChatbot(true);
    setIsMinimized(false);
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
    setIsMinimized(false);
  };

  const handleMinimizeChatbot = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Initial Popup */}
      <AnimatePresence>
        {showInitialPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 z-50 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Hey! I'm Arka's Assistant 👋
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  He's not live right now, but I'm here to help you out with any queries about his work, projects, or experience!
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
                    className="text-gray-600 dark:text-gray-300"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
              <Button
                onClick={handleDeclineChat}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <AnimatePresence>
        {!showChatbot && !showInitialPopup && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpenChatbot}
            className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">!</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot */}
      <Chatbot
        isOpen={showChatbot}
        onClose={handleCloseChatbot}
        onMinimize={handleMinimizeChatbot}
        isMinimized={isMinimized}
      />
    </>
  );
};

export default ChatbotTrigger;
