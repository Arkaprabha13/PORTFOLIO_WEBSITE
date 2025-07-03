import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Mail, Moon, Sun, ChevronDown, Trophy, Code, ArrowRight, Linkedin } from 'lucide-react';
import { LightBulbIcon } from '@heroicons/react/24/solid';
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

  // Dark mode toggle with persistence
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
    { name: 'Kubernetes', color: '#326ce5', icon: '☸️' },
    { name: 'PostgreSQL', color: '#336791', icon: '📊' },
    { name: 'JavaScript', color: '#f7df1e', icon: '🟨' },
    { name: 'Qdrant', color: '#f5a623', icon: '🔗'  },
    { name: 'Groq AI', color: '#f5a623', icon: '🤖' }, // Added Groq AI
    { name: 'OpenAI', color: '#f5a623', icon: '🧠' },
    { name: 'Data Science', color: '#f5a623', icon: '📊' },
    { name: 'Machine Learning', color: '#f5a623', icon: '🤖' },
    { name: 'AI/ML', color: '#f5a623', icon: '🧠' },
    { name: 'Algorithms', color: '#f5a623', icon: '⚙️' },
    { name: 'Data Engineering', color: '#f5a623', icon: '🔗' },
    { name: 'MLOps', color: '#f5a623', icon: '🔗' },
    { name: 'RAG Systems', color: '#f5a623', icon: '🔗' },
    { name: 'Web Development', color: '#f5a623', icon: '🌐' },
    { name: '.NET', color: '#512bd4', icon: '🔗' } ,
    { name: 'MVC', color: '#512bd4', icon: '🔗' }, // Added MVC for web development
    { name: 'C++', color: '#00599c', icon: '💻' } // Added C++ for systems programming
    // Added more languages as needed


  ];

  // Stats data
  const stats = [
    { label: 'GitHub Commits', value: '2,847', icon: Github, color: 'from-gray-600 to-gray-800' },
    { label: 'LeetCode Solved', value: '324', icon: Code, color: 'from-orange-500 to-red-600' },
    { label: 'Kaggle Rank', value: '#1,247', icon: Trophy, color: 'from-blue-500 to-purple-600' },
    { label: 'GFG Problems Solved', value: '600+', icon: LightBulbIcon, color: 'from-green-500 to-teal-600' }
  ];

  // Featured projects data
 // Featured projects data with proper demo images
