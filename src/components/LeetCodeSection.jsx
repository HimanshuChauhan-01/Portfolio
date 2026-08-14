import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiAward, FiTrendingUp, FiActivity, FiGlobe } from 'react-icons/fi';

const LeetCodeSection = ({ username }) => {
  const [data, setData] = useState({
    profile: null,
    solved: null,
    contest: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        setLoading(true);
        const [profileRes, solvedRes, contestRes] = await Promise.all([
          fetch(`https://alfa-leetcode-api.onrender.com/${username}`),
          fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`),
          fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`),
        ]);

        const profile = await profileRes.json();
        const solved = await solvedRes.json();
        const contest = await contestRes.json();

        if (profile.errors || solved.errors || contest.errors) {
          throw new Error('API Error');
        }

        const fetchedData = { profile, solved, contest };
        setData(fetchedData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch LeetCode data, using fallback:', err);
        // Using fixed fallback data if the API fails
        setData({
          profile: {
            name: 'Himanshu Chauhan',
            ranking: 224780,
          },
          solved: {
            solvedProblem: 374,
            easySolved: 159,
            mediumSolved: 191,
            hardSolved: 24,
          },
          contest: {
            contestRating: 1588,
            contestAttend: 21,
            contestGlobalRanking: 224780,
          }
        });
        setError(false);
        setLoading(false);
      }
    };

    fetchLeetCodeData();
  }, [username]);

  // if (error) return null; // We use fallback instead now

  return (
    <section id="leetcode" className="section-sp leetcode-section">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <span className="section-index">04</span>
        <span className="section-line"></span>
        <span className="section-label">Competitive Programming</span>
      </motion.div>

      <motion.h2
        className="section-title-sp"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ delay: 0.1 }}
      >
        Problem <span className="green-gradient">Solving.</span>
      </motion.h2>

      <div className="lc-dashboard">
        {loading ? (
          <div className="lc-loading">
            <FiActivity className="spin-icon" size={24} />
            <p>Fetching LeetCode stats...</p>
          </div>
        ) : (
          <>
            {/* Left: Problems Solved */}
            <motion.div
              className="lc-panel lc-solved-panel"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <div className="lc-panel-header">
                <FiCode className="lc-icon" />
                <h3>Problems Solved</h3>
              </div>

              <div className="lc-solved-content">
                <div className="lc-circle-chart">
                  <div className="lc-circle-inner">
                    <span className="lc-total-num">{data.solved.solvedProblem}</span>
                    <span className="lc-total-label">Solved</span>
                  </div>
                </div>

                <div className="lc-difficulty-stats">
                  <div className="lc-diff-item easy">
                    <div className="lc-diff-label">
                      <span>Easy</span>
                      <strong>{data.solved.easySolved}</strong>
                    </div>
                    <div className="lc-progress-bar"><div className="lc-progress-fill" style={{ width: `${(data.solved.easySolved / data.solved.solvedProblem) * 100}%` }}></div></div>
                  </div>
                  <div className="lc-diff-item medium">
                    <div className="lc-diff-label">
                      <span>Medium</span>
                      <strong>{data.solved.mediumSolved}</strong>
                    </div>
                    <div className="lc-progress-bar"><div className="lc-progress-fill" style={{ width: `${(data.solved.mediumSolved / data.solved.solvedProblem) * 100}%` }}></div></div>
                  </div>
                  <div className="lc-diff-item hard">
                    <div className="lc-diff-label">
                      <span>Hard</span>
                      <strong>{data.solved.hardSolved}</strong>
                    </div>
                    <div className="lc-progress-bar"><div className="lc-progress-fill" style={{ width: `${(data.solved.hardSolved / data.solved.solvedProblem) * 100}%` }}></div></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Contest Stats */}
            <div className="lc-contest-grid">
              <motion.div
                className="lc-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <div className="lc-panel-header">
                  <FiTrendingUp className="lc-icon rating-icon" />
                  <h3>Contest Rating</h3>
                </div>
                <div className="lc-stat-huge">
                  {Math.round(data.contest.contestRating || 0)}
                </div>
                {data.contest.contestTopPercentage && (
                  <p className="lc-stat-sub">Top {data.contest.contestTopPercentage}%</p>
                )}
              </motion.div>

              <motion.div
                className="lc-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                <div className="lc-panel-header">
                  <FiGlobe className="lc-icon rank-icon" />
                  <h3>Global Rank</h3>
                </div>
                <div className="lc-stat-huge">
                  {data.profile.ranking ? data.profile.ranking.toLocaleString() : 'N/A'}
                </div>
                <p className="lc-stat-sub">Worldwide</p>
              </motion.div>

              <motion.div
                className="lc-panel lc-panel-wide"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <div className="lc-panel-header">
                  <FiAward className="lc-icon attended-icon" />
                  <h3>Contests Attended</h3>
                </div>
                <div className="lc-stat-huge">
                  {data.contest.contestAttend || 0}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LeetCodeSection;
