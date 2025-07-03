import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Calendar, Filter, Sun, Moon, Search, Eye, Heart, Share2, Download, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, X, Zap, Code, Database, Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'stars', 'updated'
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [visitedProjects, setVisitedProjects] = useState(new Set());

  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isProjectsInView = useInView(projectsRef, { once: true });

  // Dark mode and mouse tracking
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Auto-play demo
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setActiveFilter(prev => {
          const categories = ['All', 'AI', 'ML', 'CV', 'Web'];
          const currentIndex = categories.indexOf(prev);
          return categories[(currentIndex + 1) % categories.length];
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const navigationItems = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Projects', link: '/projects' },
    { name: 'Blog', link: '/blog' },
    { name: 'Contact', link: '/contact' }
  ];

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
    {
      id: 2,
      name: 'AutoML SaaS Platform',
      category: 'ML',
      techStack: ['Streamlit', 'scikit-learn', 'Plotly', 'Pandas', 'Docker'],
      brief: 'No-code machine learning pipeline with automated EDA, model training, and exportable artifacts. Democratizing ML for non-technical users.',
      fullDescription: 'A comprehensive AutoML platform that enables users to build, train, and deploy machine learning models without writing code. Features automated data preprocessing, model selection, hyperparameter tuning, and performance visualization with interactive dashboards.',
      githubUrl: 'https://github.com/arkaprabha/automl-platform',
      liveUrl: 'https://automl-demo.streamlit.app',
      heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop'
      ],
      status: 'Demo',
      stars: 34,
      forks: 8,
      lastUpdated: '2024-11',
      difficulty: 'Intermediate',
      duration: '4 months',
      team: '2 developers',
      features: [
        'Automated data preprocessing and cleaning',
        'Multiple ML algorithm comparison',
        'Interactive visualization dashboard',
        'Model export in multiple formats',
        'Hyperparameter optimization',
        'Real-time model performance monitoring'
      ],
      technologies: {
        frontend: ['Streamlit', 'Plotly', 'HTML/CSS'],
        backend: ['Python', 'scikit-learn', 'Pandas'],
        database: ['SQLite', 'File Storage'],
        deployment: ['Docker', 'Streamlit Cloud']
      },
      metrics: {
        models: '15+',
        accuracy: '95%+',
        processing: '10x faster',
        users: '500+'
      }
    },
    {
      id: 3,
      name: 'RAG Multi-Agent Assistant',
      category: 'AI',
      techStack: ['LangChain', 'FAISS', 'Llama 3', 'Supabase', 'FastAPI'],
      brief: 'Retrieval-Augmented Generation system with multi-agent routing and context persistence. Intelligent document Q&A with conversation memory.',
      fullDescription: 'Advanced RAG system that combines multiple AI agents for intelligent document processing and question answering. Features include context-aware responses, conversation memory, multi-document support, and real-time collaboration capabilities.',
      githubUrl: 'https://github.com/arkaprabha/rag-assistant',
      liveUrl: null,
      heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop'
      ],
      status: 'GitHub',
      stars: 28,
      forks: 6,
      lastUpdated: '2024-12',
      difficulty: 'Expert',
      duration: '5 months',
      team: '1 developer',
      features: [
        'Multi-agent conversation routing',
        'Context-aware document retrieval',
        'Conversation memory persistence',
        'Support for multiple document formats',
        'Real-time collaboration features',
        'Advanced semantic search capabilities'
      ],
      technologies: {
        frontend: ['React', 'TypeScript', 'Tailwind CSS'],
        backend: ['FastAPI', 'LangChain', 'Python'],
        database: ['Supabase', 'FAISS', 'Vector DB'],
        ai: ['Llama 3', 'RAG', 'Multi-Agent Systems']
      },
      metrics: {
        accuracy: '92%',
        response: '<500ms',
        documents: '10K+',
        queries: '50K+'
      }
    },
    {
      id: 4,
      name: 'YOLOv5 Detection Pipeline',
      category: 'CV',
      techStack: ['Python', 'OpenCV', 'PyTorch', 'MLOps', 'Docker', 'FastAPI'],
      brief: 'End-to-end object detection pipeline with real-time inference and custom training modules. Production-ready deployment with MLOps best practices.',
      fullDescription: 'Complete computer vision pipeline built on YOLOv5 with custom training capabilities, real-time inference, and production deployment. Includes data augmentation, model optimization, performance monitoring, and automated CI/CD pipelines.',
      githubUrl: 'https://github.com/arkaprabha/yolo-pipeline',
      liveUrl: 'https://yolo-demo.herokuapp.com',
      heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop'
      ],
      status: 'Live',
      stars: 52,
      forks: 15,
      lastUpdated: '2024-10',
      difficulty: 'Advanced',
      duration: '4 months',
      team: '2 developers',
      features: [
        'Custom dataset training pipeline',
        'Real-time object detection API',
        'Model performance monitoring',
        'Containerized deployment with Docker',
        'Automated model versioning',
        'Edge device optimization'
      ],
      technologies: {
        frontend: ['React', 'WebRTC', 'Canvas API'],
        backend: ['FastAPI', 'PyTorch', 'OpenCV'],
        deployment: ['Docker', 'Kubernetes', 'AWS'],
        monitoring: ['MLflow', 'Prometheus', 'Grafana']
      },
      metrics: {
        fps: '30+',
        accuracy: '95%',
        latency: '<100ms',
        objects: '80+ classes'
      }
    }
  ];

  const categories = ['All', 'AI', 'ML', 'CV', 'Web'];

  // Enhanced filtering and sorting
  const filteredAndSortedProjects = projects
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

  const handleLike = (projectId) => {
    const newLiked = new Set(likedProjects);
    if (newLiked.has(projectId)) {
      newLiked.delete(projectId);
    } else {
      newLiked.add(projectId);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    setLikedProjects(newLiked);
  };

  const handleShare = async (project) => {
    if (navigator.share) {
      await navigator.share({
        title: project.name,
        text: project.brief,
        url: project.liveUrl || project.githubUrl
      });
    } else {
      navigator.clipboard.writeText(project.liveUrl || project.githubUrl);
      // Show toast notification
    }
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
    setCurrentImageIndex(0);
    setVisitedProjects(prev => new Set([...prev, project.id]));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live': return 'bg-green-500';
      case 'Demo': return 'bg-blue-500';
      case 'GitHub': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

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

      {/* Interactive Cursor */}
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
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <div className="bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative">
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
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative" ref={heroRef}>
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold mb-8"
              >
                <span className="text-gray-900 dark:text-white">Featured </span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Projects
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"
              >
                Showcasing innovative AI/ML solutions that push the boundaries of technology and create real-world impact
              </motion.p>

              {/* Interactive Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
              >
                {[
                  { label: 'Projects', value: projects.length+1, icon: Code },
                  { label: 'Technologies', value: '25+', icon: Database },
                  { label: 'GitHub Stars', value: '161', icon: Star },
                  { label: 'Live Demos', value: '3', icon: Globe }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                  >
                    <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Controls Section */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"
            >
              {/* Search and Controls */}
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search projects, technologies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Auto-play Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? 'Pause Demo' : 'Auto Demo'}
                  </motion.button>

                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="stars">Sort by Stars</option>
                    <option value="updated">Sort by Updated</option>
                  </select>

                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                    >
                      <div className="grid grid-cols-2 gap-1 w-4 h-4">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="bg-gray-400 rounded-sm"></div>
                        ))}
                      </div>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
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

              {/* Enhanced Filter Bar */}
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(category)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      activeFilter === category
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    <Filter className="mr-2 h-4 w-4 inline" />
                    {category}
                    {category !== 'All' && (
                      <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                        {projects.filter(p => p.category === category).length}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Projects Grid */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8" ref={projectsRef}>
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeFilter}-${viewMode}-${sortBy}`}
                layout
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "space-y-6"}
              >
                {filteredAndSortedProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, rotateY: 2 }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="group relative"
                  >
                    <Card className="glass-card overflow-hidden transition-all duration-300 hover:shadow-2xl relative">
                      {/* Visited Indicator */}
                      {visitedProjects.has(project.id) && (
                        <div className="absolute top-2 left-2 z-10">
                          <Eye className="h-4 w-4 text-green-500" />
                        </div>
                      )}

                      {/* Enhanced Image Section */}
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={project.heroImage}
                          alt={project.name}
                          className="w-full h-64 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Enhanced Status Badges */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-black/20 text-white backdrop-blur-sm">
                            {project.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                            {project.difficulty}
                          </span>
                        </div>

                        {/* Interactive Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4" />
                                <span className="text-sm">{project.stars}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <GitFork className="h-4 w-4" />
                                <span className="text-sm">{project.forks}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm">{project.lastUpdated}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLike(project.id);
                                }}
                                className={`p-2 rounded-full backdrop-blur-sm ${
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
                                className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
                              >
                                <Share2 className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Quick View Button */}
                        <motion.button
                          initial={{ opacity: 0, scale: 0 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          onClick={() => openProjectModal(project)}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <Eye className="h-6 w-6 text-gray-900 dark:text-white" />
                        </motion.button>
                      </div>
                      
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-between">
                          {project.name}
                          {hoveredProject === project.id && (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex gap-2"
                            >
                              <Zap className="h-5 w-5 text-yellow-500" />
                            </motion.div>
                          )}
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {project.brief}
                        </p>

                        {/* Project Metrics */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                            <div key={key} className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="text-lg font-bold text-blue-600">{value}</div>
                              <div className="text-xs text-gray-500 capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                          <ul className="space-y-1">
                            {project.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.techStack.slice(0, 4).map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium cursor-pointer"
                            >
                              {tech}
                            </motion.span>
                          ))}
                          {project.techStack.length > 4 && (
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                              +{project.techStack.length - 4}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-3">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                            onClick={() => window.open(project.githubUrl, '_blank')}
                          >
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                          </Button>
                          {project.liveUrl && (
                            <Button 
                              variant="outline" 
                              className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              onClick={() => window.open(project.liveUrl, '_blank')}
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

            {/* No Results Message */}
            {filteredAndSortedProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No projects found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('All');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h2 className="text-4xl font-bold mb-6">Like What You See?</h2>
              <p className="text-xl mb-8 opacity-90">
                Let's collaborate on your next innovative project
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('mailto:arkaofficial13@gmail.com')}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors"
                >
                  Get In Touch
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://github.com/Arkaprabha13', '_blank')}
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold transition-colors"
                >
                  View All Projects
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Enhanced Project Modal */}
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
              {/* Modal Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.name}
                </h2>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Image Gallery */}
                <div className="relative mb-6">
                  <img
                    src={selectedProject.galleryImages[currentImageIndex]}
                    alt={selectedProject.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  {selectedProject.galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex(prev => 
                          prev === 0 ? selectedProject.galleryImages.length - 1 : prev - 1
                        )}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex(prev => 
                          prev === selectedProject.galleryImages.length - 1 ? 0 : prev + 1
                        )}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Project Info</h3>
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
                        <span className={`px-2 py-1 rounded ${getDifficultyColor(selectedProject.difficulty)}`}>
                          {selectedProject.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Key Metrics</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedProject.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <div className="font-bold text-blue-600">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Full Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                {/* All Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Technology Stack</h3>
                  <div className="space-y-3">
                    {Object.entries(selectedProject.technologies).map(([category, techs]) => (
                      <div key={category}>
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize mb-1">
                          {category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {techs.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Source
                  </Button>
                  {selectedProject.liveUrl && (
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={() => handleShare(selectedProject)}
                  >
                    <Share2 className="h-4 w-4" />
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
