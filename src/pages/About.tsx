import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Calendar, MapPin, GraduationCap, Award, Code, Heart, Sun, Moon, ChevronDown, Play, Pause, Volume2, VolumeX, Download, FileText, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '@/components/ui/resizable-navbar';

const About = () => {
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

  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const timelineRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true });
  const isSkillsInView = useInView(skillsRef, { once: true });
  const isTimelineInView = useInView(timelineRef, { once: true });

  // Dark mode toggle with smooth transition
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

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing animation effect
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
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // Auto-play timeline
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setActiveTimeline(prev => (prev + 1) % timelineData.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Easter egg trigger
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

  // Resume download handler
  const handleResumeDownload = () => {
    // Analytics tracking
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
    
    // Show success feedback
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const navigationItems = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Projects', link: '/projects' },
    { name: 'Blog', link: '/blog' },
    { name: 'Contact', link: '/contact' }
  ];

  const timelineData = [
    {
      year: '2022',
      title: 'Started B.Tech at Heritage Institute of Technology',
      description: 'Began my journey in Computer Science and Engineering with a focus on AI/ML fundamentals',
      icon: GraduationCap,
      color: 'from-blue-500 to-purple-600',
      achievements: ['CGPA: 9.1/10', 'Programming Started with C']
    },
    {
      year: '2023',
      title: '1st Time to Code in Cpp And Python',
      description: 'Learned C++ and Python, building foundational skills in programming and problem-solving',
      icon: GraduationCap,
      color: 'from-blue-500 to-purple-600',
      achievements: ['Leetcode: 100+ Problems Solved', 'GFG: 200+ Problems Solved']
    },
    {
      year: '2024',
      title: '1st hackathon at Diversion 2024',
      description: 'Participated in my first hackathon, focusing on AI/ML solutions for real-world problems',
      icon: GraduationCap,
      color: 'from-blue-500 to-purple-600',
      achievements: ['Not won any prize', 'Learned Team Collaboration', 'Gained Hackathon Experience']
    },
    {
      year: '2024',
      title: 'Joined NooBuild DSA Team',
      description: 'Contributing to open-source DSA projects and mentoring junior developers',
      icon: Code,
      color: 'from-purple-500 to-pink-600',
      achievements: ['500+ Problems Solved', 'Mentored 50+ Students']
    },
    {
      year: '2024',
      title: 'Building Different Projects',
      description: 'Contributing to various projects, enhancing my skills in full-stack development and AI',
      icon: Code,
      color: 'from-purple-500 to-pink-600',
      achievements: ['20+ projects for learning', 'Major 5+ Projects']
    },
    {
      year: '2025',
      title: 'Built Krishak AI Platform',
      description: 'Agricultural AI platform with 99.35% disease detection accuracy using advanced CNN models',
      icon: Award,
      color: 'from-green-500 to-blue-600',
      achievements: ['99.35% Accuracy', '1000+ Farmers Helped', 'Featured in Tech News']
    },
    {
      year: '2025',
      title: 'Full-Stack ML Engineer',
      description: 'Specializing in LangChain, FAISS, RAG systems, and intelligent automation',
      icon: Heart,
      color: 'from-orange-500 to-red-600',
      achievements: ['5+ Major Projects', 'Industry Recognition', 'Worked for Personal Projects']
    }
  ];

  const skills = [
  // Programming Languages & Core Tech
  { name: 'Python', level: 95, color: '#3776ab', description: 'Advanced scripting, ML/AI, automation, data pipelines' },
  { name: 'JavaScript/TypeScript', level: 90, color: '#f7df1e', description: 'Modern web apps, async patterns, scalable codebases' },
  { name: 'C++ / C#', level: 70, color: '#178600', description: 'System-level programming, backend APIs, performance-critical modules' },
  { name: 'SQL & NoSQL', level: 88, color: '#00618a', description: 'Relational (PostgreSQL, MySQL), document (MongoDB), and vector DBs (FAISS, Qdrant)' },

  // Web & Frontend
  { name: 'React / Next.js', level: 90, color: '#61dafb', description: 'Till Required for Backend Integration' },
  { name: 'HTML5 & CSS3', level: 85, color: '#e44d26', description: 'Responsive design, accessibility, modern layouts' },
  { name: 'Tailwind CSS', level: 80, color: '#38bdf8', description: 'Utility-first styling, rapid prototyping, dark mode' },

  // Backend & APIs
  { name: 'Django (MVT)', level: 88, color: '#092e20', description: 'Robust REST APIs, admin panels, ORM, authentication' },
  { name: 'Django REST Framework', level: 85, color: '#3b2e2c', description: 'Versioned APIs, serialization, permissions, throttling' },
  { name: 'FastAPI', level: 90, color: '#009688', description: 'Async microservices, OpenAPI docs, blazing-fast endpoints' },
  { name: 'Flask', level: 80, color: '#000000', description: 'Lightweight APIs, webhooks, internal tooling' },
  { name: '.NET MVC', level: 75, color: '#512bd4', description: 'Enterprise portals, strong typing, LINQ, scalable architecture' },
  { name: 'Supabase', level: 85, color: '#3ecf8e', description: 'Realtime DB, auth, storage, Postgres at scale' },

  // AI/ML & Data
  { name: 'Machine Learning', level: 92, color: '#ff6f00', description: 'Deep learning, computer vision, NLP, model deployment' },
  { name: 'LangChain', level: 85, color: '#1c3d5c', description: 'RAG systems, multi-agent architectures, LLM pipelines' },
  { name: 'FAISS / Qdrant', level: 90, color: '#4285f4', description: 'Vector search, embeddings, retrieval-augmented generation' },
  { name: 'YOLOv5 / OpenCV', level: 88, color: '#f44336', description: 'Object detection, real-time CV, custom training' },
  { name: 'Streamlit', level: 90, color: '#ff4b4b', description: 'Interactive dashboards, rapid ML prototyping' },

  // DevOps & Cloud
  // { name: 'Docker', level: 65, color: '#2496ed', description: 'Containerization, reproducible environments, local & prod' },
  // { name: 'Kubernetes', level: 50, color: '#326ce5', description: 'Orchestration, scaling, blue-green deployments' },
  // { name: 'GitHub Actions', level: 60, color: '#24292f', description: 'CI/CD, test automation, code quality gates' },
  // { name: 'AWS (Basics)', level: 45, color: '#ff9900', description: 'EC2, S3, Lambda, deployment pipelines' },

  // Data Structures & Algorithms
  { name: 'DSA / Problem Solving', level: 90, color: '#00bcd4', description: '500+ LeetCode/GFG, graph theory, DP, optimization' },

  // Testing & Quality
  { name: 'Unit / Integration Testing', level: 80, color: '#4caf50', description: 'Pytest, Jest, test-driven development, CI pipelines' },
  { name: 'Debugging & Profiling', level: 85, color: '#607d8b', description: 'Performance tuning, bug fixing, root cause analysis' },

  // Tools & Workflow
  { name: 'Git & Version Control', level: 90, color: '#f34f29', description: 'Branching, PRs, code reviews, collaboration' },
  { name: 'IDEs & Editors', level: 85, color: '#007acc', description: 'VSCode, PyCharm, productivity tooling' },

  // Soft Skills (critical for modern devs)
  { name: 'Communication', level: 90, color: '#2196f3', description: 'Technical writing, documentation, stakeholder updates' },
  { name: 'Teamwork & Mentoring', level: 88, color: '#8bc34a', description: 'Peer reviews, onboarding, knowledge sharing' },
  { name: 'Problem Solving', level: 92, color: '#ff9800', description: 'Analytical thinking, creative solutions, debugging' },
  { name: 'Adaptability', level: 85, color: '#9c27b0', description: 'Learning new tech, thriving in changing environments' },
  { name: 'Time Management', level: 85, color: '#607d8b', description: 'Meeting deadlines, task prioritization, agile workflows' }
];


  const funFacts = [
    { 
      icon: '🏆', 
      label: 'LeetCode Problems', 
      value: '360+', 
      details: 'Solved across Easy, Medium, and Hard difficulties',
      color: 'from-yellow-400 to-orange-500'
    },
    { 
    icon: '📚', 
    label: 'Technologies', 
    value: '20+', 
    details: 'Programming languages and frameworks',
    color: 'from-indigo-400 to-purple-500'
    }
    ,
    { 
      icon: '🚀', 
      label: 'Projects Built', 
      value: '25+', 
      details: 'Including AI/ML, web apps, and automation tools',
      color: 'from-blue-400 to-cyan-500'
    },
    { 
      icon: '📚', 
      label: 'Years Learning', 
      value: '3+', 
      details: 'Continuous learning and skill development',
      color: 'from-green-400 to-teal-500'
    },
    { 
      icon: '👥', 
      label: 'Students Mentored', 
      value: '400+', 
      details: 'Guided in programming and career development',
      color: 'from-teal-400 to-green-500'
    }

  ];

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

      {/* Enhanced Navigation */}
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

        {/* Enhanced Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative" ref={heroRef}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              className="text-center mb-16"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAvatarClick}
                className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-2 cursor-pointer relative"
              >
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-8xl relative overflow-hidden">
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
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  About Me
                </span>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8 h-16 flex items-center justify-center"
              >
                <span className="border-r-2 border-blue-600 animate-pulse pr-1">
                  {typingText}
                </span>
              </motion.div>
              
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
              >
                I'm a passionate Full-Stack ML Engineer who thrives on creating innovative solutions that bridge the gap 
                between cutting-edge AI research and real-world applications. With expertise in modern technologies like 
                LangChain, FAISS, and intelligent systems, I craft solutions that make a meaningful impact.
              </motion.p>

              {/* Enhanced CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResumeDownload}
                  className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg group"
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
                  className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
                >
                  <Mail className="h-5 w-5" />
                  Let's Connect
                </motion.button>
              </motion.div>

              {/* Resume Preview Card */}
              <motion.div
                variants={itemVariants}
                className="max-w-md mx-auto mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
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
                      className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
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
                className="flex justify-center space-x-6 mb-8"
              >
                <motion.a
                  href="https://github.com/Arkaprabha13"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/arkaprabhabanerjee13/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="mailto:arkaofficial13@gmail.com"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                  <ChevronDown className="h-8 w-8" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Timeline Section */}
        <section className="py-20 bg-white dark:bg-gray-800 relative" ref={timelineRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
                My Journey
              </h2>
              <div className="flex justify-center items-center gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pause' : 'Auto Play'}
                </motion.button>
              </div>
            </motion.div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
              
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                  onMouseEnter={() => setActiveTimeline(index)}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      className="perspective-1000"
                    >
                      <Card className={`glass-card transition-all duration-300 ${
                        activeTimeline === index ? 'ring-2 ring-blue-500 shadow-2xl' : 'hover:shadow-xl'
                      }`}>
                        <CardHeader>
                          <div className="flex items-center space-x-4">
                            <motion.div 
                              className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <item.icon className="h-6 w-6 text-white" />
                            </motion.div>
                            <div>
                              <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{item.year}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={activeTimeline === index ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2">
                              {item.achievements.map((achievement, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center text-sm text-green-600 dark:text-green-400"
                                >
                                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                  {achievement}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white dark:bg-gray-800 border-4 border-blue-600 rounded-full z-10"
                    whileHover={{ scale: 1.5 }}
                    animate={activeTimeline === index ? { scale: 1.3, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" } : { scale: 1 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Skills Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900" ref={skillsRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white"
            >
              Technical Skills
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
                    <motion.span 
                      className="text-sm text-gray-500"
                      animate={hoveredSkill === index ? { scale: 1.2, color: skill.color } : { scale: 1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                    <motion.div
                      variants={skillVariants}
                      initial="hidden"
                      animate={isSkillsInView ? "visible" : "hidden"}
                      custom={skill.level}
                      className="h-3 rounded-full relative"
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
                    className="text-sm text-gray-600 dark:text-gray-300 overflow-hidden"
                  >
                    {skill.description}
                  </motion.p>
                  
                  {hoveredSkill === index && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.1 }}
                      className="absolute top-2 right-2 w-16 h-16 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Fun Facts Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white"
            >
              Fun Facts
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                    className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${fact.color} rounded-full flex items-center justify-center text-4xl relative overflow-hidden`}
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
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                    animate={expandedFact === index ? { scale: 1.1 } : { scale: 1 }}
                  >
                    {fact.value}
                  </motion.h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{fact.label}</p>
                  
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={expandedFact === index ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {fact.details}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Personal Story Section */}
        <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
                  What Drives Me
                </h2>
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
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
                  className="mt-8 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-center justify-between">
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
                      className="ml-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download</span>
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
                  className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl"
                >
                  <h3 className="text-2xl font-bold mb-6">
                    Currently Exploring
                  </h3>
                  <ul className="space-y-4">
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
                          className="w-3 h-3 bg-white rounded-full mr-4"
                          whileHover={{ scale: 1.5, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="font-medium group-hover:text-yellow-200 transition-colors">
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

        {/* Floating Resume Download Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleResumeDownload}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            aria-label="Download Resume"
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Download className="h-6 w-6" />
            </motion.div>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileHover={{ width: 'auto', opacity: 1 }}
              className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap overflow-hidden"
            >
              Download Resume
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
