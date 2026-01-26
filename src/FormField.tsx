import { useEffect, useState } from "react";
import Card from "./components/card/Card";
import TCGdex from '@tcgdex/sdk'

const apiURL = "https://api.pokemontcg.io/v2/cards?pageSize=1&page=100"

  
function FormField() {
  const [cards, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


const fetchRandomCard = async () => {
  const tcgdex = new TCGdex('en');
    setLoading(true);
    try {
      
// TCGdex provides a full card list endpoint
      const response = await fetch('https://api.tcgdex.net/v2/en/cards');
      const allCards = await response.json();
      
      // Shuffle and pick 3
      const shuffled = [...allCards].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      
      // Fetch detailed info for each card (includes attacks)
      const detailedCards = await Promise.all(
        selected.map(card => 
          fetch(`https://api.tcgdex.net/v2/en/cards/${card.id}`).then(res => res.json())
        )
      )
      setCard(detailedCards); // Set the 3 cards
    } catch (error) {
      console.error("Error fetching card:", error);
    }
    setLoading(false);
  }


    return (
        <>
        <button onClick={fetchRandomCard}>{loading ? 'Loading' : 'Get a card'}</button>

          {cards && cards.map((card) => {
            return <Card key={card.id} name={card.name} hp={card.hp} attacks={card.attacks}/>
          })}
        </>
    )
}

export default FormField;