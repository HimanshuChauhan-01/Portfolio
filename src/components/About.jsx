import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiMusic, FiBriefcase } from 'react-icons/fi';
import { experience } from '../data/portfolioData';

const About = () => {
  return (
    <section id="about" className="section-sp about-section">
      <motion.div 
        className="section-head"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <span className="section-index">01</span>
        <span className="section-line"></span>
        <span className="section-label">About Me</span>
      </motion.div>

      <div className="about-grid">
        <motion.div
          className="about-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0, x: -40 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.15 } }
          }}
        >
          <motion.h2 className="section-title-sp" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring' } } }}>
            Designing &<br />
            <span className="green-gradient">building the vibe.</span>
          </motion.h2>

          <motion.div className="about-paras" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring' } } }}>
            <p>
              Hey! I'm <strong className="glow">Himanshu</strong> — a passionate full-stack developer who
              loves bridging the gap between powerful backend systems and intuitive user interfaces.
            </p>
            <p>
              I work seamlessly across both the frontend and backend. I specialize in building robust
              APIs and services using <strong>Spring Boot</strong> and <strong>Node.js</strong>, while 
              crafting dynamic, engaging web applications on the frontend with <strong>React</strong> and <strong>TypeScript</strong>.
            </p>
            <p>
              Currently focused on expanding my skill set, building meaningful full-stack products with great attention to
              detail, and exploring new technologies. Always down to collaborate on
              something fun! 🚀
            </p>
          </motion.div>

          <motion.div className="about-chips" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring' } } }}>
            <motion.div
              className="chip"
              whileHover={{ scale: 1.06, y: -2 }}
            >
              <FiMapPin size={16} /> Based in India
            </motion.div>
            <motion.div
              className="chip"
              whileHover={{ scale: 1.06, y: -2 }}
            >
              <FiClock size={16} /> Open to freelance
            </motion.div>
            <motion.div
              className="chip"
              whileHover={{ scale: 1.06, y: -2 }}
            >
              <FiMusic size={16} /> Powered by lo-fi
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          className="about-right"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        >
          <div className="rp-label" style={{ marginBottom: '24px' }}>
            <FiBriefcase size={16} />
            <span>Experience & Education</span>
          </div>

          <div className="timeline-container">
            {experience.map((item, i) => (
              <motion.div
                key={item.role + i}
                className="timeline-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, type: 'spring' }}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3 className="timeline-role">{item.role}</h3>
                    <span className="timeline-year">{item.year}</span>
                  </div>
                  <h4 className="timeline-company">{item.company}</h4>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
