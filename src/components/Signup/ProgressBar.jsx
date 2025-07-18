import React from "react";

export default function ProgressBar({ progress }) {
  return (
    <div className="progress-bar-outer" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress-bar-inner" style={{ width: `${progress}%` }} />
    </div>
  );
}
