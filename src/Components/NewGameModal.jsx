import React from 'react';

export default function NewGameModal(props) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
        <div className="relative w-auto max-w-sm">
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-400">
              <h3 className="text-2xl font-semibold">Memory Game</h3>
            </div>
            <div className="relative flex-auto p-6">
              <p>
                Click each card only once, after each click the cards will
                shuffle. Remember the cards you clicked, if you click the same
                card twice it is game over!
              </p>
              <div className="flex items-center">
                <label className="p-2" htmlFor="cardRange">
                  Number of Cards: {props.cardRange}
                </label>
                <input
                  onChange={() => props.userRange(event)}
                  value={props.cardRange}
                  type="range"
                  name="cardRange"
                  id="cardRange"
                  min="4"
                  max="60"
                />
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-400">
              <button
                onClick={props.newGame}
                className="px-6 py-3 mb-1 mr-1 text-sm font-bold uppercase transition-all duration-150 ease-linear rounded shadow outline-none hover:shadow-xl hover:ring-4 hover:ring-blue-500"
              >
                New Game
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-30 backdrop-blur-md"></div>
    </>
  );
}