import React, { useState, useEffect } from 'react';

import Card from './Components/Card';
import Gameboard from './Components/Gameboard';
import Header from './Components/Header';
import Scoreboard from './Components/Scoreboard';

export default function App() {
  const [cards, setCards] = useState([]);
  const [starwarsData, setStarwarsData] = useState([]);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
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
      const shortenedData = data.slice(0, 16);
      setStarwarsData(shortenedData);
    }
    swAPIFetch();
  }, []);
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
        console.log('you lost');
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

  return (
    <div className="h-full w-full">
      <Header />
      <Scoreboard score={score} />
      <Gameboard className="h-auto w-auto" />
      <div className="m-4 grid grid-cols-4 grid-rows-4 gap-5 p-2 text-black">
        {cardElements}
      </div>
    </div>
  );
}
