import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';

const Skills = () => {
  // Bento box sizing classes based on index
  const getBentoClass = (index) => {
    switch (index) {
      case 0: return 'bento-large'; // Frontend (spans 2 columns, 2 rows)
      case 1: return 'bento-tall';  // Backend (spans 1 column, 2 rows)
      case 2: return 'bento-tall';  // Mobile & Web (spans 1 column, 2 rows)
      default: return 'bento-small';
    }
  };

  const getBentoGlow = (index) => {
    switch (index) {
      case 0: return 'glow-green';
      case 1: return 'glow-blue';
      case 2: return 'glow-purple';
      case 3: return 'glow-orange';
      default: return 'glow-green';
    }
  };

  return (
    <section id="skills" className="section-sp skills-section">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <span className="section-index">03</span>
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

      <div className="bento-grid">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className={`bento-card ${getBentoClass(i)} ${getBentoGlow(i)}`}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="bento-icon-wrapper">
              <div className="bento-icon">{skill.icon}</div>
              <div className="bento-level-badge">{skill.level}%</div>
            </div>
            
            <div className="bento-content">
              <h3>{skill.name}</h3>
              <div className="bento-techs">
                {skill.techs.map((t) => (
                  <span key={t} className="bento-pill">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
