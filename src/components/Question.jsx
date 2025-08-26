import React from "react";

export default function Question({ q, selectedIndex, onSelect }) {
  return (
    <div className="card">
      <h2 dangerouslySetInnerHTML={{ __html: q.question }} />
      <div className="options">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            className={`option ${selectedIndex === idx ? "selected" : ""}`}
            onClick={() => onSelect(idx)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
