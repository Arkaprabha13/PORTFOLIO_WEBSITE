import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Search, Tag, ArrowRight, User, Sun, Moon, Rocket, Star, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
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
import ScrambledText from '@/components/effects/ScrambledText';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

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

  const blogPosts = [
    {
      id: 1,
      title: 'My 2025 Road-Map: Building the Future of AI',
      slug: 'roadmap-2025',
      excerpt: 'Exploring my journey ahead in machine learning, from advanced RAG systems to edge AI deployment. Here\'s what I\'m planning to build and learn in 2025.',
      content: 'This year marks a pivotal point in my ML engineering journey...',
      publishDate: '2024-12-15',
      readTime: 8,
      category: 'Career',
      tags: ['roadmap', 'ml', 'ai', 'career'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      author: {
        name: 'Arkaprabha Banerjee',
        avatar: '👨‍💻'
      }
    },
    {
      id: 2,
      title: 'Building RAG Systems: From Theory to Production',
      slug: 'rag-systems-production',
      excerpt: 'A deep dive into Retrieval-Augmented Generation systems, covering everything from vector databases to deployment strategies.',
      content: 'RAG systems have revolutionized how we approach AI-powered question answering...',
      publishDate: '2024-11-28',
      readTime: 12,
      category: 'Technical',
      tags: ['rag', 'langchain', 'faiss', 'production'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop',
      author: {
        name: 'Arkaprabha Banerjee',
        avatar: '👨‍💻'
      }
    },
    {
      id: 3,
      title: 'Computer Vision in Agriculture: Lessons from Krishak',
      slug: 'computer-vision-agriculture',
      excerpt: 'How we achieved 99.35% accuracy in crop disease detection and the challenges of deploying AI in agricultural settings.',
      content: 'Building Krishak taught me invaluable lessons about real-world AI deployment...',
      publishDate: '2024-11-15',
      readTime: 10,
      category: 'Case Study',
      tags: ['computer-vision', 'agriculture', 'krishak', 'ai'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=300&fit=crop',
      author: {
        name: 'Arkaprabha Banerjee',
        avatar: '👨‍💻'
      }
    },
    {
      id: 4,
      title: 'AutoML Platform Architecture: Design Decisions',
      slug: 'automl-architecture',
      excerpt: 'The technical decisions behind building a no-code ML platform that democratizes machine learning for everyone.',
      content: 'Creating an AutoML platform requires careful consideration of user experience...',
      publishDate: '2024-10-30',
      readTime: 15,
      category: 'Technical',
      tags: ['automl', 'architecture', 'ml', 'no-code'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop',
      author: {
        name: 'Arkaprabha Banerjee',
        avatar: '👨‍💻'
      }
    },
    {
      id: 5,
      title: 'Why I Choose Python for Everything',
      slug: 'python-everything',
      excerpt: 'From web development to machine learning, exploring why Python remains my go-to language for most projects.',
      content: 'Python has been my companion throughout my programming journey...',
      publishDate: '2024-10-15',
      readTime: 6,
      category: 'Opinion',
      tags: ['python', 'programming', 'tools'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=600&h=300&fit=crop',
      author: {
        name: 'Arkaprabha Banerjee',
        avatar: '👨‍💻'
      }
    },
    {
      id: 6,
      title: 'The Future of Agricultural Technology',
      slug: 'future-agtech',
      excerpt: 'Exploring how AI, IoT, and machine learning are transforming agriculture and feeding the world sustainably.',
      content: 'Agriculture stands at the crossroads of tradition and innovation...',
      publishDate: '2024-09-28',
      readTime: 11,
      category: 'Industry',
      tags: ['agriculture', 'ai', 'future', 'sustainability'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=300&fit=crop',
      author: {
        name: 'Arkaprabha Banerjee',
        avatar: '👨‍💻'
      }
    }
  ];

  const categories = ['All', 'Technical', 'Career', 'Case Study', 'Opinion', 'Industry'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const getCategoryCount = (category: string) => {
    if (category === 'All') return blogPosts.length;
    return blogPosts.filter(post => post.category === category).length;
  };

  const handleBlogInteraction = () => {
    setShowComingSoon(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Coming Soon Dialog */}
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Rocket className="h-8 w-8 text-white" />
              </motion.div>
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Coming Soon!
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600 dark:text-gray-300 mt-2">
              I'm working hard to bring you amazing tech articles and insights. The blog will be launching soon!
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-4 mt-6">
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Star className="h-5 w-5 text-yellow-500" />
              </motion.div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Stay tuned for updates
              </span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -180, -360]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Sparkles className="h-5 w-5 text-purple-500" />
              </motion.div>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              75% Complete • Expected Launch: Q3 2025
            </p>
          </div>
          
          <div className="flex flex-col space-y-3 mt-6">
            <Button 
              onClick={() => setShowComingSoon(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Got it, thanks!
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowComingSoon(false);
                window.open('mailto:arkaofficial13@gmail.com');
              }}
              className="w-full"
            >
              Notify me when it's ready
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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

      <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-8"
          >
            <span className="text-gray-900 dark:text-white">Tech </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog
            </span>
          </motion.h1>
          
          <ScrambledText className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Insights, tutorials, and thoughts on machine learning, AI development, and the future of technology
          </ScrambledText>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search articles, tags, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={handleBlogInteraction}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  readOnly
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-80">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Tag className="mr-2 h-5 w-5" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={handleBlogInteraction}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex justify-between items-center ${
                        selectedCategory === category
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      <span>{category}</span>
                      <span className="text-sm font-medium">{getCategoryCount(category)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            {...fadeInUp}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
          >
            Featured Article
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onClick={handleBlogInteraction}
            className="cursor-pointer"
          >
            <Card className="glass-card overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold">
                      Featured
                    </span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                      {featuredPost.category}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{featuredPost.author.avatar}</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {featuredPost.author.name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {new Date(featuredPost.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {featuredPost.readTime} min read
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            {...fadeInUp}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
          >
            Latest Articles
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={handleBlogInteraction}
              >
                <Card className="glass-card overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/20 text-white backdrop-blur-sm rounded-full text-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{post.author.avatar}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {post.author.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(post.publishDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {post.readTime}m
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search terms or category filter
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90">
              Get the latest insights on AI, ML, and technology delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                onClick={handleBlogInteraction}
                readOnly
              />
              <Button 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
                onClick={handleBlogInteraction}
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default Blog;
