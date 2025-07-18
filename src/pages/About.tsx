import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Calendar, MapPin, GraduationCap, Award, Code, Heart, Sun, Moon, 
  ChevronDown, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, 
  Download, FileText, Mail, Github, Linkedin, ExternalLink 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import {
  Navbar, NavBody, NavItems, MobileNav, NavbarLogo, NavbarButton,
  MobileNavHeader, MobileNavToggle, MobileNavMenu,
} from '@/components/ui/resizable-navbar';
import './Timeline.css';
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

  // Timeline Data
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    },
    {
      year: '2025',
      title: 'Built Krishak AI Platform',
      description: 'Agricultural AI platform with 99.35% disease detection accuracy using advanced CNN models',
      icon: Award,
      color: 'from-green-500 to-teal-600',
      duration: '3 months',
      achievements: [
        '99.35% Disease Detection Accuracy',
        '1000+ Farmers Helped',
        'Featured in Tech Communities'
      ]
    },
    {
      year: '2025',
      title: 'Full-Stack ML Engineer',
      description: 'Specializing in LangChain, FAISS, RAG systems, and intelligent automation',
      icon: Heart,
      color: 'from-orange-500 to-red-600',
      duration: 'Present',
      achievements: [
        '8+ Major Projects Completed',
        'Industry Recognition',
        'Advanced AI/ML Expertise'
      ]
    }
  ];

  // Skills Data
  const skills = [
    // Programming Languages & Core Tech
    { name: 'Python', level: 95, color: '#3776ab', description: 'Advanced scripting, ML/AI, automation, data pipelines' },
    { name: 'JavaScript/TypeScript', level: 90, color: '#f7df1e', description: 'Modern web apps, async patterns, scalable codebases' },
    { name: 'C++/C#', level: 70, color: '#00599c', description: 'System-level programming, backend APIs, performance-critical modules' },
    { name: 'SQL & NoSQL', level: 88, color: '#00618a', description: 'Relational (PostgreSQL, MySQL), document (MongoDB), vector DBs (FAISS)' },

    // Web & Frontend
    { name: 'React/Next.js', level: 90, color: '#61dafb', description: 'Component-based architecture, server-side rendering, modern hooks' },
    { name: 'HTML5 & CSS3', level: 85, color: '#e44d26', description: 'Responsive design, accessibility, modern layouts' },
    { name: 'Tailwind CSS', level: 80, color: '#38bdf8', description: 'Utility-first styling, rapid prototyping, dark mode' },

    // Backend & APIs
    { name: 'Django/DRF', level: 88, color: '#092e20', description: 'REST APIs, admin panels, ORM, authentication systems' },
    { name: 'FastAPI', level: 90, color: '#009688', description: 'Async microservices, OpenAPI docs, blazing-fast endpoints' },
    { name: 'Flask', level: 80, color: '#000000', description: 'Lightweight APIs, webhooks, internal tooling' },
    { name: 'Supabase', level: 85, color: '#3ecf8e', description: 'Real-time DB, auth, storage, Postgres at scale' },

    // AI/ML & Data
    { name: 'Machine Learning', level: 92, color: '#ff6f00', description: 'Deep learning, computer vision, NLP, model deployment' },
    { name: 'LangChain', level: 85, color: '#1c3d5c', description: 'RAG systems, multi-agent architectures, LLM pipelines' },
    { name: 'FAISS/Qdrant', level: 90, color: '#4285f4', description: 'Vector search, embeddings, retrieval-augmented generation' },
    { name: 'OpenCV/YOLO', level: 88, color: '#5c3317', description: 'Computer vision, object detection, real-time processing' },
    { name: 'Streamlit', level: 90, color: '#ff4b4b', description: 'Interactive dashboards, rapid ML prototyping' },

    // Data Structures & Algorithms
    { name: 'DSA/Problem Solving', level: 90, color: '#00bcd4', description: '500+ LeetCode/GFG problems, optimization algorithms' },

    // Testing & Quality
    { name: 'Testing & Debugging', level: 85, color: '#4caf50', description: 'Unit testing, integration testing, performance optimization' },

    // Tools & Workflow
    { name: 'Git & Version Control', level: 90, color: '#f34f29', description: 'Branching strategies, code reviews, collaborative development' },
    { name: 'Development Tools', level: 85, color: '#007acc', description: 'VSCode, PyCharm, productivity optimization' },

    // Soft Skills
    { name: 'Communication', level: 90, color: '#2196f3', description: 'Technical writing, documentation, stakeholder communication' },
    { name: 'Team Collaboration', level: 88, color: '#8bc34a', description: 'Agile methodologies, peer reviews, mentoring' },
    { name: 'Problem Solving', level: 92, color: '#ff9800', description: 'Analytical thinking, creative solutions, debugging expertise' },
    { name: 'Adaptability', level: 85, color: '#9c27b0', description: 'Learning new technologies, adapting to changing requirements' }
  ];

  // Fun Facts Data
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
    },
    { 
      icon: '⏱️', 
      label: 'Development Speed', 
      value: '80% Faster', 
      details: 'AutoML platform reduces traditional model development time',
      color: 'from-cyan-400 to-blue-500'
    },
    { 
      icon: '🔧', 
      label: 'API Response Time', 
      value: '<400ms', 
      details: 'Optimized backend performance with efficient algorithms',
      color: 'from-orange-400 to-red-500'
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

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setActiveTimeline(prev => (prev + 1) % timelineData.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, timelineData.length]);

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

              {/* Resume Preview Card */}
              <motion.div
                variants={itemVariants}
                className="max-w-md mx-auto mb-6 sm:mb-8 px-4"
              >
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Resume</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">PDF • Updated 2025</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleResumeDownload}
                      className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors min-w-[40px] min-h-[40px]"
                    >
                      <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </motion.button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-left">
                    Complete overview of my experience, skills, and achievements in Full-Stack ML Engineering.
                  </p>
                </motion.div>
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

              <motion.div
                variants={itemVariants}
                className="flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-blue-600 dark:text-blue-400"
                >
                  <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

       {/* Enhanced Mobile-Responsive Timeline Section - FIXED VERSION */}
