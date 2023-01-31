import React from 'react';

export default function Card(props) {
  return (
    <div
      onClick={props.cardClicked}
      className="flex content-center justify-center rounded-2xl bg-gray-500 text-center"
    >
      <div>
        <img
          className="mt-4 mb-1 h-44 w-36 rounded-2xl "
          src={props.image}
          alt=""
          sizes=""
        />
        <h2>{props.name}</h2>
      </div>
    </div>
  );
}
