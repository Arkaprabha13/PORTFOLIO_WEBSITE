import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Calendar, MapPin, GraduationCap, Award, Code, Heart, Sun, Moon, 
  ChevronDown, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, 
  Download, FileText, Mail, Github, Linkedin, ExternalLink, Sparkles,
  TrendingUp, Target, Users, Zap, BookOpen, Coffee, Gamepad2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import {
  Navbar, NavBody, NavItems, MobileNav, NavbarLogo, NavbarButton,
  MobileNavHeader, MobileNavToggle, MobileNavMenu,
} from '@/components/ui/resizable-navbar';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack/ScrollStack';

const About = () => {
  // State Management
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [expandedFact, setExpandedFact] = useState(null);
  const [typingText, setTypingText] = useState('');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [timelineKey, setTimelineKey] = useState(0);

  // Refs for animations
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const timelineRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true });
  const isSkillsInView = useInView(skillsRef, { once: true });
  const isTimelineInView = useInView(timelineRef, { once: true });

  // Navigation Items
  const navigationItems = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Projects', link: '/projects' },
    { name: 'Blog', link: '/blog' },
    { name: 'Contact', link: '/contact' }
  ];

  // Enhanced Timeline Data
  const timelineData = [
    {
      year: '2022',
      title: 'Started B.Tech at Heritage Institute of Technology',
      description: 'Began my journey in Computer Science and Engineering with a focus on AI/ML fundamentals',
      icon: GraduationCap,
      color: 'from-blue-500 to-purple-600',
      duration: '4 years',
      achievements: [
        'CGPA: 9.1/10',
        'Programming Started with C',
        'Data Science Specialization'
      ],
      tags: ['Education', 'Foundation', 'CS Engineering']
    },
    {
      year: '2023',
      title: 'First Time Coding in C++ and Python',
      description: 'Learned C++ and Python, building foundational skills in programming and problem-solving',
      icon: Code,
      color: 'from-green-500 to-blue-600',
      duration: '1 year',
      achievements: [
        'LeetCode: 100+ Problems Solved',
        'GeeksforGeeks: 200+ Problems Solved',
        'Built first projects'
      ],
      tags: ['Programming', 'C++', 'Python']
    },
    {
      year: '2024',
      title: 'First Hackathon at Diversion 2024',
      description: 'Participated in my first hackathon, focusing on AI/ML solutions for real-world problems',
      icon: Award,
      color: 'from-yellow-500 to-orange-600',
      duration: '2 days',
      achievements: [
        'Team collaboration experience',
        'Real-world problem solving',
        'Network with industry professionals'
      ],
      tags: ['Hackathon', 'AI/ML', 'Teamwork']
    },
    {
      year: '2024',
      title: 'Joined NooBuild DSA Team',
      description: 'Contributing to open-source DSA projects and mentoring junior developers',
      icon: Heart,
      color: 'from-purple-500 to-pink-600',
      duration: '6 months',
      achievements: [
        '500+ Problems Solved',
        'Mentored 50+ Students',
        'Open source contributions'
      ],
      tags: ['Open Source', 'DSA', 'Mentoring']
    },
    {
      year: '2024',
      title: 'Building Different Projects',
      description: 'Contributing to various projects, enhancing my skills in full-stack development and AI',
      icon: Code,
      color: 'from-indigo-500 to-purple-600',
      duration: '8 months',
      achievements: [
        '20+ learning projects',
        '5+ Major Projects',
        'Full-stack development skills'
      ],
      tags: ['Full-Stack', 'Projects', 'Development']
    },
    {
      year: '2025',
      title: 'Built Krishak AI Platform',
      description: 'Agricultural AI platform with 99.35% disease detection accuracy using advanced CNN models',
      icon: Sparkles,
      color: 'from-green-500 to-teal-600',
      duration: '3 months',
      achievements: [
        '99.35% Disease Detection Accuracy',
        '1000+ Farmers Helped',
        'Featured in Tech Communities'
      ],
      tags: ['AI', 'Agriculture', 'CNN']
    },
    {
      year: '2025',
      title: 'Full-Stack ML Engineer',
      description: 'Specializing in LangChain, FAISS, RAG systems, and intelligent automation',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-600',
      duration: 'Present',
      achievements: [
        '8+ Major Projects Completed',
        'Industry Recognition',
        'Advanced AI/ML Expertise'
      ],
      tags: ['ML Engineering', 'LangChain', 'RAG Systems']
    }
  ];

  // Enhanced Skills Data
  const skills = [
    { name: 'Python', level: 95, color: '#3776ab', description: 'Advanced scripting, ML/AI, automation, data pipelines' },
    { name: 'JavaScript/TypeScript', level: 90, color: '#f7df1e', description: 'Modern web apps, async patterns, scalable codebases' },
    { name: 'C++/C#', level: 70, color: '#00599c', description: 'System-level programming, backend APIs, performance-critical modules' },
    { name: 'SQL & NoSQL', level: 88, color: '#00618a', description: 'Relational (PostgreSQL, MySQL), document (MongoDB), vector DBs (FAISS)' },
    { name: 'React/Next.js', level: 90, color: '#61dafb', description: 'Component-based architecture, server-side rendering, modern hooks' },
    { name: 'Machine Learning', level: 92, color: '#ff6f00', description: 'Deep learning, computer vision, NLP, model deployment' },
    { name: 'LangChain', level: 85, color: '#1c3d5c', description: 'RAG systems, multi-agent architectures, LLM pipelines' },
    { name: 'FAISS/Qdrant', level: 90, color: '#4285f4', description: 'Vector search, embeddings, retrieval-augmented generation' },
    { name: 'FastAPI', level: 90, color: '#009688', description: 'Async microservices, OpenAPI docs, blazing-fast endpoints' },
    { name: 'Streamlit', level: 90, color: '#ff4b4b', description: 'Interactive dashboards, rapid ML prototyping' },
    { name: 'DSA/Problem Solving', level: 90, color: '#00bcd4', description: '500+ LeetCode/GFG problems, optimization algorithms' },
    { name: 'Git & Version Control', level: 90, color: '#f34f29', description: 'Branching strategies, code reviews, collaborative development' }
  ];

  // Enhanced Fun Facts
  const funFacts = [
    { 
      icon: '🏆', 
      label: 'LeetCode Problems', 
      value: '360+', 
      details: 'Solved across Easy, Medium, and Hard difficulties with focus on optimization',
      color: 'from-yellow-400 to-orange-500'
    },
    { 
      icon: '🚀', 
      label: 'Projects Built', 
      value: '25+', 
      details: 'Including AI/ML applications, web platforms, and automation tools',
      color: 'from-blue-400 to-cyan-500'
    },
    { 
      icon: '📚', 
      label: 'Technologies Mastered', 
      value: '20+', 
      details: 'Programming languages, frameworks, and development tools',
      color: 'from-indigo-400 to-purple-500'
    },
    { 
      icon: '🎓', 
      label: 'Current CGPA', 
      value: '9.1/10', 
      details: 'B.Tech in Computer Science with Data Science specialization',
      color: 'from-purple-400 to-pink-500'
    },
    { 
      icon: '👥', 
      label: 'Students Mentored', 
      value: '400+', 
      details: 'Guided in programming, career development, and technical skills',
      color: 'from-teal-400 to-green-500'
    },
    { 
      icon: '⚡', 
      label: 'AI Model Accuracy', 
      value: '99.35%', 
      details: 'Achieved in crop disease detection using advanced CNN models',
      color: 'from-green-400 to-blue-500'
    }
  ];

  // Effects
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const text = "Building intelligent solutions at the intersection of data science and full-stack development";
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypingText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  // Event Handlers
  const handleAvatarClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 4) {
      setShowEasterEgg(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowEasterEgg(false);
        setShowConfetti(false);
      }, 3000);
      setClickCount(0);
    }
  };

  const handleResumeDownload = () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'resume_download', {
        event_category: 'engagement',
        event_label: 'about_page'
      });
    }
    
    const link = document.createElement('a');
    link.href = '/Arkaprabha_Banerjee_resume.pdf';
    link.download = 'Arkaprabha_Banerjee_Resume.pdf';
    link.click();
    
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const skillVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: { duration: 1.5, ease: "easeOut" }
    })
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark' : ''} relative overflow-hidden`}>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
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
                duration: 3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Interactive Cursor Effect */}
      <motion.div
        className="fixed w-4 h-4 bg-blue-500/30 rounded-full pointer-events-none z-40 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Navigation */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navigationItems} />
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle sound"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </motion.button>
            <NavbarButton
              variant="secondary"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              <motion.div
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.div>
            </NavbarButton>
            <NavbarButton 
              variant="primary"
              onClick={() => window.open('mailto:arkaofficial13@gmail.com')}
            >
              Contact Me
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                onClick={() => setMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300 hover:text-blue-600 transition-colors"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleResumeDownload();
                }}
                variant="secondary"
                className="w-full flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </NavbarButton>
              <NavbarButton
                onClick={() => setDarkMode(!darkMode)}
                variant="secondary"
                className="w-full"
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </NavbarButton>
              <NavbarButton
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.open('mailto:arkaofficial13@gmail.com');
                }}
                variant="primary"
                className="w-full"
              >
                Contact Me
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 pt-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 10 + i,
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

        {/* Hero Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative" ref={heroRef}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              className="text-center mb-8 sm:mb-16"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAvatarClick}
                className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-2 cursor-pointer relative"
              >
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-4xl sm:text-8xl relative overflow-hidden">
                  <motion.div
                    animate={showEasterEgg ? { scale: [1, 1.2, 1], rotate: [0, 360, 0] } : {}}
                    transition={{ duration: 1 }}
                  >
                    {showEasterEgg ? '🎉' : '👨‍💻'}
                  </motion.div>
                  {showEasterEgg && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 opacity-20 rounded-full"
                    />
                  )}
                </div>
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0"
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6"
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  About Me
                </span>
              </motion.h1>
              
              <motion.div
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 sm:mb-8 min-h-[2em] sm:min-h-[4em] flex items-center justify-center px-4"
              >
                <span className="border-r-2 border-blue-600 animate-pulse pr-1 text-center">
                  {typingText}
                </span>
              </motion.div>
              
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4"
              >
                I'm a passionate Full-Stack ML Engineer who thrives on creating innovative solutions that bridge the gap 
                between cutting-edge AI research and real-world applications. With expertise in modern technologies like 
                LangChain, FAISS, and intelligent systems, I craft solutions that make a meaningful impact.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 sm:mb-8 px-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResumeDownload}
                  className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg group min-h-[48px] w-full sm:w-auto"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="group-hover:animate-none"
                  >
                    <Download className="h-5 w-5" />
                  </motion.div>
                  Download Resume
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('mailto:arkaofficial13@gmail.com')}
                  className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 min-h-[48px] w-full sm:w-auto"
                >
                  <Mail className="h-5 w-5" />
                  Let's Connect
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center space-x-6 mb-6 sm:mb-8"
              >
                <motion.a
                  href="https://github.com/Arkaprabha13"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2"
                >
                  <Github className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/arkaprabhabanerjee13/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2"
                >
                  <Linkedin className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="mailto:arkaofficial13@gmail.com"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2"
                >
                  <Mail className="h-6 w-6" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced ScrollStack Timeline Section */}
        <section className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20" ref={timelineRef}>
          <div className="relative">
            {/* Section Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-purple-50 via-blue-50 to-transparent dark:from-purple-900/20 dark:via-blue-900/20 dark:to-transparent">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8 text-gray-900 dark:text-white">
                    My Journey
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8">
                    From curious beginner to Full-Stack ML Engineer - scroll through my evolution in tech
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsPlaying(!isPlaying);
                        setTimelineKey(prev => prev + 1); // Force re-render
                      }}
                      className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors min-h-[44px] text-sm sm:text-base"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {isPlaying ? 'Pause Scroll' : 'Auto Scroll'}
                    </motion.button>
                    
                    <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>Scroll to explore</span>
                      <ChevronDown className="h-4 w-4 animate-bounce" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ScrollStack Timeline */}
            <ScrollStack
              key={timelineKey}
              className="timeline-scroll-stack"
              itemDistance={120}
              itemScale={0.05}
              itemStackDistance={40}
              stackPosition="25%"
              scaleEndPosition="15%"
              baseScale={0.9}
              rotationAmount={2}
              blurAmount={1}
              onStackComplete={() => {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 2000);
              }}
            >
              {timelineData.map((item, index) => (
                <ScrollStackItem key={index} itemClassName="timeline-card">
                  <div className="relative">
                    {/* Year Badge */}
                    <div className="timeline-year-badge">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-lg"
                      >
                        {item.year}
                      </motion.div>
                    </div>

                    {/* Icon */}
                    <div className="timeline-icon-wrapper">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
                        style={{
                          background: `linear-gradient(135deg, ${item.color.split(' ')[1]}, ${item.color.split(' ')[3]})`
                        }}
                      >
                        <item.icon className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="mt-8 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{item.duration}</span>
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {item.title}
                      </h3>
                      
                      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="timeline-achievements">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        Key Achievements
                      </h4>
                      <div className="space-y-3">
                        {item.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="timeline-achievement-item">
                            <div className="timeline-achievement-dot" />
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </section>

        {/* Enhanced Skills Section */}
        <section className="py-12 sm:py-20 bg-white dark:bg-gray-800" ref={skillsRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 text-gray-900 dark:text-white"
            >
              Technical Skills
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="bg-white dark:bg-gray-700 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{skill.name}</span>
                    <motion.span 
                      className="text-xs sm:text-sm text-gray-500"
                      animate={hoveredSkill === index ? { scale: 1.2, color: skill.color } : { scale: 1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 sm:h-3 mb-2 overflow-hidden">
                    <motion.div
                      variants={skillVariants}
                      initial="hidden"
                      animate={isSkillsInView ? "visible" : "hidden"}
                      custom={skill.level}
                      className="h-2 sm:h-3 rounded-full relative"
                      style={{ backgroundColor: skill.color }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/30 rounded-full"
                        animate={hoveredSkill === index ? { x: ['-100%', '100%'] } : {}}
                        transition={{ duration: 1, repeat: hoveredSkill === index ? Infinity : 0 }}
                      />
                    </motion.div>
                  </div>
                  
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={hoveredSkill === index ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 overflow-hidden"
                  >
                    {skill.description}
                  </motion.p>
                  
                  {hoveredSkill === index && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.1 }}
                      className="absolute top-2 right-2 w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Fun Facts Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 text-gray-900 dark:text-white"
            >
              Fun Facts
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  onClick={() => setExpandedFact(expandedFact === index ? null : index)}
                  className="text-center cursor-pointer group bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <motion.div 
                    className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-r ${fact.color} rounded-full flex items-center justify-center text-2xl sm:text-4xl relative overflow-hidden`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="relative z-10">{fact.icon}</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2"
                    animate={expandedFact === index ? { scale: 1.1 } : { scale: 1 }}
                  >
                    {fact.value}
                  </motion.h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2">{fact.label}</p>
                  
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={expandedFact === index ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {fact.details}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Let's collaborate on your next innovative project
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 2000);
                    window.open('mailto:arkaofficial13@gmail.com');
                  }}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="h-5 w-5" />
                  Get In Touch
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResumeDownload}
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download Resume
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Floating Resume Download Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleResumeDownload}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group min-w-[48px] min-h-[48px] flex items-center justify-center"
          aria-label="Download Resume"
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Download className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default About;
