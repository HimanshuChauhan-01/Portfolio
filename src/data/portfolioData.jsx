import { FiCode, FiServer, FiEdit3, FiSmartphone } from 'react-icons/fi';

export const nowPlaying = {
  title: 'Antigravity Theme',
  artist: 'Antigravity',
  album: 'Single · 2026',
  duration: 234,
  cover: 'linear-gradient(135deg, #1DB954 0%, #191414 100%)',
};

export const skills = [
  {
    icon: <FiCode size={24} />,
    name: 'Frontend Development',
    techs: ['React', 'TypeScript', 'Tailwind', 'GSAP', 'Framer Motion'],
    level: 90,
  },
  {
    icon: <FiServer size={24} />,
    name: 'Backend Development',
    techs: ['Spring Boot', 'Node.js', 'Express', 'Java', 'MongoDB'],
    level: 78,
  },
  {
    icon: <FiSmartphone size={24} />,
    name: 'Mobile & Web',
    techs: ['React', 'React Native', 'Responsive', 'Accessibility'],
    level: 75,
  },
];

export const projects = [
  {
    title: 'Talkwao',
    subtitle: 'Social Media Platform',
    description: 'A real-world social media mobile app featuring real-time messaging, post feeds, and live notifications.',
    tags: ['React Native', 'Node.js', 'WebSockets', 'JavaScript'],
    githubUrl: 'https://github.com/HimanshuChauhan-01/Talkwao-frontend.git',
    image: '/chatgpt.png',
    gradient: 'spotify-green',
    year: '2026',
  },
  {
    title: 'Vittles',
    subtitle: 'Campus Food Ordering App',
    description: 'A mobile food ordering application designed specifically for college campuses, streamlining dining services for students.',
    tags: ['React Native', 'Spring Boot', 'Java'],
    githubUrl: 'https://github.com/HimanshuChauhan-01/Vittles.git',
    image: '/chatgpt.png',
    gradient: 'purple-haze',
    year: '2026',
  },
];

export const experience = [
  {
    role: "Undergraduate Student",
    company: "Galgotias University",
    year: "Present",
    desc: "Currently pursuing my degree, focusing on software development and building creative coding projects."
  },
  {
    role: "Higher Secondary (12th)",
    company: "High School",
    year: "Completed",
    desc: "Focused on computer science and mathematics, building the foundation for my programming journey."
  },
  {
    role: "Secondary School (10th)",
    company: "High School",
    year: "Completed",
    desc: "Where my interest in technology and problem-solving began."
  }
];
