import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'motion/react';
import {
  Terminal,
  Sparkles,
  Zap,
  Download,
  Github,
  Twitter,
  FileText,
  Layers,
  Rocket,
  MessageSquare,
} from 'lucide-react';

const App = () => {
  const [typedText, setTypedText] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const fullCommand =
    'ai-gen ai-generate "A React App with authentication and dashboard"';
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullCommand.length) {
        setTypedText(fullCommand.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowOutput(true), 500);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const outputLines = [
    '✓ Analyzing project requirements...',
    '✓ Generating folder structure...',
    '✓ Creating /src/components',
    '✓ Creating /src/pages/Dashboard',
    '✓ Creating /src/auth',
    '✓ Setting up configuration files',
    '✨ Project structure created successfully!',
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden'>
      {/* Animated background gradient */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          className='absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 to-cyan-600/10 rounded-full blur-3xl'
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className='relative z-10 border-b border-gray-800/50 backdrop-blur-sm'
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          <motion.div
            className='flex items-center gap-2'
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className='w-6 h-6 text-indigo-400' />
            </motion.div>
            <span className='text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent'>
              AI-Gen
            </span>
          </motion.div>
          <div className='flex items-center gap-6'>
            {['Features', 'Demo', 'GitHub'].map((item, i) => (
              <motion.a
                key={item}
                href={
                  item === 'GitHub'
                    ? 'https://github.com'
                    : `#${item.toLowerCase()}`
                }
                className='text-gray-400 hover:text-gray-100 transition-colors text-sm flex items-center gap-2'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ scale: 1.1 }}
              >
                {item === 'GitHub' && <Github className='w-4 h-4' />}
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className='relative z-10 max-w-7xl mx-auto px-6 pt-20 md:pb-10'>
        <motion.div className='text-center mb-12' style={{ opacity }}>
          <motion.h1
            className='text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Generate entire project
            <br />
            structures with a single command
          </motion.h1>

          <motion.p
            className='text-xl text-gray-400 max-w-3xl mx-auto mb-10'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI-Gen lets you instantly scaffold complete, production-ready folder
            structures — just describe your project in plain English.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className='flex flex-wrap items-center justify-center gap-4 mb-16'
            variants={staggerContainer}
            initial='hidden'
            animate='visible'
          >
            {[
              { icon: Download, text: 'Download for Windows', primary: true },
            ].map((btn, i) => (
              <motion.button
                key={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`${
                  btn.primary
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25'
                    : i === 1
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    : 'bg-transparent hover:bg-gray-800 border border-gray-700'
                } text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all`}
              >
                <btn.icon className='w-5 h-5' />
                {btn.text}
              </motion.button>
            ))}
          </motion.div>

          {/* Terminal Mockup */}
          <motion.div
            className='max-w-4xl mx-auto relative'
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-20'
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className='relative bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl overflow-hidden'
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Terminal Header */}
              <div className='bg-gray-800/50 px-4 py-3 flex items-center gap-2 border-b border-gray-700/50'>
                <motion.div
                  className='w-3 h-3 rounded-full bg-red-500'
                  whileHover={{ scale: 1.3 }}
                />
                <motion.div
                  className='w-3 h-3 rounded-full bg-yellow-500'
                  whileHover={{ scale: 1.3 }}
                />
                <motion.div
                  className='w-3 h-3 rounded-full bg-green-500'
                  whileHover={{ scale: 1.3 }}
                />
                <span className='ml-4 text-gray-400 text-sm'>terminal</span>
              </div>

              {/* Terminal Content */}
              <div className='p-6 font-mono text-sm'>
                <div className='flex items-start gap-2'>
                  <span className='text-green-400'>$</span>
                  <span className='text-gray-100'>{typedText}</span>
                  <motion.span
                    className='w-2 h-5 bg-indigo-400'
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>

                {showOutput && (
                  <motion.div
                    className='mt-4 space-y-2'
                    variants={staggerContainer}
                    initial='hidden'
                    animate='visible'
                  >
                    {outputLines.map((line, i) => (
                      <motion.div
                        key={i}
                        className='text-gray-400'
                        variants={fadeInUp}
                      >
                        {line}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <Section title='How It Works'>
        <motion.div
          className='grid md:grid-cols-3 gap-8'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          {[
            {
              icon: MessageSquare,
              title: 'Describe your project',
              desc: 'Tell AI-Gen what you want to build in plain English. No complex configurations needed.',
              gradient: 'from-indigo-500 to-purple-600',
            },
            {
              icon: Zap,
              title: 'AI-Gen generates the structure',
              desc: 'Powered by Gemini AI, it understands your needs and creates the perfect folder structure.',
              gradient: 'from-purple-500 to-pink-600',
            },
            {
              icon: Rocket,
              title: 'Start coding instantly',
              desc: 'Jump straight into development with a complete, organized project structure ready to go.',
              gradient: 'from-pink-500 to-red-600',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className='text-center group'
              variants={scaleIn as Variants}
            >
              <motion.div
                className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <item.icon className='w-8 h-8 text-white' />
              </motion.div>
              <h3 className='text-xl font-semibold mb-3'>{item.title}</h3>
              <p className='text-gray-400'>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Features */}
      <Section id='features' title='Built for Modern Developers'>
        <motion.div
          className='grid md:grid-cols-2 gap-6'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          {[
            {
              icon: Sparkles,
              title: 'Gemini-Powered AI Understanding',
              desc: 'Advanced natural language processing understands exactly what you need, from simple Apps to complex architectures.',
              color: 'indigo',
            },
            {
              icon: Zap,
              title: 'Zero Dependencies',
              desc: 'Single executable file. No npm installs, no Python environments, no hassle. Just download and run.',
              color: 'purple',
            },
            {
              icon: Layers,
              title: 'Cross-Platform Support',
              desc: 'Works seamlessly on Windows, macOS, and Linux. Write once, run anywhere.',
              color: 'pink',
              comingSoon: true,
            },
            {
              icon: Terminal,
              title: 'Instant JSON-to-Folder Conversion',
              desc: 'Lightning-fast generation. From AI output to complete folder structure in milliseconds.',
              color: 'cyan',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-${item.color}-500/50 transition-all group`}
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {item.comingSoon && (
                <span className='absolute top-4 right-4 inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-indigo-600 text-white shadow-sm'>
                  Coming soon
                </span>
              )}
              <motion.div
                className={`w-12 h-12 bg-${item.color}-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-${item.color}-500/20 transition-colors`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <item.icon className={`w-6 h-6 text-${item.color}-400`} />
              </motion.div>
              <h3 className='text-2xl font-semibold mb-3'>{item.title}</h3>
              <p className='text-gray-400'>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Demo Section */}
      <Section
        id='demo'
        title='See It In Action'
        subtitle='Watch how AI-Gen transforms a simple description into a complete project structure'
      >
        <motion.div
          className='max-w-4xl mx-auto bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className='bg-gray-800/50 px-4 py-3 flex items-center justify-between border-b border-gray-700/50'>
            <span className='text-gray-400 text-sm font-mono'>example.sh</span>
            <div className='flex gap-2'>
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className='w-3 h-3 rounded-full bg-gray-600'
                  whileHover={{ scale: 1.3, backgroundColor: '#9CA3AF' }}
                />
              ))}
            </div>
          </div>

          <motion.div
            className='p-6 font-mono text-sm space-y-3'
            variants={staggerContainer}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            {[
              {
                text: '# Generate a Next.js blog with authentication',
                color: 'gray-400',
                prefix: '#',
                prefixColor: 'gray-500',
              },
              {
                text: 'ai-gen "Next.js blog with user auth and admin panel"',
                color: 'blue-400',
                prefix: '$',
                prefixColor: 'green-400',
              },
              { text: '...', color: 'gray-500' },
              {
                text: '✓ Created project structure with 47 files',
                color: 'green-400',
              },
            ].map((line, i) => (
              <motion.div key={i} variants={fadeInUp}>
                {line.prefix && (
                  <span className={`text-${line.prefixColor}`}>
                    {line.prefix}
                  </span>
                )}{' '}
                <span className={`text-${line.color}`}>{line.text}</span>
              </motion.div>
            ))}
            <motion.div className='pl-4 text-gray-400' variants={fadeInUp}>
              {[
                '├── App/',
                '│   ├── (auth)/',
                '│   ├── (admin)/',
                '│   ├── blog/',
                '│   └── api/',
                '├── components/',
                '├── lib/',
                '└── public/',
              ].map((folder, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  {folder}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Download Section */}
      <section className='relative z-10 max-w-7xl mx-auto px-6 py-20'>
        <motion.div
          className='bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 rounded-3xl p-12 text-center'
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className='text-4xl font-bold mb-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Workflow?
          </motion.h2>
          <motion.p
            className='text-gray-400 mb-8 max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Join thousands of developers who are already building faster with AI
          </motion.p>

          <motion.div
            className='flex flex-wrap justify-center gap-4 mb-8'
            variants={staggerContainer}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            {['Windows'].map((platform) => (
              <motion.button
                key={platform}
                variants={scaleIn as Variants}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className='bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg'
              >
                <Download className='w-5 h-5' />
                {platform} (v1.0.0)
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            className='flex items-center justify-center gap-8 text-sm text-gray-400'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {[
              // '⭐ 12.4k stars on GitHub',
              // '📦 50k+ downloads',
              // '✓ MIT License',
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                {stat}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        className='relative z-10 border-t border-gray-800/50 mt-20'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className='max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='text-gray-400'>
            AI-Gen — Built with{' '}
            <motion.span
              className='text-red-400'
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ❤️
            </motion.span>{' '}
            by Your Name
          </div>
          <div className='flex items-center gap-6'>
            {[
              { icon: Github, text: 'GitHub', url: 'https://github.com' },
              { icon: Twitter, text: 'Twitter', url: 'https://twitter.com' },
              { icon: FileText, text: 'Docs', url: '#' },
            ].map((link, i) => (
              <motion.a
                key={link.text}
                href={link.url}
                className='text-gray-400 hover:text-gray-100 transition-colors flex items-center gap-2'
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <link.icon className='w-5 h-5' />
                {link.text}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

// Reusable Section Component
const Section = ({
  children,
  title,
  subtitle,
  id,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  id?: string;
}) => {
  return (
    <section id={id} className='relative z-10 max-w-7xl mx-auto px-6 py-20'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className='text-4xl font-bold text-center mb-4'>{title}</h2>
        {subtitle && (
          <p className='text-gray-400 text-center mb-12 max-w-2xl mx-auto'>
            {subtitle}
          </p>
        )}
      </motion.div>
      {children}
    </section>
  );
};

export default App;

