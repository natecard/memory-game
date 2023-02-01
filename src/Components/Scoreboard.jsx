import React from 'react';

export default function Scoreboard(props) {
  return (
    <div className="flex h-16 items-end justify-center bg-gradient-to-b from-slate-700 to-gray-200">
      <div className="text-xl">Current Score: {props.score}</div>
    </div>
  );
}
