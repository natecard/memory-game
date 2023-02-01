import React from 'react';
export default function Header() {
  return (
    <div className="flex h-auto w-full flex-col items-center justify-center bg-gradient-to-br from-sky-300 to-blue-800 text-white">
      <h1 className="text-4xl">Memory Game</h1>
      <h3 className="m-2 w-2/5 text-sm">
        Click each card only once, after each click the cards will shuffle.
        Remember the cards you clicked, if you click the same card twice it is
        game over!
      </h3>
    </div>
  );
}
