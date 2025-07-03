import React, { useState, useEffect, useRef, useCallback, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';
import {
  Mail, MapPin, Github, Linkedin, Calendar, Send, CheckCircle,
  MessageCircle, Clock, Star, Heart, Award, Zap, Globe, Users, ChevronDown, Sun, Moon, Download, Volume2, VolumeX
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

import ScrambledText from '@/components/effects/ScrambledText';
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

/* ──────── Types ──────── */
type Field = 'name' | 'email' | 'subject' | 'message' | 'projectType';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType: string;
}

interface ContactTile {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  gradient: string;
}

interface FAQ {
  q: string;
  a: string;
  isOpen?: boolean;
}

/* ──────── Constants ──────── */
const INITIAL_FORM: FormData = {
  name: '', email: '', subject: '', message: '', projectType: 'consultation',
};

const CONTACTS: ContactTile[] = [
  { icon: Mail,     label: 'Email',    value: 'arkaofficial13@gmail.com', href: 'mailto:arkaofficial13@gmail.com', gradient: 'from-blue-500 to-cyan-600' },
  { icon: Github,   label: 'GitHub',   value: 'github.com/Arkaprabha13',   href: 'https://github.com/Arkaprabha13', gradient: 'from-slate-700 to-slate-900' },
  { icon: Linkedin, label: 'LinkedIn', value: 'in/arkaprabhabanerjee13',   href: 'https://linkedin.com/in/arkaprabhabanerjee13', gradient: 'from-blue-600 to-blue-800' },
  { icon: MapPin,   label: 'Location', value: 'Kolkata, India',            gradient: 'from-green-500 to-emerald-600' },
];

const FAQS: FAQ[] = [
  { q: 'Which project domains do you cover?', a: 'AI/ML (RAG, CV, AutoML), full-stack platforms, and data engineering.', isOpen: false },
  { q: 'Typical delivery timeline?',          a: 'PoC 1–2 weeks • Mid-scale 3–6 weeks • End-to-end 2–4 months.', isOpen: false },
  { q: 'Solo or collaborative?',              a: 'Both—comfortable integrating with teams or owning entire builds.', isOpen: false },
  { q: 'Availability & rates?',               a: '40 h/week, start in ≤1 week. Rates scale with complexity—ask for a quote.', isOpen: false },
];

const stats = [
  { label: 'Response Time', value: '<24h', icon: Clock, color: 'text-blue-600' },
  { label: 'Projects Done', value: '25+', icon: Award, color: 'text-green-600' },
  { label: 'Satisfaction', value: '99%', icon: Star, color: 'text-yellow-600' },
  { label: 'Collaborations', value: '50+', icon: Users, color: 'text-purple-600' }
];

const navigationItems = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Projects', link: '/projects' },
  { name: 'Blog', link: '/blog' },
  { name: 'Contact', link: '/contact' }
];

