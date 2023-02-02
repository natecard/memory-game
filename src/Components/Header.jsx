import React from 'react';
export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto text-yellow-300 bg-black font-starWarsBorder">
      <h1 className="text-4xl">{`Star Wars Character \n Memory Game`}</h1>
      <h3 className="w-2/5 m-2 text-sm font-starWars">
        Click each card only once, after each click the cards will shuffle.
        Remember the cards you clicked, if you click the same card twice it is
        game over!
      </h3>
    </div>
  );
}
