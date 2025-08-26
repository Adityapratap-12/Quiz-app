import React from "react";

export default function ProgressBar({ current, total }) {
  const percent = (current / total) * 100;
  return (
    <div className="progress-bar">
      <div className="fill" style={{ width: `${percent}%` }}></div>
    </div>
  );
}
