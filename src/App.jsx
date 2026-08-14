import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiMapPin,
  FiDownloadCloud,
  FiArrowUpRight,
  FiCode,
  FiEdit3,
  FiSmartphone,
  FiServer,
  FiPlay,
  FiPause,
  FiSkipForward,
  FiSkipBack,
  FiMusic,
  FiShuffle,
  FiRepeat,
  FiHeart,
  FiMoreHorizontal,
  FiClock,
  FiChevronRight,
} from 'react-icons/fi';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

import { skills, projects, nowPlaying } from './data/portfolioData';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import LeetCodeSection from './components/LeetCodeSection';
import { Toaster } from 'react-hot-toast';

// ============ MAIN APP ============
function App() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(42);
  const [liked, setLiked] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.3]);

  // Simulate progress when playing
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.3));
    }, 500);
    return () => clearInterval(id);
  }, [isPlaying]);

  // Custom cursor track
  useEffect(() => {
    const handleMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setShowCursor(true);
    };
    const handleLeave = () => setShowCursor(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // ============ GSAP ANIMATIONS ============
  useGSAP(
    () => {
      // --- HERO INTRO ---
      // (Migrated to Framer Motion for faster, non-conflicting animations)

      // --- Equalizer bars animation ---
      gsap.to('.eq-bar', {
        height: '100%',
        duration: 0.35,
        ease: 'sine.inOut',
        stagger: { each: 0.08, from: 'random', repeat: -1, yoyo: true },
      });

      // --- MARQUEE infinite scroll (Spotify-style "Now Playing" strip) ---
      gsap.to('.marquee-track', {
        xPercent: -50,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });

      // --- Section fade-in on scroll ---
      gsap.utils.toArray('.gsap-reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      // --- Skill bars fill ---
      gsap.utils.toArray('.skill-bar-fill').forEach((el) => {
        const level = el.getAttribute('data-level') || 80;
        gsap.from(el, {
          width: '0%',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
        });
        gsap.to(el, {
          width: `${level}%`,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
        });
      });

      // --- Projects stagger ---
      gsap.utils.toArray('.project-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 80,
          scale: 0.96,
          duration: 0.85,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 82%',
          },
        });
      });

      // --- Recently played horizontal hover tilt ---
      gsap.utils.toArray('.rp-card').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, { y: -8, scale: 1.03, duration: 0.3, ease: 'back.out(2)' });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      });

      // --- Skill cards 3D tilt ---
      gsap.utils.toArray('.skill-card-gsap').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rx = ((y / rect.height) - 0.5) * -8;
          const ry = ((x / rect.width) - 0.5) * 8;
          gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
      });

      // --- Parallax for hero artwork glow ---
      gsap.to('.hero-art-glow', {
        yPercent: -15,
        xPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  // ============ RENDER ============
  return (
    <div className="spotify-shell" ref={containerRef}>
      <Toaster position="bottom-center" />
      {/* Custom cursor glow */}
      <AnimatePresence>
        {showCursor && (
          <motion.div
            className="cursor-glow"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: cursorPos.x - 200,
              y: cursorPos.y - 200,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* ============ TOP NAV ============ */}
      <Navigation />

      {/* ============ HERO & MARQUEE ============ */}
      <Hero
        heroRef={heroRef}
        heroScale={heroScale}
        heroOpacity={heroOpacity}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

      {/* ============ ABOUT ============ */}
      <About />

      {/* ============ SKILLS ============ */}
      <section id="skills" className="section-sp skills-section">
        <motion.div 
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <span className="section-index">02</span>
          <span className="section-line"></span>
          <span className="section-label">Skills & Tools</span>
        </motion.div>

        <motion.div
          className="section-intro"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title-sp">
            My <span className="green-gradient">toolkit</span> on repeat.
          </h2>
          <p>
            Everything I use to take an idea from a scribbled note to a shipped product —
            stacked like my favorite playlist.
          </p>
        </motion.div>

        <div className="skills-grid-sp">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skill-card-gsap"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
              whileHover={{ y: -6 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              <div className="skill-icon-sp">{skill.icon}</div>
              <h3>{skill.name}</h3>

              <div className="skill-bar">
                <div className="skill-bar-fill" data-level={skill.level}></div>
                <span className="skill-level-tag">{skill.level}%</span>
              </div>

              <div className="skill-techs-sp">
                {skill.techs.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ LEETCODE DASHBOARD ============ */}
      <LeetCodeSection username="Himanshu-Chauhan_25" />

      {/* ============ PROJECTS ============ */}
      <Projects />

      {/* ============ CONTACT (Spotify "Your Library" CTA) ============ */}
      <section id="contact" className="section-sp contact-section">
        <motion.div
          className="contact-card-sp"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6, type: 'spring', stiffness: 100, damping: 20, staggerChildren: 0.15 } }
          }}
        >
          <div className="contact-glow"></div>

          <motion.div className="section-head white" style={{ paddingBottom: 0 }} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <span className="section-index">04</span>
            <span className="section-line light"></span>
            <span className="section-label">Get In Touch</span>
          </motion.div>

          <motion.h2 className="contact-title-sp" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } }}>
            Got a project in mind?<br />
            <span className="green-gradient">Let's make a hit together.</span>
          </motion.h2>

          <motion.p className="contact-desc-sp" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } }}>
            Think of this as pressing play on a new collab. Whether you have a full brief or
            just a rough idea — my inbox is open and I'm excited to hear about what you're
            building.
          </motion.p>

          <motion.div className="contact-actions-sp" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } }}>
            <motion.a
              href="mailto:chauhan25himanshu@gmail.com"
              className="btn-primary-sp btn-xxl"
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiMail size={20} /> chauhan25himanshu@gmail.com
            </motion.a>

            <div className="contact-socials-sp">
              {[
                { icon: <FiGithub size={22} />, label: 'GitHub', url: 'https://github.com/HimanshuChauhan-01' },
                { icon: <FiLinkedin size={22} />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/himanshu25chauhan' },
              ].map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -5, scale: 1.12, borderColor: '#1DB954', color: '#1DB954' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ============ NOW PLAYING BAR (Spotify-style footer player) ============ */}
      {/* 
      <div className="now-playing-bar">
        <div className="np-left">
          <div className="np-cover" style={{ background: nowPlaying.cover }}>
            <FiMusic size={16} />
          </div>
          <div className="np-info">
            <div className="np-title">{nowPlaying.title}</div>
            <div className="np-artist">{nowPlaying.artist} · {nowPlaying.album}</div>
          </div>
          <motion.button
            className={`np-heart ${liked ? 'liked' : ''}`}
            onClick={() => setLiked(!liked)}
            whileTap={{ scale: 0.7 }}
            animate={liked ? { color: '#1DB954', scale: [1, 1.3, 1] } : { color: '#b3b3b3' }}
            transition={{ duration: 0.3 }}
          >
            <FiHeart size={18} fill={liked ? '#1DB954' : 'none'} />
          </motion.button>
        </div>

        <div className="np-center">
          <div className="np-controls">
            <motion.button whileHover={{ color: '#fff', scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <FiShuffle size={16} />
            </motion.button>
            <motion.button whileHover={{ color: '#fff', scale: 1.15 }} whileTap={{ scale: 0.85 }}>
              <FiSkipBack size={18} />
            </motion.button>
            <motion.button
              className="np-play-btn"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
            </motion.button>
            <motion.button whileHover={{ color: '#fff', scale: 1.15 }} whileTap={{ scale: 0.85 }}>
              <FiSkipForward size={18} />
            </motion.button>
            <motion.button whileHover={{ color: '#fff', scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <FiRepeat size={16} />
            </motion.button>
          </div>
          <div className="np-progress">
            <span className="np-time">
              {String(Math.floor((progress / 100) * nowPlaying.duration / 60)).padStart(1, '0')}:
              {String(Math.floor((progress / 100) * nowPlaying.duration % 60)).padStart(2, '0')}
            </span>
            <motion.div
              className="np-bar"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setProgress(((e.clientX - rect.left) / rect.width) * 100);
              }}
            >
              <motion.div
                className="np-bar-fill"
                style={{ width: `${progress}%` }}
                animate={{ width: `${progress}%` }}
              >
                <motion.div
                  className="np-bar-knob"
                  whileHover={{ scale: 1.4 }}
                />
              </motion.div>
            </motion.div>
            <span className="np-time">
              {String(Math.floor(nowPlaying.duration / 60)).padStart(1, '0')}:
              {String(nowPlaying.duration % 60).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="np-right">
          <motion.button whileHover={{ color: '#fff' }} whileTap={{ scale: 0.9 }}>
            <FiMoreHorizontal size={18} />
          </motion.button>
        </div>
      </div>

      <div className="footer-spacer"></div>
      */}

      {/* Footer */}
      <footer className="footer-sp">
        <div className="footer-inner-sp">
          <span>© 2026 Himanshu · Designed & coded with 🎵 and 💚</span>
          <a href="#home" className="footer-top-sp" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            Back to top <FiChevronRight size={16} style={{ transform: 'rotate(-90deg)' }} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
