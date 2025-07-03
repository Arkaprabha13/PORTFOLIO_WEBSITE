
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Mail, Moon, Sun, ChevronDown, Star, Trophy, Code, ArrowRight, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import ProfileCard from '@/components/effects/ProfileCard';
import CardSwap, { Card as SwapCard } from '@/components/effects/CardSwap';
import DotGrid from '@/components/effects/DotGrid';
import ScrambledText from '@/components/effects/ScrambledText';
import { Vortex } from '@/components/ui/vortex';
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

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dark mode toggle
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

  // Tech stack data
  const techStack = [
    { name: 'Python', color: '#3776ab', icon: '🐍' },
    { name: 'Django', color: '#092e20', icon: '🎯' },
    { name: 'FastAPI', color: '#009688', icon: '⚡' },
    { name: 'React', color: '#61dafb', icon: '⚛️' },
    { name: 'Next.js', color: '#000000', icon: '▲' },
    { name: 'LangChain', color: '#1c3d5c', icon: '🦜' },
    { name: 'FAISS', color: '#4285f4', icon: '🔍' },
    { name: 'Supabase', color: '#3ecf8e', icon: '⚡' },
    { name: 'Docker', color: '#2496ed', icon: '🐳' },
    { name: 'PyTorch', color: '#ee4c2c', icon: '🔥' },
    { name: 'TensorFlow', color: '#ff6f00', icon: '🧠' },
    { name: 'Kubernetes', color: '#326ce5', icon: '☸️' }
  ];

  // Stats data
  const stats = [
    { label: 'GitHub Commits', value: '2,847', icon: Github, color: 'from-gray-600 to-gray-800' },
    { label: 'LeetCode Solved', value: '324', icon: Code, color: 'from-orange-500 to-red-600' },
    { label: 'Kaggle Rank', value: '#1,247', icon: Trophy, color: 'from-blue-500 to-purple-600' }
  ];

  // Featured projects
  const projects = [
    {
      name: 'Krishak 🌾',
      tech: ['LangChain', 'FAISS', 'Groq API', 'CNN'],
      brief: 'AI platform for crop advice, disease diagnosis (99.35% accuracy).',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
      status: 'Live',
      category: 'AI'
    },
    {
      name: 'AutoML SaaS Platform',
      tech: ['Streamlit', 'scikit-learn', 'Plotly'],
      brief: 'No-code ML pipeline with EDA, model training, exportable artifacts.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      status: 'Demo',
      category: 'ML'
    },
    {
      name: 'RAG Multi-Agent Assistant',
      tech: ['LangChain', 'FAISS', 'Llama 3', 'Supabase'],
      brief: 'Retrieval-Augmented Q&A with multi-agent routing and context persistence.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      status: 'GitHub',
      category: 'AI'
    }
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Arkaprabha.dev
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-full"
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden rounded-full"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-200 dark:border-gray-700"
              >
                <div className="py-4 space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-60 h-60 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-6xl">
                👨‍💻
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-gray-900 dark:text-white">Hi 👋 I'm </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Arkaprabha Banerjee
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Full-Stack ML Engineer crafting intelligent solutions with cutting-edge AI technologies
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg">
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-3 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-200">
              <Github className="mr-2 h-5 w-5" />
              View GitHub
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="animate-bounce">
              <ChevronDown className="h-6 w-6 text-gray-400" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ProfileCard Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative overflow-hidden">
        {/* DotGrid Background */}
        <div className="absolute inset-0 opacity-30">
          <DotGrid
            dotSize={12}
            gap={28}
            baseColor="#3b82f6"
            activeColor="#60a5fa"
            proximity={120}
            shockRadius={200}
            shockStrength={4}
            returnDuration={1.2}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gray-900 dark:text-white">Get to know </span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  the Developer
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Passionate Full-Stack ML Engineer with expertise in building intelligent systems using cutting-edge AI technologies. 
                Specialized in LangChain, FAISS, and creating scalable solutions that bridge the gap between research and real-world applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold"
                  onClick={() => window.open('mailto:arkaofficial13@gmail.com', '_blank')}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Let's Connect
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 py-3 rounded-full font-semibold"
                  onClick={() => window.open('https://github.com/Arkaprabha13', '_blank')}
                >
                  <Github className="mr-2 h-5 w-5" />
                  GitHub Profile
                </Button>
              </div>
            </motion.div>

            {/* ProfileCard */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-md">
                <ProfileCard
                  name="Arkaprabha Banerjee"
                  title="Full-Stack ML Engineer"
                  handle="Arkaprabha13"
                  status="Available for hire"
                  contactText="Contact Me"
                  avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  miniAvatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  enableTilt={true}
                  showUserInfo={true}
                  onContactClick={() => window.open('mailto:arkaofficial13@gmail.com', '_blank')}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-20 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            Tech Stack & Expertise
          </motion.h2>
          
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee hover:animation-paused">
              {[...techStack, ...techStack].map((tech, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-4 px-6 py-3 bg-white dark:bg-gray-700 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{tech.icon}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{tech.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-8 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects with CardSwap */}
      <section id="projects" className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Showcasing innovative AI/ML solutions that push the boundaries of technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Interactive Project Showcase
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Explore my latest projects featuring cutting-edge AI and ML technologies. Each project represents 
                  a unique challenge solved with innovative approaches and modern tech stacks.
                </p>
              </div>
              
              {/* Project highlights */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">AI-Powered Solutions</h4>
                    <p className="text-gray-600 dark:text-gray-300">LangChain, FAISS, and advanced ML algorithms</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Production-Ready</h4>
                    <p className="text-gray-600 dark:text-gray-300">Deployed applications with real-world impact</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Open Source</h4>
                    <p className="text-gray-600 dark:text-gray-300">Contributing to the developer community</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side - CardSwap */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end relative"
            >
              <div style={{ height: '600px', position: 'relative', width: '400px' }}>
                <CardSwap
                  width={350}
                  height={450}
                  cardDistance={60}
                  verticalDistance={70}
                  delay={4000}
                  pauseOnHover={true}
                  easing="elastic"
                >
                  {projects.map((project, index) => (
                    <SwapCard key={index}>
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <div className={`project-status status-${project.status.toLowerCase()}`}>
                            {project.status}
                          </div>
                          <h3>{project.name}</h3>
                          <p>{project.brief}</p>
                          <div className="tech-stack">
                            {project.tech.slice(0, 3).map((tech, techIndex) => (
                              <span key={techIndex} className="tech-tag">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4">
                          <span className="text-xs text-gray-400">{project.category}</span>
                        </div>
                      </div>
                    </SwapCard>
                  ))}
                </CardSwap>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <Button 
              variant="outline" 
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-3 rounded-full text-lg font-semibold"
              onClick={() => window.open('/projects', '_self')}
            >
              View All Projects
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Arkaprabha Banerjee. Crafted with ❤️ and cutting-edge tech.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
