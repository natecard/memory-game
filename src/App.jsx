import React, { useState, useEffect } from 'react';

import Card from './Components/Card';
import Modal from './Components/Modal';
import Header from './Components/Header';
import Scoreboard from './Components/Scoreboard';

export default function App() {
  const [cards, setCards] = useState([]);
  const [starwarsData, setStarwarsData] = useState([]);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cardRange, setCardRange] = useState(16);

  //Calling the SW API only called once on initial render
  useEffect(() => {
    async function swAPIFetch() {
      const resp = await fetch(
        'https://akabab.github.io/starwars-api/api/all.json',
        {
          mode: 'cors',
        }
      );
      const data = await resp.json();
      const returnedData = data.slice(0, 88);
      const removedData16 = returnedData.splice(16, 1);
      const removedData23 = returnedData.splice(23, 1);
      const removedData28 = returnedData.splice(24, 1);
      const removedData32 = returnedData.splice(32, 1);
      const removedData37 = returnedData.splice(37, 1);
      const removedData40 = returnedData.splice(40, 1);
      const removedData41 = returnedData.splice(41, 1);
      const removedData46 = returnedData.splice(46, 3);
      const removedData49 = returnedData.splice(49, 1);
      const removedData51 = returnedData.splice(51, 1);
      const removedData52 = returnedData.splice(52, 1);
      const removedData56 = returnedData.splice(56, 1);
      const removedData61 = returnedData.splice(61, 1);
      const removedData62 = returnedData.splice(62, 1);
      const removedData64 = returnedData.splice(64, 2);
      const shortenedData = returnedData.slice(0, cardRange);
      setStarwarsData(shortenedData);
    }
    swAPIFetch();
  }, []);
  function userRange(event) {
    const { value } = event.target;
    setCardRange(value);
    console.log(value);
  }
  //This maps the SW API to the cards state array
  useEffect(() => {
    const mappedCards = starwarsData.map((card, index) => ({
      name: card.name,
      image: card.image,
      id: card.id,
      isClicked: false,
    }));
    setCards(mappedCards);
  }, [starwarsData]);

  //Shuffles cards randomly
  const getRandomIndex = (max) => Math.floor(Math.random() * max);
  const shuffleCards = (prevCards) => {
    let cards = [...prevCards];
    const length = cards.length;
    let shuffled = [];
    let x;
    for (let i = 0; i < length; i += 1) {
      x = getRandomIndex(cards.length);
      shuffled = [...shuffled, ...cards.splice(x, 1)];
    }
    return shuffled;
  };
  //changes the isClicked prop to update each card
  function cardClicked(id) {
    setCards((oldCards) => {
      const newCards = [...oldCards];
      const clickedCard = newCards.find((card) => card.id === id);
      if (clickedCard && !clickedCard.isClicked) {
        const updatedCards = newCards.map((card) => {
          if (card.id === id) {
            return { ...card, isClicked: true };
          }
          return card;
        });
        return shuffleCards(updatedCards);
      } else {
        setShowModal(true);
        setScore(0);
        return shuffleCards(
          newCards.map((card) => ({ ...card, isClicked: false }))
        );
      }
    });
  }
  //counting the players score
  useEffect(() => {
    const scoreCard = [];
    const clickedCardArray = cards.find((card) => card.isClicked === true);
    if (clickedCardArray) {
      scoreCard.push(clickedCardArray);
    }
    setScore((prevVal) => prevVal + scoreCard.length);
  }, [cards]);
  //if all cards are clicked then logs you won
  useEffect(() => {
    const allSameValue = cards.every((card) => card.isClicked === true);
    if (allSameValue && won === false) {
      console.log('You won');
      setWon(true);
    }
  }, [cards]);

  //Rendering the cards array passing props
  const cardElements = cards.map((card) => (
    <Card
      className=""
      name={card.name}
      isClicked={card.isClicked}
      image={card.image}
      cardClicked={() => cardClicked(card.id)}
      id={card.id}
      key={card.id}
    />
  ));
  function newGame() {
    setWon(false);
    setShowModal(false);
  }
  return (
    <div className="flex flex-col w-full h-full">
      {(showModal && (
        // <div className='fixed inset-0 z-10 w-full h-full '>
        <Modal
          className="transition-all duration-1000 "
          newGame={() => newGame()}
          userRange={userRange}
          cardRange={cardRange}
        />
        // </div>
      )) ||
        (won && (
          <Modal
            className="transition-all duration-1000 "
            newGame={() => newGame()}
            userRange={userRange}
            cardRange={cardRange}
          />
        ))}
      <div>
        <Header />
        <Scoreboard score={score} />
        <div className="grid gap-5 p-2 m-4 text-black md:grid-cols-4 md:grid-rows-4 lg:grid-cols-6 lg:grid-rows-3">
          {cardElements}
        </div>
      </div>
    </div>
  );
}
