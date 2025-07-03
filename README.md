# 🚀 Arkaprabha's AI Portfolio Showcase




[🔗 Live Demo]([https://arkaprabha-portfolio.vercel.app](https://portfolio-website-iota-ten-15.vercel.app/)) -  [📧 Contact](mailto:arkaofficial13@gmail.com) -  [💼 LinkedIn](https://linkedin.com/in/arkaprabhabanerjee13)



## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🎨 Key Components](#-key-components)
- [🔧 Configuration](#-configuration)
- [📱 Responsive Design](#-responsive-design)
- [⚡ Performance](#-performance)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 About Me](#-about-me)

## ✨ Features

### 🎭 **Interactive Animations**
- **Vortex Background**: Dynamic particle system with mouse interaction
- **Scrambled Text Effects**: GSAP-powered text animations with hover effects
- **Micro-interactions**: Magnetic buttons, 3D transforms, and smooth transitions
- **Framer Motion**: 60fps animations with spring physics

### 🧠 **AI/ML Project Showcase**
- **Krishak AI Platform**: Agricultural disease detection (99.35% accuracy)
- **AutoML SaaS**: No-code machine learning pipeline
- **RAG Multi-Agent System**: Advanced retrieval-augmented generation
- **Computer Vision Pipeline**: YOLOv5 object detection with MLOps

### 💼 **Professional Sections**
- **Hero Landing**: Interactive avatar with scrambled name animation
- **About Page**: Timeline, skills visualization, and testimonials
- **Projects Gallery**: Filterable portfolio with detailed modals
- **Contact Form**: Real-time validation with progress tracking
- **Blog Section**: Technical articles and insights

### 🎨 **Modern UI/UX**
- **Dark/Light Mode**: System preference detection with manual toggle
- **Glass Morphism**: Frosted glass effects and backdrop blur
- **Responsive Grid**: Mobile-first design with Tailwind CSS
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 🛠️ Tech Stack

### **Frontend Framework**
```json
{
  "react": "^18.2.0",
  "typescript": "^5.0.0",
  "vite": "^4.4.0"
}
```

### **Styling & Animation**
```json
{
  "tailwindcss": "^3.3.0",
  "framer-motion": "^10.16.0",
  "gsap": "^3.12.0",
  "lucide-react": "^0.263.0"
}
```

### **Build Tools**
```json
{
  "vite": "^4.4.0",
  "@vitejs/plugin-react-swc": "^3.3.0",
  "autoprefixer": "^10.4.0"
}
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and npm/yarn
- Git for version control

### **Installation**

```bash
# Clone the repository
git clone https://github.com/Arkaprabha13/arkas-ai-portfolio-showcase.git

# Navigate to project directory
cd arkas-ai-portfolio-showcase

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Environment Setup**

Create a `.env.local` file:
```env
VITE_APP_TITLE="Arkaprabha's Portfolio"
VITE_CONTACT_EMAIL="arkaofficial13@gmail.com"
VITE_GITHUB_URL="https://github.com/Arkaprabha13"
VITE_LINKEDIN_URL="https://linkedin.com/in/arkaprabhabanerjee13"
```

## 📁 Project Structure

```
arkas-ai-portfolio-showcase/
├── 📂 public/
│   ├── 🖼️ images/
│   ├── 📄 Arkaprabha_Banerjee_resume.pdf
│   └── 🌐 favicon.ico
├── 📂 src/
│   ├── 📂 components/
│   │   ├── 📂 ui/
│   │   │   ├── 🧩 card.tsx
│   │   │   ├── 🔘 button.tsx
│   │   │   └── 🧭 resizable-navbar.tsx
│   │   └── 📂 effects/
│   │       ├── ✨ ScrambledText.tsx
│   │       └── 🌪️ Vortex.tsx
│   ├── 📂 pages/
│   │   ├── 🏠 Index.tsx
│   │   ├── 👤 About.tsx
│   │   ├── 💼 Projects.tsx
│   │   ├── 📝 Blog.tsx
│   │   └── 📧 Contact.tsx
│   ├── 📂 styles/
│   │   └── 🎨 globals.css
│   ├── 🚀 main.tsx
│   └── 📱 App.tsx
├── ⚙️ tailwind.config.js
├── 📦 package.json
└── 📖 README.md
```

## 🎨 Key Components

### **🌪️ Vortex Background**
```tsx

```

### **✨ Scrambled Text Animation**
```tsx

  Arkaprabha Banerjee

```

### **🎭 Magnetic Button**
```tsx

  Get In Touch

```

## 🔧 Configuration

### **Tailwind CSS Setup**
```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      }
    }
  }
}
```

### **Vite Configuration**
```js
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

## 📱 Responsive Design

### **Breakpoint Strategy**
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

### **Key Features**
- ✅ Mobile-first approach
- ✅ Touch-friendly interactions
- ✅ Optimized images and assets
- ✅ Progressive enhancement

## ⚡ Performance

### **Optimization Techniques**
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Tree-shaking and dead code elimination
- **Caching Strategy**: Service worker for offline support

### **Performance Metrics**
```
Lighthouse Score:
🟢 Performance: 95+
🟢 Accessibility: 100
🟢 Best Practices: 100
🟢 SEO: 100
```

## 🤝 Contributing

### **Development Workflow**

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### **Code Standards**
- TypeScript for type safety
- ESLint + Prettier for code formatting
- Conventional commits for clear history
- Component-driven development

### **Testing**
```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests
npm run test
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Arkaprabha Banerjee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 👨‍💻 About Me



### **Arkaprabha Banerjee**
*Full-Stack ML Engineer*

🎓 **B.Tech CSE** at Heritage Institute of Technology  
🚀 **Specializing in**: AI/ML, RAG Systems, Computer Vision  
🏆 **Achievements**: 25+ projects  

**Let's Connect:**
[![Email](https://img.shields.io/badge/Email-arkaofficial13@gmail.com-red?style=flat-square&logo=shields.io/badge/GitHub-Arkaprabha13-black?style=flatenter">

**⭐ Star this repository if you found it helpful!**

*Built with ❤️ in India*
