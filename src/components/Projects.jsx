import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FiArrowUpRight, FiPlay, FiGithub, FiExternalLink } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { projects } from '../data/portfolioData';

const Projects = () => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Calculate how far the carousel can be dragged
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="projects" className="section-sp projects-section" style={{ overflow: 'hidden' }}>
      <motion.div 
        className="section-head"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <span className="section-index">03</span>
        <span className="section-line"></span>
        <span className="section-label">Featured Releases</span>
      </motion.div>

      <div className="projects-header-sp">
        <motion.h2 
          className="section-title-sp"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.1 }}
        >
          Featured <span className="green-gradient">releases.</span>
        </motion.h2>

        <motion.a
          href="#"
          className="see-all"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ x: 4 }}
        >
          See all <FiArrowUpRight size={18} />
        </motion.a>
      </div>

      <motion.div 
        className="projects-carousel-container" 
        ref={containerRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div 
          className="projects-carousel"
        >
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              className={`project-album-card grad-${p.gradient}`}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="album-cover">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="album-image" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                ) : (
                  <div className="album-gradient"></div>
                )}
                <div className="album-year">{p.year}</div>
                
                <motion.div 
                  className="album-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.a 
                    href={p.githubUrl || "#"} 
                    target={p.githubUrl ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="album-link-btn" 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiGithub size={20} />
                  </motion.a>
                  <motion.button className="album-play-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <FiPlay size={24} />
                  </motion.button>
                  {p.liveUrl ? (
                    <motion.a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="album-link-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <FiExternalLink size={20} />
                    </motion.a>
                  ) : (
                    <motion.button 
                      onClick={() => toast.error("No link available", {
                        style: {
                          borderRadius: '10px',
                          background: '#191414',
                          color: '#fff',
                          border: '1px solid #333'
                        }
                      })} 
                      className="album-link-btn" 
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiExternalLink size={20} />
                    </motion.button>
                  )}
                </motion.div>
              </div>

              <div className="album-info">
                <div className="album-subtitle">{p.subtitle}</div>
                <h3 className="album-title">{p.title}</h3>
                <p className="album-desc">{p.description}</p>
                <div className="album-tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
