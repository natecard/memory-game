import React from 'react';

export default function Card(props) {
  return (
    <div
      onClick={props.cardClicked}
      className="flex content-center justify-center rounded-2xl bg-neutral-300 text-center"
    >
      <div className="my-4 rounded-lg bg-white px-2">
        <img
          className="m-2 mt-4 h-44 w-32 rounded-2xl "
          src={props.image}
          alt=""
          sizes=""
        />
        <h2>{props.name}</h2>
      </div>
    </div>
  );
}
