import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, GraduationCap, Award, Code, Heart, Sun, Moon } from 'lucide-react';
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
      description: 'Began my journey in Computer Science and Engineering',
      icon: GraduationCap,
      color: 'from-blue-500 to-purple-600'
    },
    {
      year: '2024',
      title: 'Joined NooBuild DSA Team',
      description: 'Contributing to open-source DSA projects and mentoring',
      icon: Code,
      color: 'from-purple-500 to-pink-600'
    },
    {
      year: '2024',
      title: 'Built Krishak AI Platform',
      description: 'Agricultural AI platform with 99.35% disease detection accuracy',
      icon: Award,
      color: 'from-green-500 to-blue-600'
    },
    {
      year: '2025',
      title: 'Full-Stack ML Engineer',
      description: 'Specializing in LangChain, FAISS, and intelligent systems',
      icon: Heart,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const skills = [
    { name: 'Python', level: 95, color: '#3776ab' },
    { name: 'React/Next.js', level: 90, color: '#61dafb' },
    { name: 'Django/FastAPI', level: 88, color: '#092e20' },
    { name: 'LangChain', level: 85, color: '#1c3d5c' },
    { name: 'Machine Learning', level: 92, color: '#ff6f00' },
    { name: 'FAISS/Vector DBs', level: 80, color: '#4285f4' },
    { name: 'Docker/K8s', level: 75, color: '#2496ed' },
    { name: 'Supabase', level: 85, color: '#3ecf8e' }
  ];

  const funFacts = [
    { icon: '🏆', label: 'LeetCode Problems', value: '324+' },
    { icon: '⭐', label: 'GitHub Stars', value: '150+' },
    { icon: '🚀', label: 'Projects Built', value: '25+' },
    { icon: '📚', label: 'Years Learning', value: '6+' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Modern Resizable Navigation */}
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navigationItems} />
          <div className="flex items-center gap-4">
            <NavbarButton
              variant="secondary"
              onClick={() => setDarkMode(!darkMode)}
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

        {/* Mobile Navigation */}
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

    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 pt-24">
      {/* Navbar */}
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <NavbarLogo>
              <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                MyPortfolio
              </Link>
            </NavbarLogo>
            
            <div className="hidden md:block">
              <NavItems>
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 px-4 py-2"
                  >
                    {item.name}
                  </Link>
                ))}
              </NavItems>
            </div>
            
            <div className="flex items-center">
              <NavbarButton
                onClick={() => setDarkMode(!darkMode)}
                className="mr-4"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </NavbarButton>
              
              <MobileNavToggle
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? '✖' : '≡'}
              </MobileNavToggle>
            </div>
          </div>
        </div>
        
        <MobileNav open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          <MobileNavHeader>
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                Menu
              </div>
              
              <MobileNavToggle onClick={() => setMobileMenuOpen(false)}>
                ✖
              </MobileNavToggle>
            </div>
          </MobileNavHeader>
          
          <MobileNavMenu>
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="block text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-2">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-8xl">
                👨‍💻
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About Me
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Building intelligent solutions at the intersection of data science and full-stack development
            </p>
            
            <motion.p
              {...fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              I'm a passionate Full-Stack ML Engineer who thrives on creating innovative solutions that bridge the gap 
              between cutting-edge AI research and real-world applications. With expertise in modern technologies like 
              LangChain, FAISS, and intelligent systems, I craft solutions that make a meaningful impact.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeInUp}
            className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white"
          >
            My Journey
          </motion.h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
            
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                  <Card className="glass-card hover:scale-105 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.year}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white dark:bg-gray-800 border-4 border-blue-600 rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeInUp}
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
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-3 rounded-full"
                    style={{ backgroundColor: skill.color }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeInUp}
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
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-4xl">
                  {fact.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{fact.value}</h3>
                <p className="text-gray-600 dark:text-gray-300">{fact.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Story Section */}
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
                <p>
                  My passion for technology started early, sparked by curiosity about how intelligent systems can solve complex real-world problems. 
                  The intersection of AI and practical application became my driving force—creating solutions that don't just showcase technical prowess, 
                  but genuinely improve people's lives.
                </p>
                <p>
                  From developing agricultural AI platforms that help farmers detect crop diseases with 99.35% accuracy to creating AutoML systems 
                  that democratize machine learning for non-technical users, I believe technology should be accessible, impactful, and transformative. 
                  Every project I build is guided by this principle.
                </p>
                <p>
                  Beyond coding, I'm deeply involved in the developer community—contributing to open-source projects, mentoring aspiring developers, 
                  and staying on the cutting edge of ML research. I believe knowledge shared is knowledge multiplied.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">
                  <span className="text-white">Currently Exploring</span>
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center group">
                    <div className="w-3 h-3 bg-white rounded-full mr-4 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Advanced RAG Systems with LangChain</span>
                  </li>
                  <li className="flex items-center group">
                    <div className="w-3 h-3 bg-white rounded-full mr-4 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Multi-Agent AI Architectures</span>
                  </li>
                  <li className="flex items-center group">
                    <div className="w-3 h-3 bg-white rounded-full mr-4 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Edge AI and Model Optimization</span>
                  </li>
                  <li className="flex items-center group">
                    <div className="w-3 h-3 bg-white rounded-full mr-4 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Computer Vision in Agriculture</span>
                  </li>
                </ul>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform translate-x-2 translate-y-2 opacity-20"></div>
            </motion.div>
          </div>
    </div>
    </div>
  );
};

export default About;