const projects = [
  {
    name: 'Krishak AI 🌾',
    tech: ['LangChain', 'Qdrant(Vector DB)', 'Groq API', 'CNN', 'FastAPI'],
    brief: 'AI agricultural platform with SMS system, 71.35% disease detection accuracy, crop advice system.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop&crop=center', // Smart farming with technology
    status: 'Live',
    category: 'AI/ML',
    github: 'https://github.com/Arkaprabha13',
    live: '#'
  },
  {
    name: 'E-commerce Chatbot',
    tech: ['Flask', 'Groq AI', 'JWT', 'JavaScript', 'FAISS', 'LangChain', 'Qdrant', 'Pinecone'],
    brief: 'Full-stack e-commerce chatbot with AI recommendations, user auth, and modern UI.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop&crop=center', // Shopping cart and e-commerce
    status: 'Demo',
    category: 'Full-Stack',
    github: 'https://github.com/Arkaprabha13/Chatbot_for_ecommerce-',
    live: '#'
  },
  {
    name: 'Custom RAG System',
    tech: ['FastAPI', 'Groq AI', 'JWT', 'JavaScript', 'FAISS', 'LangChain', 'Qdrant', 'Pinecone'],
    brief: 'Custom RAG system with advanced retrieval capabilities and seamless integration.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center', // AI/ML neural network visualization
    status: 'Demo',
    category: 'AI/ML',
    github: 'https://github.com/Arkaprabha13/Rag_powered_assistant-',
    live: '#'
  },
  {
    name: 'Banking System v1.0',
    tech: ['C++', 'CMake', 'Web'],
    brief: 'Modern banking system with C++ backend API and dual frontend interfaces.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center', // Banking and finance
    status: 'GitHub',
    category: 'Systems',
    github: 'https://github.com/Arkaprabha13/banking_system',
    live: '#'
  },
  {
    name: 'AutoML SaaS Platform',
    tech: ['Streamlit', 'scikit-learn', 'Plotly', 'Pandas', 'NumPy', 'Seaborn', 'Matplotlib', 'ML Algos'],
    brief: 'No-code ML pipeline with automated EDA, model training, and exportable artifacts.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center', // Data analytics and charts
    status: 'Demo',
    category: 'ML',
    github: 'https://github.com/Arkaprabha13/AUTO_ML3',
    live: '#'
  },
  {
    name: 'Sorting Visualizers',
    tech: ['C++', 'Python', 'Tkinter'],
    brief: 'Interactive sorting algorithm visualizer with C++ algorithms and Tkinter display.',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop&crop=center', // Algorithm visualization and code
    status: 'GitHub',
    category: 'Algorithms',
    github: 'https://github.com/Arkaprabha13/sorting_visualizers',
    live: '#'
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
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Projects', link: '/projects' },
    { name: 'Blog', link: '/blog' },
    { name: 'Contact', link: '/contact' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navigationItems} />
          <div className="flex items-center gap-4">
            <NavbarButton
              variant="secondary"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
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

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
         <Vortex
  backgroundColor="transparent"
  baseHue={220}
  rangeHue={120}
  particleCount={800}
  rangeSpeed={2.5}
  baseSpeed={0.1}
  rangeY={150}
  baseRadius={1}
  rangeRadius={3}
  noiseSteps={4}
  enableGlow={true}
  enableInteraction={true}
  className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
>
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-white/85 to-purple-50/70 dark:from-gray-900/85 dark:via-gray-800/85 dark:to-purple-900/85 backdrop-blur-sm"></div>
</Vortex>

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
          <ScrambledText
            className="bg-gradient-to-r text-gray-900 dark:text-white from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block"
            radius={150}
            duration={1.5}
            scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
          >
            Arkaprabha
          </ScrambledText>
          <ScrambledText
            className="bg-gradient-to-r text-gray-900 dark:text-white from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block"
            radius={150}
            duration={1.5}
            scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
          >
           &nbsp; {/* Non-breaking space */}
          </ScrambledText>
          
          <ScrambledText
            className="bg-gradient-to-r text-gray-900 dark:text-white from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block"
            radius={150}
            duration={1.5}
            scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
          >
            Banerjee
          </ScrambledText>

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
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg"
              onClick={() => window.open('mailto:arkaofficial13@gmail.com')}
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-3 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-200"
              onClick={() => window.open('https://github.com/Arkaprabha13', '_blank')}
            >
              <Github className="mr-2 h-5 w-5" />
              View GitHub
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center space-x-6 mb-12"
          >
            <a
              href="https://github.com/Arkaprabha13"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/arkaprabhabanerjee13/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:arkaofficial13@gmail.com"
              aria-label="Mail"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>
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
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Meet Arkaprabha
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                A passionate Full-Stack ML Engineer who bridges the gap between cutting-edge AI research and real-world applications. Currently pursuing B.Tech in CSE at Heritage Institute of Technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Available for freelance work</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Open to collaboration</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <ProfileCard
                name="Arkaprabha Banerjee"
                title="Full-Stack ML Engineer"
                handle="arkaprabha13"
                status="Online"
                contactText="Contact Me"
                avatarUrl="https://media.licdn.com/dms/image/v2/D5603AQEEQwtxyY6zNg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1726458926371?e=2147483647&v=beta&t=rayWkb2J4QJ_B5gRwOKHYa06BlL3K052u-R-ag_o-ss"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => window.open('mailto:arkaofficial13@gmail.com')}
              />
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
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center space-x-3 group"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: tech.color + '20' }}
                  >
                    {tech.icon}
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
                    {tech.name}
                  </span>
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
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <Card className="p-8 group hover:scale-105 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
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

      {/* Featured Projects */}
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
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Professional Excellence
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  With a strong foundation in full-stack development, machine learning, and AI, I am dedicated to building innovative solutions that bridge technology and real-world applications. My expertise spans agricultural AI, automated machine learning platforms, advanced retrieval systems, and scalable software architectures. I continuously strive to learn and apply cutting-edge technologies to solve complex problems and deliver impactful results.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                  <div className="text-2xl font-bold">3+</div>
                  <div className="text-sm opacity-90">Years Learning</div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-4 text-white">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm opacity-90">Commitment to Excellence</div>
                </div>
              </div>

              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-200"
                onClick={() => window.open('/projects', '_self')}
              >
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end relative"
            >
              <div className="w-full max-w-md">
                <CardSwap
                  width={400}
                  height={500}
                  cardDistance={40}
                  verticalDistance={50}
                  delay={4000}
                  pauseOnHover={true}
                  easing="elastic"
                >
                  {projects.slice(0, 5).map((project, index) => (
                    <SwapCard
                      key={index}
                      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg"
                    >
                      <div className="h-full flex flex-col">
                        <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                              {project.status}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {project.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1">
                            {project.brief}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.slice(0, 3).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex space-x-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(project.github, '_blank')}
                              className="flex-1"
                            >
                              <Github className="h-4 w-4 mr-1" />
                              Code
                            </Button>
                            {project.live && project.live !== '#' && (
                              <Button
                                size="sm"
                                onClick={() => window.open(project.live, '_blank')}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                              >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Live
                              </Button>
                            )}
                          </div>
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
{/* Enhanced Footer */}
<footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute inset-0" style={{
      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
      backgroundSize: '20px 20px'
    }}></div>
  </div>
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
      
      {/* About Section - Enhanced */}
      <div className="md:col-span-2">
        <div className="mb-6">
          <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Arkaprabha Banerjee
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
        <p className="text-gray-300 mb-6 leading-relaxed text-lg max-w-md">
          Full-Stack ML Engineer crafting intelligent solutions with cutting-edge AI technologies. 
          Passionate about building scalable and impactful software that transforms ideas into reality.
        </p>
        
        {/* Social Links with Enhanced Styling */}
        <div className="flex space-x-6">
          <a 
            href="https://github.com/Arkaprabha13" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="group relative p-3 bg-gray-800 rounded-full border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Github className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </a>
          <a 
            href="https://www.linkedin.com/in/arkaprabhabanerjee13/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="group relative p-3 bg-gray-800 rounded-full border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Linkedin className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </a>
          <a 
            href="mailto:arkaofficial13@gmail.com"
            aria-label="Send Email"
            className="group relative p-3 bg-gray-800 rounded-full border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Mail className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </a>
        </div>
      </div>

      {/* Quick Links Section - Enhanced */}
      <nav aria-label="Quick links">
        <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
        <ul className="space-y-4">
          <li>
            <Link 
              to="/about" 
              className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-2 inline-flex items-center group"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/projects" 
              className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-2 inline-flex items-center group"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Projects
            </Link>
          </li>
          <li>
            <Link 
              to="/blog" 
              className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-2 inline-flex items-center group"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Blog
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-2 inline-flex items-center group"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Contact Info Section - Enhanced */}
      <address className="not-italic">
        <h3 className="text-xl font-semibold mb-6 text-white">Get In Touch</h3>
        <ul className="space-y-4">
          <li className="flex items-center group">
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
              <Mail className="h-4 w-4 text-gray-400 group-hover:text-white" />
            </div>
            <a 
              href="mailto:arkaofficial13@gmail.com" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              arkaofficial13@gmail.com
            </a>
          </li>
          <li className="flex items-center group">
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
              <Github className="h-4 w-4 text-gray-400 group-hover:text-white" />
            </div>
            <a 
              href="https://github.com/Arkaprabha13" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              github.com/Arkaprabha13
            </a>
          </li>
          <li className="flex items-center group">
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
              <Linkedin className="h-4 w-4 text-gray-400 group-hover:text-white" />
            </div>
            <a 
              href="https://www.linkedin.com/in/arkaprabhabanerjee13/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              LinkedIn Profile
            </a>
          </li>
        </ul>
      </address>
      
    </div>
    
    {/* Enhanced Bottom Section */}
    <div className="border-t border-gray-700 mt-12 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-400 text-sm">Available for freelance work</span>
        </div>
        
        <p className="text-gray-500 text-sm flex items-center">
          © 2025 Arkaprabha Banerjee. Crafted with 
          <span className="mx-1 text-red-500 animate-pulse" role="img" aria-label="heart">❤️</span> 
          and cutting-edge tech.
        </p>
        
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span>Made with React & Tailwind</span>
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          <span>Deployed on Vercel</span>
        </div>
      </div>
    </div>
  </div>
</footer>


    </div>
  );
};

export default Index;
