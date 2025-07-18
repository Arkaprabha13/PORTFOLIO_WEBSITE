import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation, useInView, useMotionValue, useTransform } from 'framer-motion';
import { 
  Github, ExternalLink, Star, GitFork, Calendar, Filter, Sun, Moon, Search, 
  Eye, Heart, Share2, Download, Play, Pause, Volume2, VolumeX, ChevronLeft, 
  ChevronRight, X, Zap, Code, Database, Globe, Menu, ArrowUp, Smartphone,
  Monitor, Tablet, Wifi, WifiOff, Loader, RefreshCw, TrendingUp, Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Navbar, NavBody, NavItems, MobileNav, NavbarLogo, NavbarButton,
  MobileNavHeader, MobileNavToggle, MobileNavMenu,
} from '@/components/ui/resizable-navbar';

const Projects = () => {
  // Enhanced state management
  const [activeFilter, setActiveFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [visitedProjects, setVisitedProjects] = useState(new Set());
  
  // New enhanced states for better UX
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deviceType, setDeviceType] = useState('desktop');
  const [touchDevice, setTouchDevice] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Enhanced refs for better performance
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const containerRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  
  // Motion values for advanced animations
  const scrollY = useMotionValue(0);
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);
  
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isProjectsInView = useInView(projectsRef, { once: true, margin: "-50px" });

  // Enhanced device detection and accessibility
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setTouchDevice(isTouchDevice);
      
      if (width < 768) {
        setDeviceType('mobile');
        setViewMode('list'); // Default to list view on mobile
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPrefersReducedMotion(prefersReducedMotion);

    detectDevice();
    window.addEventListener('resize', detectDevice);
    
    // Enhanced online/offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('resize', detectDevice);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Enhanced dark mode with system preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemPrefersDark);
    }

    // Enhanced mouse tracking with throttling
    let throttleTimer = null;
    const handleMouseMove = (e) => {
      if (throttleTimer) return;
      
      throttleTimer = setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        throttleTimer = null;
      }, 16); // ~60fps
    };

    // Enhanced scroll tracking
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollY.set(currentScrollY);
      setShowScrollToTop(currentScrollY > 500);
    };

    if (!touchDevice) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [touchDevice, scrollY]);

  // Enhanced touch gesture handling
  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!touchStartRef.current) return;
    touchEndRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    
    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setSwipeDirection('left');
      // Handle left swipe - maybe change filter
      const categories = ['All', 'AI', 'ML', 'CV', 'Web'];
      const currentIndex = categories.indexOf(activeFilter);
      const nextIndex = (currentIndex + 1) % categories.length;
      setActiveFilter(categories[nextIndex]);
    } else if (isRightSwipe) {
      setSwipeDirection('right');
      // Handle right swipe - maybe go back
      const categories = ['All', 'AI', 'ML', 'CV', 'Web'];
      const currentIndex = categories.indexOf(activeFilter);
      const prevIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1;
      setActiveFilter(categories[prevIndex]);
    }

    // Reset swipe direction after animation
    setTimeout(() => setSwipeDirection(null), 300);
    
    touchStartRef.current = null;
    touchEndRef.current = null;
  }, [activeFilter]);

  // Enhanced haptic feedback simulation
  const triggerHapticFeedback = useCallback((type = 'light') => {
    if (!touchDevice) return;
    
    // Simulate haptic feedback with vibration API
    if ('vibrate' in navigator) {
      const patterns = {
        light: 10,
        medium: 20,
        heavy: 30,
        success: [10, 50, 10],
        error: [50, 100, 50]
      };
      navigator.vibrate(patterns[type] || patterns.light);
    }
  }, [touchDevice]);

  // Enhanced loading simulation with progress
  const simulateLoading = useCallback(async (duration = 1000) => {
    setIsLoading(true);
    setLoadingProgress(0);
    
    const steps = 20;
    const stepDuration = duration / steps;
    
    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      setLoadingProgress((i / steps) * 100);
    }
    
    setIsLoading(false);
    setLoadingProgress(0);
  }, []);

  // Your existing projects data here...
  const projects = [
    {
      id: 1,
      name: 'Krishak 🌾',
      category: 'AI',
      techStack: ['LangChain', 'FAISS', 'Groq API', 'CNN', 'Python', 'Streamlit'],
      brief: 'AI platform for crop advice and disease diagnosis with 99.35% accuracy. Features include real-time plant disease detection, personalized crop recommendations, and weather-based farming insights.',
      fullDescription: 'Krishak revolutionizes agriculture through AI-powered solutions. The platform combines computer vision for disease detection, natural language processing for farmer queries, and vector databases for intelligent crop recommendations. Built with cutting-edge technologies, it serves over 1000+ farmers with real-time insights.',
      githubUrl: 'https://github.com/arkaprabha/krishak',
      liveUrl: 'https://krishak.streamlit.app',
      heroImage: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1592982634038-a3e2d4c8c5e1?w=600&h=400&fit=crop'
      ],
      status: 'Live',
      stars: 47,
      forks: 12,
      lastUpdated: '2024-12',
      difficulty: 'Advanced',
      duration: '6 months',
      team: '3 developers',
      features: [
        'Real-time disease detection with 99.35% accuracy',
        'Multi-language support for farmer queries',
        'Weather-based farming recommendations',
        'Crop yield prediction using ML models',
        'SMS-based advisory system for rural farmers',
        'Satellite imagery integration for field monitoring'
      ],
      technologies: {
        frontend: ['Streamlit', 'HTML/CSS', 'JavaScript'],
        backend: ['Python', 'FastAPI', 'LangChain'],
        database: ['FAISS', 'Vector DB', 'PostgreSQL'],
        ai: ['CNN', 'Computer Vision', 'NLP', 'Groq API']
      },
      metrics: {
        users: '1000+',
        accuracy: '99.35%',
        uptime: '99.9%',
        response: '<200ms'
      }
    },
    // ... rest of your projects
  ];

  const categories = ['All', 'AI', 'ML', 'CV', 'Web'];

  // Enhanced filtering with memoization for performance
  const filteredAndSortedProjects = useMemo(() => {
    return projects
      .filter(project => {
        const matchesCategory = activeFilter === 'All' || project.category === activeFilter;
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             project.brief.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'stars':
            return b.stars - a.stars;
          case 'updated':
            return new Date(b.lastUpdated) - new Date(a.lastUpdated);
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [projects, activeFilter, searchTerm, sortBy]);

  // Enhanced interaction handlers
  const handleLike = useCallback((projectId) => {
    triggerHapticFeedback('success');
    const newLiked = new Set(likedProjects);
    if (newLiked.has(projectId)) {
      newLiked.delete(projectId);
    } else {
      newLiked.add(projectId);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    setLikedProjects(newLiked);
  }, [likedProjects, triggerHapticFeedback]);

  const handleShare = useCallback(async (project) => {
    triggerHapticFeedback('medium');
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: project.name,
          text: project.brief,
          url: project.liveUrl || project.githubUrl
        });
      } else {
        await navigator.clipboard.writeText(project.liveUrl || project.githubUrl);
        // Show toast notification
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1000);
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  }, [triggerHapticFeedback]);

  const openProjectModal = useCallback((project) => {
    triggerHapticFeedback('light');
    setSelectedProject(project);
    setShowProjectModal(true);
    setCurrentImageIndex(0);
    setVisitedProjects(prev => new Set([...prev, project.id]));
  }, [triggerHapticFeedback]);

  const scrollToTop = useCallback(() => {
    triggerHapticFeedback('medium');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [triggerHapticFeedback]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.1 : 0.6, 
        ease: "easeOut" 
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.02,
      y: prefersReducedMotion ? 0 : -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark' : ''} relative overflow-hidden`}>
      {/* Enhanced Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Loading amazing projects... {Math.round(loadingProgress)}%
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Offline Indicator */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-40"
          >
            <div className="flex items-center justify-center gap-2">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm">You're offline. Some features may not work.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(deviceType === 'mobile' ? 20 : 50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'][i % 5],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -100, 100],
                x: [0, Math.random() * 200 - 100],
                rotate: [0, 360],
                opacity: [1, 0]
              }}
              transition={{
                duration: prefersReducedMotion ? 1 : 3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Enhanced Interactive Cursor (Desktop Only) */}
      {!touchDevice && (
        <motion.div
          className="fixed w-4 h-4 bg-blue-500/30 rounded-full pointer-events-none z-40 mix-blend-difference"
          animate={{
            x: mousePosition.x - 8,
            y: mousePosition.y - 8
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      )}

      {/* Enhanced Navigation with better mobile support */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-30"
        style={{ opacity: headerOpacity }}
      >
        <Navbar>
          <NavBody>
            <NavbarLogo />
            <NavItems items={navigationItems} />
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Connection Status Indicator */}
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                {/* Device Type Indicator */}
                {deviceType === 'mobile' && <Smartphone className="h-4 w-4 text-blue-500" />}
                {deviceType === 'tablet' && <Tablet className="h-4 w-4 text-blue-500" />}
                {deviceType === 'desktop' && <Monitor className="h-4 w-4 text-blue-500" />}
              </div>

              {/* Enhanced Sound Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  triggerHapticFeedback('light');
                }}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle sound"
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </motion.button>

              {/* Enhanced Dark Mode Toggle */}
              <NavbarButton
                variant="secondary"
                onClick={() => {
                  setDarkMode(!darkMode);
                  triggerHapticFeedback('light');
                }}
                className="min-w-[44px] min-h-[44px]"
              >
                <motion.div
                  animate={{ rotate: darkMode ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.div>
              </NavbarButton>

              {/* Enhanced Contact Button */}
              <NavbarButton 
                variant="primary"
                onClick={() => {
                  triggerHapticFeedback('medium');
                  window.open('mailto:arkaofficial13@gmail.com');
                }}
                className="hidden sm:block min-w-[44px] min-h-[44px]"
              >
                Contact Me
              </NavbarButton>
            </div>
          </NavBody>

          {/* Enhanced Mobile Navigation */}
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={mobileMenuOpen}
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  triggerHapticFeedback('light');
                }}
              />
            </MobileNavHeader>
            <MobileNavMenu
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
            >
              {navigationItems.map((item, idx) => (
                <Link
                  key={`mobile-link-${idx}`}
                  to={item.link}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    triggerHapticFeedback('light');
                  }}
                  className="relative text-neutral-600 dark:text-neutral-300 hover:text-blue-600 transition-colors block py-3 px-4 min-h-[44px] flex items-center"
                >
                  <span className="block">{item.name}</span>
                </Link>
              ))}
              <button
                onClick={() => {
                  triggerHapticFeedback('medium');
                  window.open('mailto:arkaofficial13@gmail.com');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-3 px-4 min-h-[44px] text-blue-600 font-medium"
              >
                Contact Me
              </button>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </motion.div>

      {/* Enhanced Main Content */}
      <motion.div
        className="bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative"
        style={{ y: backgroundY }}
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(deviceType === 'mobile' ? 10 : 20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 10 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Enhanced Hero Section */}
        <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 relative" ref={heroRef}>
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8"
              >
                <span className="text-gray-900 dark:text-white">Featured </span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Projects
                </span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 px-4"
              >
                Showcasing innovative AI/ML solutions that push the boundaries of technology and create real-world impact
              </motion.p>

              {/* Enhanced Interactive Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
              >
                {[
                  { label: 'Projects', value: projects.length, icon: Code },
                  { label: 'Technologies', value: '25+', icon: Database },
                  { label: 'GitHub Stars', value: '161', icon: Star },
                  { label: 'Live Demos', value: '3', icon: Globe }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg cursor-pointer min-h-[100px] flex flex-col justify-center"
                    onClick={() => triggerHapticFeedback('light')}
                  >
                    <motion.div
                      animate={{ rotate: hoveredProject === `stat-${index}` ? 360 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-2" />
                    </motion.div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Swipe Indicator for Mobile */}
              {deviceType === 'mobile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mb-4"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="text-sm">Swipe to navigate filters</span>
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Enhanced Controls Section */}
        <section className="pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg mb-6 sm:mb-8"
            >
              {/* Enhanced Search and Controls */}
              <div className="flex flex-col gap-4 sm:gap-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search projects, technologies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base min-h-[48px]"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 min-w-[24px] min-h-[24px]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Controls Row */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center">
                  {/* Auto-play Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      triggerHapticFeedback('medium');
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[48px] w-full sm:w-auto"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? 'Pause Demo' : 'Auto Demo'}
                  </motion.button>

                  {/* Sort and View Controls */}
                  <div className="flex gap-2 sm:gap-4 flex-1 sm:flex-none">
                    {/* Sort Dropdown */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="flex-1 sm:flex-none px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-[48px]"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="stars">Sort by Stars</option>
                      <option value="updated">Sort by Updated</option>
                    </select>

                    {/* View Mode Toggle */}
                    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 min-h-[48px]">
                      <button
                        onClick={() => {
                          setViewMode('grid');
                          triggerHapticFeedback('light');
                        }}
                        className={`p-2 rounded min-w-[40px] min-h-[40px] flex items-center justify-center ${
                          viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow' : ''
                        }`}
                      >
                        <div className="grid grid-cols-2 gap-1 w-4 h-4">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-400 rounded-sm"></div>
                          ))}
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setViewMode('list');
                          triggerHapticFeedback('light');
                        }}
                        className={`p-2 rounded min-w-[40px] min-h-[40px] flex items-center justify-center ${
                          viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow' : ''
                        }`}
                      >
                        <div className="space-y-1 w-4 h-4">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-gray-400 h-1 rounded"></div>
                          ))}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Filter Bar with Swipe Indicator */}
              <div className="mt-6 relative">
                {swipeDirection && (
                  <motion.div
                    initial={{ opacity: 0, x: swipeDirection === 'left' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: swipeDirection === 'left' ? 20 : -20 }}
                    className="absolute top-0 left-0 right-0 bg-blue-500/20 rounded-lg p-2 text-center text-blue-600 dark:text-blue-400 text-sm z-10"
                  >
                    Swiped {swipeDirection === 'left' ? 'left' : 'right'} - Filter changed!
                  </motion.div>
                )}
                
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveFilter(category);
                        triggerHapticFeedback('light');
                      }}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap min-h-[44px] flex items-center ${
                        activeFilter === category
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      {category}
                      {category !== 'All' && (
                        <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                          {projects.filter(p => p.category === category).length}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Projects Grid */}
        <section className="pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8" ref={projectsRef}>
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeFilter}-${viewMode}-${sortBy}`}
                layout
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8" 
                    : "space-y-4 sm:space-y-6"
                }
              >
                {filteredAndSortedProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={cardVariants}
                    whileHover="hover"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="group relative"
                  >
                    <Card className="glass-card overflow-hidden transition-all duration-300 hover:shadow-2xl relative">
                      {/* Enhanced Project Card Content */}
                      {/* ... (rest of your project card content with enhanced mobile touches) */}
                      
                      {/* Enhanced Image Section */}
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={project.heroImage}
                          alt={project.name}
                          className="w-full h-48 sm:h-64 object-cover"
                          whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
                          transition={{ duration: 0.5 }}
                          loading="lazy"
                        />
                        
                        {/* Enhanced Mobile-Friendly Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Enhanced Status Badges */}
                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-1 sm:gap-2">
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-white ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                          <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-black/20 text-white backdrop-blur-sm">
                            {project.category}
                          </span>
                        </div>

                        {/* Enhanced Quick Actions */}
                        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(project.id);
                            }}
                            className={`p-2 sm:p-3 rounded-full backdrop-blur-sm min-w-[44px] min-h-[44px] flex items-center justify-center ${
                              likedProjects.has(project.id) ? 'bg-red-500' : 'bg-white/20'
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${likedProjects.has(project.id) ? 'fill-white' : ''}`} />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(project);
                            }}
                            className="p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
                          >
                            <Share2 className="h-4 w-4" />
                          </motion.button>
                        </div>

                        {/* Enhanced Quick View Button */}
                        <motion.button
                          initial={{ opacity: 0, scale: 0 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openProjectModal(project)}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center"
                        >
                          <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900 dark:text-white" />
                        </motion.button>
                      </div>
                      
                      {/* Enhanced Card Content */}
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-between">
                          <span className="truncate">{project.name}</span>
                          {hoveredProject === project.id && !touchDevice && (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex gap-2 flex-shrink-0"
                            >
                              <Zap className="h-5 w-5 text-yellow-500" />
                            </motion.div>
                          )}
                        </CardTitle>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base line-clamp-3">
                          {project.brief}
                        </p>

                        {/* Enhanced Project Metrics */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4">
                          {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                            <div key={key} className="text-center p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="text-sm sm:text-lg font-bold text-blue-600">{value}</div>
                              <div className="text-xs text-gray-500 capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="mb-4 sm:mb-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                            Key Features:
                          </h4>
                          <ul className="space-y-1">
                            {project.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                <span className="line-clamp-2">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Enhanced Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                          {project.techStack.slice(0, 3).map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm font-medium cursor-pointer"
                              onClick={() => triggerHapticFeedback('light')}
                            >
                              {tech}
                            </motion.span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs sm:text-sm">
                              +{project.techStack.length - 3}
                            </span>
                          )}
                        </div>
                        
                        {/* Enhanced Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white min-h-[44px] text-sm sm:text-base"
                            onClick={() => {
                              triggerHapticFeedback('medium');
                              window.open(project.githubUrl, '_blank');
                            }}
                          >
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                          </Button>
                          {project.liveUrl && (
                            <Button 
                              variant="outline" 
                              className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 min-h-[44px] text-sm sm:text-base"
                              onClick={() => {
                                triggerHapticFeedback('medium');
                                window.open(project.liveUrl, '_blank');
                              }}
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Enhanced No Results Message */}
            {filteredAndSortedProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 sm:py-20"
              >
                <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
                  Try adjusting your search terms or filters
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('All');
                    triggerHapticFeedback('medium');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white min-h-[44px]"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
                Like What You See?
              </h2>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 px-4">
                Let's collaborate on your next innovative project
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    triggerHapticFeedback('success');
                    window.open('mailto:arkaofficial13@gmail.com');
                  }}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 rounded-full font-semibold transition-colors min-h-[48px] flex items-center justify-center"
                >
                  Get In Touch
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    triggerHapticFeedback('medium');
                    window.open('https://github.com/Arkaprabha13', '_blank');
                  }}
                  className="border-2 border-white text-white hover:bg-white/10 px-6 sm:px-8 py-3 rounded-full font-semibold transition-colors min-h-[48px] flex items-center justify-center"
                >
                  View All Projects
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>

      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-40 min-w-[56px] min-h-[56px] flex items-center justify-center"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Enhanced Project Modal - with better mobile support */}
      <AnimatePresence>
        {showProjectModal && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowProjectModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Modal Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex items-center justify-between">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {selectedProject.name}
                </h2>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              {/* Enhanced Modal Content */}
              <div className="p-4 sm:p-6">
                {/* Enhanced Image Gallery */}
                <div className="relative mb-4 sm:mb-6">
                  <img
                    src={selectedProject.galleryImages[currentImageIndex]}
                    alt={selectedProject.name}
                    className="w-full h-48 sm:h-64 object-cover rounded-lg"
                  />
                  {selectedProject.galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex(prev => 
                          prev === 0 ? selectedProject.galleryImages.length - 1 : prev - 1
                        )}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full min-w-[40px] min-h-[40px] flex items-center justify-center"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex(prev => 
                          prev === selectedProject.galleryImages.length - 1 ? 0 : prev + 1
                        )}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full min-w-[40px] min-h-[40px] flex items-center justify-center"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Enhanced Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Project Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                        <span>{selectedProject.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Team Size:</span>
                        <span>{selectedProject.team}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(selectedProject.difficulty)}`}>
                          {selectedProject.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Key Metrics</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedProject.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <div className="font-bold text-blue-600 text-sm sm:text-base">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white min-h-[48px]"
                    onClick={() => {
                      triggerHapticFeedback('medium');
                      window.open(selectedProject.githubUrl, '_blank');
                    }}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Source
                  </Button>
                  {selectedProject.liveUrl && (
                    <Button 
                      variant="outline" 
                      className="flex-1 min-h-[48px]"
                      onClick={() => {
                        triggerHapticFeedback('medium');
                        window.open(selectedProject.liveUrl, '_blank');
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={() => handleShare(selectedProject)}
                    className="min-h-[48px] sm:w-auto"
                  >
                    <Share2 className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
