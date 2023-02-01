import React from 'react';

export default function Scoreboard(props) {
  return (
    <div className="flex h-16 items-end justify-center bg-gradient-to-bl from-blue-800 to-sky-300">
      <div className="text-xl text-white">Current Score: {props.score}</div>
    </div>
  );
}
