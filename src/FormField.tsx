import { useEffect, useState } from "react";
import Card from "./components/card/Card";
import TCGdex from '@tcgdex/sdk'
import tcgdexApi from "./api/tcg-dex"
import Form from "./components/form/Form";


  
function FormField() {
  const [attackDamage, setAttackDamage] = useState(null);
  const [opponentAttackDamage, setOpponentAttackDamage] = useState(null)
  const [inputValue, setInputValue] = useState('');
  const [cards, setCard] = useState([]);
  const [opponentCard, setOpponentCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  async function fetchOpponentCard() {
    const tcgdex = new TCGdex('en'); 
      try {
        // Fetch random card using SDK
        const randomCard = await tcgdex.random.card();
        setOpponentCard(randomCard);
      } catch (error) {
        console.error('Error fetching card:', error);
      }
    }

  const handleInputChangeInParent = (valueFromChild) => {
    setInputValue(valueFromChild);
  }

  const handleAttackClick = (attack) => {
    setAttackDamage(attack)
  }
  
  const handleOpponentAttackClick = (attack) => {
    setOpponentAttackDamage(attack)
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
      await fetchOpponentCard();
    } catch (error) {
      console.error("Error fetching card:", error);
    }
    setLoading(false);
  }

    return (
        <>
      <Form onInputChange={handleInputChangeInParent} handleClick={fetchRandomCard} text={loading ? 'Loading' : 'Get a card'}/>
          <p> You hit for {attackDamage}</p>
          <div className="hand">
            
            {cards && cards.map((card) => {
              return <Card key={card.id} name={card.name} hp={card.hp} attacks={card.attacks} onAttackClick={handleAttackClick}/>
            })}
          </div>

            {opponentCard &&
            <div>
            <h3>You're opponent!</h3>
             {opponentAttackDamage ? (<p>They hit you for {opponentAttackDamage}!</p>) : null} 
            <Card name={opponentCard.name} hp={opponentCard.hp} attacks={opponentCard.attacks} onAttackClick={handleOpponentAttackClick} />
            </div>
            }
        </>
    )
}

export default FormField;