import React from 'react';

export default function Scoreboard(props) {
  return (
    <div className="flex items-end justify-center h-16 bg-black font-starWarsBorder">
      <div className="text-xl text-yellow-300">
        Current Score: {props.score} High Score: {props.highScore}
      </div>
    </div>
  );
}