<section className="py-12 sm:py-20 bg-white dark:bg-gray-800 relative" ref={timelineRef}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8 sm:mb-16"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8 text-gray-900 dark:text-white">
        My Journey
      </h2>
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8">
        From curious beginner to Full-Stack ML Engineer - here's how my passion for technology evolved
      </p>
      
      {/* Enhanced Control Panel */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors min-h-[44px] text-sm sm:text-base"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? 'Pause Auto-Play' : 'Auto-Play Journey'}
        </motion.button>
        
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{activeTimeline + 1}</span>
          <span>/</span>
          <span>{timelineData.length}</span>
        </div>
      </div>
    </motion.div>
    
    {/* FIXED Timeline Container */}
    <div className="relative">
      {/* Central Timeline Line - PROPERLY POSITIONED */}
      <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-blue-600 to-purple-600 z-10"></div>
      
      {/* Timeline Items - FIXED ALTERNATING LAYOUT */}
      <div className="space-y-12 md:space-y-16">
        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center ${
                // Mobile: all items align left with proper spacing
                // Desktop: alternating left-right layout
                'md:' + (isEven ? 'justify-start' : 'justify-end')
              }`}
              onMouseEnter={() => setActiveTimeline(index)}
              onTouchStart={() => setActiveTimeline(index)}
            >
              {/* Timeline Icon - PERFECTLY CENTERED */}
              <motion.div 
                className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-12 h-12 rounded-full z-20 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                animate={activeTimeline === index ? { 
                  scale: 1.15, 
                  boxShadow: "0 0 25px rgba(59, 130, 246, 0.6)" 
                } : { scale: 1 }}
                style={{
                  background: `linear-gradient(135deg, ${item.color.split(' ')[1]}, ${item.color.split(' ')[3]})`
                }}
              >
                <item.icon className="h-6 w-6 text-white" />
              </motion.div>
              
              {/* Content Container - PROPER POSITIONING */}
              <div className={`
                w-full ml-20 md:ml-0 md:w-5/12
                ${isEven ? 'md:pr-16' : 'md:pl-16'}
              `}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  {/* Connection Line to Icon - DESKTOP ONLY */}
                  <div className={`hidden md:block absolute top-6 w-8 h-0.5 bg-gray-300 dark:bg-gray-600 ${
                    isEven ? 'right-0' : 'left-0'
                  }`}></div>
                  
                  <Card className={`timeline-card transition-all duration-300 ${
                    activeTimeline === index ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-lg'
                  } bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600`}>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center space-x-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {item.year}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3" />
                          <span>{item.duration}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* Achievements Section */}
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={activeTimeline === index ? { 
                          height: 'auto', 
                          opacity: 1 
                        } : { 
                          height: 0, 
                          opacity: 0 
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <Award className="h-4 w-4 text-yellow-500" />
                            Key Achievements
                          </h4>
                          <div className="space-y-2">
                            {item.achievements.map((achievement, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-2 text-sm"
                              >
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {achievement}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Expand Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTimeline(activeTimeline === index ? -1 : index)}
                        className="mt-4 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors min-h-[44px]"
                      >
                        <span className="sm:hidden">
                          {activeTimeline === index ? 'Show Less' : 'Show More'}
                        </span>
                        <span className="hidden sm:inline">
                          {activeTimeline === index ? 'Collapse' : 'Expand Details'}
                        </span>
                        <ChevronDown className={`h-4 w-4 transform transition-transform ${
                          activeTimeline === index ? 'rotate-180' : ''
                        }`} />
                      </motion.button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Mobile Progress Indicator */}
      <div className="md:hidden mt-8 flex justify-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {activeTimeline + 1} of {timelineData.length}
          </span>
          <div className="flex gap-1">
            {timelineData.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeTimeline ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    
    {/* Navigation Controls */}
    <div className="mt-8 sm:mt-12 flex justify-center">
      <div className="flex gap-2 sm:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTimeline(Math.max(0, activeTimeline - 1))}
          disabled={activeTimeline === 0}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors min-h-[44px]"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTimeline(Math.min(timelineData.length - 1, activeTimeline + 1))}
          disabled={activeTimeline === timelineData.length - 1}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors min-h-[44px]"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  </div>
</section>

        {/* Enhanced Skills Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900" ref={skillsRef}>
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
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
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
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 mb-2 overflow-hidden">
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
        <section className="py-12 sm:py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 text-gray-900 dark:text-white"
            >
              Fun Facts
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  onClick={() => setExpandedFact(expandedFact === index ? null : index)}
                  className="text-center cursor-pointer group"
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
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 px-2">
                      {fact.details}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Personal Story Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-white">
                  What Drives Me
                </h2>
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    My passion for technology started early, sparked by curiosity about how intelligent systems can solve complex real-world problems. 
                    The intersection of AI and practical application became my driving force—creating solutions that don't just showcase technical prowess, 
                    but genuinely improve people's lives.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    From developing agricultural AI platforms that help farmers detect crop diseases with 99.35% accuracy to creating AutoML systems 
                    that democratize machine learning for non-technical users, I believe technology should be accessible, impactful, and transformative. 
                    Every project I build is guided by this principle.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Beyond coding, I'm deeply involved in the developer community—contributing to open-source projects, mentoring aspiring developers, 
                    and staying on the cutting edge of ML research. I believe knowledge shared is knowledge multiplied.
                  </motion.p>
                </div>

                {/* Resume CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Want to know more about my journey?
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Download my complete resume for detailed information about my experience and projects.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleResumeDownload}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors min-h-[44px] w-full sm:w-auto justify-center"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Resume</span>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ rotateY: 5, scale: 1.02 }}
                  className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-2xl"
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                    Currently Exploring
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {[
                      'Advanced RAG Systems with LangChain',
                      'Multi-Agent AI Architectures',
                      'Edge AI and Model Optimization',
                      'Computer Vision in Agriculture'
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center group cursor-pointer"
                        whileHover={{ x: 10 }}
                      >
                        <motion.div 
                          className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full mr-3 sm:mr-4 flex-shrink-0"
                          whileHover={{ scale: 1.5, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="font-medium group-hover:text-yellow-200 transition-colors text-sm sm:text-base">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform translate-x-2 translate-y-2 opacity-20"
                  animate={{ 
                    translateX: [8, 12, 8],
                    translateY: [8, 12, 8]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
            </div>
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
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileHover={{ width: 'auto', opacity: 1 }}
            className="hidden sm:block absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap overflow-hidden"
          >
            Download Resume
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default About;
