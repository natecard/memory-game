import React from 'react';

export default function Card(props) {
  return (
    <div
      onClick={props.cardClicked}
      className="flex content-center justify-center text-center transition-transform duration-200 rounded-2xl bg-neutral-300 hover:-translate-y-1"
    >
      <div className="px-2 my-4 bg-white rounded-lg">
        <img
          className="w-32 m-2 mt-4 h-44 rounded-2xl "
          src={props.image}
          alt=""
          sizes=""
        />
        <h2>{props.name}</h2>
      </div>
    </div>
  );
}
