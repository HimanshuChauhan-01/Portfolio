import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiDownloadCloud, FiDownload, FiGithub, FiLinkedin, FiTwitter, FiMail, FiMusic, FiCode, FiHeart } from 'react-icons/fi';

const Hero = ({ heroRef, heroScale, heroOpacity, isPlaying, setIsPlaying }) => {
  return (
    <>
      <section id="home" className="hero-section" ref={heroRef}>
        <div className="hero-spotify-bg">
          <div className="bg-blob bg-blob-1"></div>
          <div className="bg-blob bg-blob-2"></div>
          <div className="bg-blob bg-blob-3"></div>
        </div>

        <motion.div
          className="hero-inner"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <div className="hero-content">
            <motion.div
              className="hero-eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="equalizer">
                <span className="eq-bar"></span>
                <span className="eq-bar"></span>
                <span className="eq-bar"></span>
                <span className="eq-bar"></span>
              </div>
              <span>Now Playing · Portfolio Mode</span>
            </motion.div>

            <motion.h1 
              className="hero-greeting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Hey there,
            </motion.h1>

            <motion.h1 
              className="hero-name-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            >
              <span className="hero-name">I'm</span>{' '}
              <span className="hero-name hero-name-gradient">Himanshu</span>
              <span className="hero-name">.</span>
            </motion.h1>

            <motion.p
              className="hero-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
              <span className="tagline-chip">
                <span className="dot green"></span> Available for work
              </span>{' '}
              Passionate about both{' '}
              <span className="hl">frontend</span> and{' '}
              <span className="hl">backend</span> development. I build robust applications using{' '}
              <span className="hl">Spring Boot</span>, <span className="hl">Node.js</span>, <span className="hl">React</span>, and <span className="hl">TypeScript</span>.
            </motion.p>

            <motion.div 
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            >
              <motion.a
                href="#projects"
                className="btn-primary-sp"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiPlay size={18} /> View Projects
              </motion.a>
            </motion.div>

            <motion.div 
              className="hero-socials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            >
              {[
                { icon: <FiGithub size={19} />, label: 'GitHub', url: 'https://github.com/HimanshuChauhan-01' },
                { icon: <FiLinkedin size={19} />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/himanshu25chauhan' }
              ].map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
                  whileHover={{ y: -4, scale: 1.1, borderColor: '#1DB954', color: '#1DB954' }}
                >
                  {s.icon}
                </motion.a>
              ))}
              
              {/* Resume Download Button */}
              <motion.button
                onClick={() => window.open('/resume.pdf', '_blank')}
                className="resume-download-btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.06, type: 'spring', stiffness: 260, damping: 20 }}
                whileHover={{ y: -4, scale: 1.05 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  background: 'var(--sp-green)',
                  color: '#000',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: '10px',
                  fontSize: '0.9rem'
                }}
              >
                <FiDownload size={16} /> Resume
              </motion.button>
            </motion.div>
          </div>

          {/* Hero Album Artwork (Spotify-style) */}
          <div className="hero-artwork-wrapper">
            <motion.div
              className="hero-art-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            ></motion.div>

            <motion.div
              className="hero-artwork"
              initial={{ opacity: 0, rotate: -6, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 120, damping: 14 }}
              whileHover={{ rotate: 2, scale: 1.02 }}
            >
              <div className="artwork-gradient"></div>
              <div className="artwork-overlay">
                <img
                  src="/image.png"
                  alt="Himanshu"
                  className="artwork-img"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=600&h=700';
                  }}
                />
              </div>
              <div className="artwork-badge">
                <FiMusic size={14} />
                <span>CODER</span>
              </div>

              <motion.button
                className="artwork-play"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <FiPause size={22} /> : <FiPlay size={22} />}
              </motion.button>
            </motion.div>


            <motion.div
              className="hero-float-card card-bottom"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, type: 'spring', stiffness: 180, damping: 18 }}
            >
              <div className="hfc-icon green"><FiHeart size={18} /></div>
              <div>
                <strong>∞</strong>
                <span>Lines of Code</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="hero-scroll-hint"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span>Scroll to explore</span>
          <div className="scroll-line-sp"></div>
        </motion.div>
      </section>

      {/* ============ MARQUEE (Spotify-style ticker) ============ */}
      <div className="marquee">
        <div className="marquee-track">
          {[...Array(2)].map((_, k) => (
            <div className="marquee-row" key={k}>
              {['Frontend Development', '★', 'UI / UX Design', '★', 'React & TypeScript', '★', 'GSAP Animations', '★', 'Creative Coding', '★', 'Framer Motion', '★', 'Himanshu', '★'].map((t, i) => (
                <span key={`${k}-${i}`} className={t === '★' ? 'marquee-star' : ''}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
