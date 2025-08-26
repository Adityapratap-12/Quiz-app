import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Result({ score, questions, onRestart }) {
  const percentage = Math.round((score / questions.length) * 100);

  // Performance colors
  const getPerformanceColor = () => {
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <motion.div
      className="card result-card text-center p-6 rounded-2xl shadow-lg bg-slate-900 bg-opacity-80"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Celebration Title */}
      <motion.h2
        className="result-title text-4xl font-extrabold text-white drop-shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
         Quiz Finished 
      </motion.h2>

      {/* Score Circle */}
      <motion.div
        className="score-box flex flex-col items-center mt-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="70"
              stroke="#1e293b"
              strokeWidth="12"
              fill="none"
            />
            <motion.circle
              cx="72"
              cy="72"
              r="70"
              stroke={
                percentage >= 80
                  ? "#22c55e"
                  : percentage >= 50
                  ? "#facc15"
                  : "#ef4444"
              }
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: percentage / 100 }}
              transition={{ duration: 1 }}
            />
          </svg>
          <span
            className={`percent text-2xl font-bold ${getPerformanceColor()}`}
          >
            {percentage}%
          </span>
        </div>
        <p className="mt-3 text-slate-300 text-lg">
          Score: <b>{score}</b> / {questions.length}
        </p>
      </motion.div>

      {/* Review Answers */}
      <motion.h3
        className="review-title text-2xl mt-8 font-semibold text-sky-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Review Answers
      </motion.h3>

      <ul className="review mt-4 text-left space-y-4">
        {questions.map((q, idx) => (
          <motion.li
            key={idx}
            className="review-item bg-slate-800 rounded-xl p-4 shadow-md cursor-pointer hover:shadow-xl transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => toggleQuestion(idx)}
          >
            <p className="font-semibold text-slate-100">
              {idx + 1}.{" "}
              <span dangerouslySetInnerHTML={{ __html: q.question }} />
            </p>
            {openIndex === idx && (
              <div className="mt-2 text-sm text-slate-300">
                <p>
                  ✅ <b>Correct:</b> {q.options[q.answerIndex]}
                </p>
                <p>
                   <b>Your Answer:</b>{" "}
                  {q.chosen !== null ? (
                    q.chosen === q.answerIndex ? (
                      <span className="text-green-400 font-bold">
                        {q.options[q.chosen]}
                      </span>
                    ) : (
                      <span className="text-red-400 font-bold">
                        {q.options[q.chosen]}
                      </span>
                    )
                  ) : (
                    "❌ Not answered"
                  )}
                </p>
              </div>
            )}
          </motion.li>
        ))}
      </ul>

      {/* Restart Button */}
      <motion.button
        className="restart-btn mt-8 px-8 py-3 text-lg font-bold rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:scale-110 hover:shadow-2xl transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
      >
         Restart Quiz
      </motion.button>
    </motion.div>
  );
}
