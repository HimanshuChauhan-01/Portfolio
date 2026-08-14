import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMusic, FiChevronRight } from 'react-icons/fi';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' } // Triggers when the section hits the top 30% of the screen
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((sec) => observer.observe(sec));

    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.header
      className="spot-nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: 'power3.out' }}
    >
      <a href="#home" className="spot-nav-logo">
        <div className="spot-logo-ring">
          <FiMusic size={20} />
        </div>
        <span className="spot-nav-name">himanshu</span>
      </a>

      <nav className="spot-nav-links">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={activeSection === link.id ? 'active' : ''}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a href="#contact" className="spot-nav-cta">
        Let's Connect <FiChevronRight size={16} />
      </a>
    </motion.header>
  );
};

export default Navigation;
