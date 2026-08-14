import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode } from 'react-icons/fi';

const LeetCodeCard = ({ username }) => {
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch both profile stats and contest stats simultaneously
    Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/${username}`).then(res => res.json()),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`).then(res => res.json())
    ])
      .then(([profileData, contestData]) => {
        if (profileData.errors || contestData.errors) {
          throw new Error("User not found or API error");
        }
        
        setLeetcodeData({
          totalSolved: profileData.totalSolved || 'N/A',
          ranking: profileData.ranking || 'N/A',
          rating: contestData.contestRating ? Math.round(contestData.contestRating) : 'N/A'
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("LeetCode fetch error:", err);
        // Fallback to Herokuapp API if Alfa fails (note: no rating available here)
        fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
          .then(res => res.json())
          .then(fallbackData => {
             if (fallbackData.status === 'success') {
                setLeetcodeData({
                    totalSolved: fallbackData.totalSolved,
                    ranking: fallbackData.ranking,
                    rating: 'N/A'
                });
             } else {
                 setError(true);
             }
             setLoading(false);
          })
          .catch(() => {
              setError(true);
              setLoading(false);
          });
      });
  }, [username]);

  if (error) return null; // Hide card completely if both APIs fail

  return (
    <motion.div
      className="skill-card-gsap leetcode-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.32, type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ y: -6 }}
    >
      <div className="skill-icon-sp" style={{ color: '#f59e0b' }}>
        <FiCode size={24} />
      </div>
      <h3 style={{ color: '#f59e0b' }}>LeetCode Profile</h3>
      
      <div className="lc-stats">
        {loading ? (
            <div style={{ color: 'var(--sp-text-sub)', fontSize: '0.9rem', marginTop: '10px' }}>Loading live stats...</div>
        ) : leetcodeData ? (
            <>
                <div className="lc-stat">
                  <span>Problems Solved</span>
                  <strong>{leetcodeData.totalSolved}</strong>
                </div>
                <div className="lc-stat">
                  <span>Contest Rating</span>
                  <strong>{leetcodeData.rating}</strong>
                </div>
                <div className="lc-stat">
                  <span>Global Rank</span>
                  <strong>{leetcodeData.ranking}</strong>
                </div>
            </>
        ) : null}
      </div>
    </motion.div>
  );
};

export default LeetCodeCard;