/* ──────── Component ──────── */
const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [faqs, setFaqs] = useState(FAQS);
  const [hoveredContact, setHoveredContact] = useState<number | null>(null);
  const [formFocused, setFormFocused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true });

  // Custom spring cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const cursorScale = useSpring(1, springConfig);

  // Dark mode initialization
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Dark mode persistence
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Resume download handler
  const handleResumeDownload = () => {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'resume_download', {
        event_category: 'engagement',
        event_label: 'contact_page'
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

  // Cursor following with lag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => cursorScale.set(1.5);
    const handleMouseLeave = () => cursorScale.set(1);

    window.addEventListener('mousemove', handleMouseMove);
    
    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, select, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [mouseX, mouseY, cursorScale]);

  // Progress calculation
  useEffect(() => {
    const required: Field[] = ['name', 'email', 'subject', 'message'];
    const filled = required.filter(k => form[k].trim() !== '').length;
    setProgress((filled / required.length) * 100);
  }, [form]);

  // Magnetic button effect
  useEffect(() => {
    const button = sendButtonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      
      if (distance < 100) {
        const strength = (100 - distance) / 100;
        button.style.transform = `translate(${x * strength * 0.3}px, ${y * strength * 0.3}px) scale(${1 + strength * 0.1})`;
      }
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0px, 0px) scale(1)';
    };

    const parent = button.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Form handlers
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target as { name: Field; value: string };
    setForm(f => ({ ...f, [name]: value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (sending || progress < 100) return;
    setSending(true);

    setTimeout(() => {
      localStorage.setItem('contactSubmissions',
        JSON.stringify([...(JSON.parse(localStorage.getItem('contactSubmissions') || '[]')), { ...form, ts: Date.now() }])
      );
      setSent(true);
      setSending(false);
      setTimeout(() => { setSent(false); setForm(INITIAL_FORM); }, 3200);
    }, 1500);
  };

  const toggleFAQ = (index: number) => {
    setFaqs(prev => prev.map((faq, i) => 
      i === index ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false }
    ));
  };

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    show: { width: `${progress}%` }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-800 dark:to-violet-900 relative overflow-hidden">
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

      {/* Custom Spring Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
          x: '-50%',
          y: '-50%',
          scale: cursorScale
        }}
      />

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

      {/* Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Hero Section with Scrambled Text */}
      <motion.section
        ref={heroRef}
        variants={staggerContainer}
        initial="hidden"
        animate={heroInView ? "show" : "hidden"}
        className="pt-32 pb-20 text-center px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={staggerItem} className="relative">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8">
            <span className="text-gray-900 dark:text-white">Let's </span>
            <ScrambledText
              className="bg-gradient-to-r text-gray-900 dark:text-white from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block"
              scrambleChars="!@#$%^&*()_+-=[]{}|;:,.<>?"
              
              duration={2}
            >
              Connect
            </ScrambledText>
          </h1>
        </motion.div>

        <motion.div variants={staggerItem}>
          <ScrambledText
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            scrambleChars="abcdefghijklmnopqrstuvwxyz"
            duration={1.5}
          >
            Ready&nbsp;to&nbsp;build&nbsp;something&nbsp;remarkable?&nbsp;Drop&nbsp;a&nbsp;message&nbsp;and&nbsp;let's&nbsp;&nbsp; talk&nbsp;on&nbsp;AI.
          </ScrambledText>
        </motion.div>

        {/* Animated stats */}
        <motion.div variants={staggerItem} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl p-4 border border-white/20 dark:border-gray-700/20"
            >
              <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Main Content Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Enhanced Form Card with Breathing Halo */}
          <motion.div
            ref={formRef}
            variants={staggerContainer}
            initial="hidden"
            animate={formInView ? "show" : "hidden"}
            className="relative"
          >
            <motion.div variants={staggerItem} className="relative">
              {/* Breathing Gradient Halo */}
              <div className="breathing absolute -inset-4 rounded-3xl opacity-75"></div>
              
              <Card className="relative overflow-hidden glass-card shadow-2xl">
                {/* Enhanced Progress Bar */}
                <div className="absolute top-0 left-0 h-1 bg-gray-200 dark:bg-gray-700 w-full">
                  <motion.div
                    variants={progressBarVariants}
                    animate="show"
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/30"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>

                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                    </motion.div>
                    Start a Conversation
                  </CardTitle>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Complete: {Math.round(progress)}%
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center space-y-6 py-12"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1 }}
                        >
                          <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
                        </motion.div>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <p className="text-2xl font-semibold">Message sent!</p>
                          <p className="text-gray-600 dark:text-gray-400">I'll reply within 24 hours.</p>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.form
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        onSubmit={onSubmit}
                        className="space-y-6"
                        onFocus={() => setFormFocused(true)}
                        onBlur={() => setFormFocused(false)}
                      >
                        {/* Enhanced Input Fields */}
                        <motion.div variants={staggerItem} className="grid md:grid-cols-2 gap-6">
                          <div className="relative">
                            <input
                              name="name"
                              required
                              placeholder="Full name"
                              className="enhanced-input peer"
                              value={form.name}
                              onChange={onChange}
                            />
                            <motion.div
                              className="absolute inset-0 rounded-lg border-2 border-blue-500 pointer-events-none opacity-0 peer-focus:opacity-100"
                              layoutId="input-focus"
                            />
                          </div>
                          <div className="relative">
                            <input
                              name="email"
                              type="email"
                              required
                              placeholder="Email"
                              className="enhanced-input peer"
                              value={form.email}
                              onChange={onChange}
                            />
                            <motion.div
                              className="absolute inset-0 rounded-lg border-2 border-blue-500 pointer-events-none opacity-0 peer-focus:opacity-100"
                              layoutId="input-focus"
                            />
                          </div>
                        </motion.div>

                        <motion.div variants={staggerItem} className="relative">
                          <select
                            name="projectType"
                            className="enhanced-input peer"
                            value={form.projectType}
                            onChange={onChange}
                          >
                            {['consultation', 'ml-project', 'web-development', 'collaboration', 'other']
                              .map(v => (
                                <option key={v} value={v}>
                                  {v.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </option>
                              ))}
                          </select>
                          <motion.div
                            className="absolute inset-0 rounded-lg border-2 border-blue-500 pointer-events-none opacity-0 peer-focus:opacity-100"
                            layoutId="input-focus"
                          />
                        </motion.div>

                        <motion.div variants={staggerItem} className="relative">
                          <input
                            name="subject"
                            required
                            placeholder="Subject"
                            className="enhanced-input peer"
                            value={form.subject}
                            onChange={onChange}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-lg border-2 border-blue-500 pointer-events-none opacity-0 peer-focus:opacity-100"
                            layoutId="input-focus"
                          />
                        </motion.div>

                        <motion.div variants={staggerItem} className="relative">
                          <textarea
                            name="message"
                            rows={6}
                            required
                            placeholder="Tell me about your project..."
                            className="enhanced-input resize-none peer"
                            value={form.message}
                            onChange={onChange}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-lg border-2 border-blue-500 pointer-events-none opacity-0 peer-focus:opacity-100"
                            layoutId="input-focus"
                          />
                        </motion.div>

                        {/* Magnetic Send Button */}
                        <motion.div variants={staggerItem} className="relative">
                          <motion.button
                            ref={sendButtonRef}
                            type="submit"
                            disabled={sending || progress < 100}
                            className={`magnetic-button w-full py-4 px-8 rounded-lg font-semibold text-lg relative overflow-hidden transition-all duration-300 ${
                              progress >= 100 && !sending
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                            }`}
                            whileHover={progress >= 100 ? { scale: 1.02 } : {}}
                            whileTap={progress >= 100 ? { scale: 0.98 } : {}}
                          >
                            <motion.div
                              className="absolute inset-0 bg-white/10"
                              animate={sending ? { x: ['-100%', '100%'] } : {}}
                              transition={{ duration: 1, repeat: sending ? Infinity : 0 }}
                            />
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              {sending ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                                </motion.div>
                              ) : (
                                <Send className="h-5 w-5" />
                              )}
                              {sending ? 'Sending...' : 'Send Message'}
                            </span>
                          </motion.button>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Enhanced Sidebar */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={formInView ? "show" : "hidden"}
            className="space-y-8"
          >
            {/* Contact Details */}
            <motion.div variants={staggerItem}>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {CONTACTS.map((contact, i) => (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      target={contact.href ? '_blank' : undefined}
                      variants={staggerItem}
                      whileHover={{ scale: 1.02, x: 10 }}
                      onHoverStart={() => setHoveredContact(i)}
                      onHoverEnd={() => setHoveredContact(null)}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-all duration-300 relative overflow-hidden"
                    >
                      <motion.div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${contact.gradient} flex items-center justify-center relative`}
                        animate={{ rotate: hoveredContact === i ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <contact.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{contact.label}</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">{contact.value}</p>
                      </div>
                      {hoveredContact === i && (
                        <motion.div
                          layoutId="contact-hover"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg"
                        />
                      )}
                    </motion.a>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div variants={staggerItem}>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Why Work With Me?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    {stats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        variants={staggerItem}
                        whileHover={{ scale: 1.1, rotateY: 5 }}
                        className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                      >
                        <motion.p
                          className={`text-2xl font-bold ${stat.color}`}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        >
                          {stat.value}
                        </motion.p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 variants={staggerItem} className="text-4xl font-bold text-center mb-12">
              <ScrambledText
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                scrambleChars="?!@#$%^&*()"
                duration={1.5}
              >
                Frequently Asked Questions
              </ScrambledText>
            </motion.h2>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  variants={staggerItem}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <motion.button
                    onClick={() => toggleFAQ(i)}
                    className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-all duration-300 flex items-center justify-between"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white pr-4">{faq.q}</h3>
                    <motion.div
                      animate={{ rotate: faq.isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {faq.isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ y: -20 }}
                          animate={{ y: 0 }}
                          exit={{ y: -20 }}
                          className="px-6 pb-6 text-gray-600 dark:text-gray-300"
                        >
                          {faq.a}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
