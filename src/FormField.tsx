import { useEffect, useState } from "react";
import Card from "./components/card/Card";
import TCGdex from '@tcgdex/sdk'
import tcgdexApi from "./api/tcg-dex"
import Form from "./components/form/Form";


  
function FormField() {
const [inputValue, setInputValue] = useState('');
  const [cards, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChangeInParent = (valueFromChild) => {
    setInputValue(valueFromChild);
  }

const fetchRandomCard = async () => {
    setLoading(true);
    try {
      
      // TCGdex provides a full card list endpoint
      const response = await fetch('https://api.tcgdex.net/v2/en/cards');
      const allCards = await response.json();
      
      
      const shuffledCards = [...allCards].sort(() => 0.5 - Math.random());

      // Shuffle and get all cards based on user input
      const selectedCards = shuffledCards.slice(0, Number(inputValue));
      
      // Fetch detailed info for each card
      const detailedCards = await Promise.all(
        selectedCards.map(card => 
          fetch(`https://api.tcgdex.net/v2/en/cards/${card.id}`).then(res => res.json())
        )
      )
      console.log(detailedCards)
      setCard(detailedCards); // Set cards data
    } catch (error) {
      console.error("Error fetching card:", error);
    }
    setLoading(false);
  }

    return (
        <>
      <Form onInputChange={handleInputChangeInParent}/>
        <button onClick={fetchRandomCard}>{loading ? 'Loading' : 'Get a card'}</button>

          {cards && cards.map((card) => {
            return <Card key={card.id} name={card.name} hp={card.hp} attacks={card.attacks}/>
          })}
        </>
    )
}

export default FormField;