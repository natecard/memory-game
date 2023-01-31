import React, { useState, useEffect } from 'react';

import Card from './Components/Card';
import Gameboard from './Components/Gameboard';
import Header from './Components/Header';
import Scoreboard from './Components/Scoreboard';

export default function App() {
  const [cards, setCards] = useState([]);
  const [starwarsData, setStarwarsData] = useState([]);

  const [cardClick, setCardClick] = useState(false);

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
  useEffect(() => {
    const mappedCards = starwarsData.map((card, index) => ({
      name: card.name,
      image: card.image,
      id: index + 1,
      isClicked: false,
    }));
    setCards(mappedCards);
    // console.log(mappedCards);
  }, [starwarsData]);

  const cardElements = cards.map((card) => (
    <Card
      className=""
      name={card.name}
      image={card.image}
      cardClicked={() => cardClicked(card.id)}
      value={card.value}
      id={card.id}
      key={card.id}
    />
  ));
  // function shuffleCards(cardElements) {
  //   let currentIndex = cardElements.length;
  //   while (0 !== currentIndex) {
  //     let randIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;
  //     let tempArr = cardElements[currentIndex];
  //     cardElements[currentIndex] = cardElements[randIndex];
  //     cardElements[randIndex] = tempArr;
  //   }
  //   return cardElements;
  // }
  function cardClicked(id) {
    setCards((oldCards) =>
      oldCards.map((card) => {
        if (card.id === id) {
          console.log(`clicked: ${card.id}`);
          shuffleCards(cardElements);
          return { ...card, isClicked: !card.isClicked };
        }
        return card;
      })
    );
  }

  return (
    <div className="h-full w-full">
      <Header />
      <Scoreboard />
      <Gameboard className="h-auto w-auto" />
      <div className="m-4 grid grid-cols-4 grid-rows-4 gap-5 p-2 text-black">
        {cardElements}
      </div>
    </div>
  );
}
