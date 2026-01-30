import { useEffect, useState } from "react";
import Card from "./components/card/Card";
import TCGdex from '@tcgdex/sdk'
import tcgdexApi from "./api/tcg-dex"
import Form from "./components/form/Form";

function FormField() {
  const [attackDamage, setAttackDamage] = useState(null);
  const [opponentAttackDamage, setOpponentAttackDamage] = useState(null)
  const [cardType, setCardType] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [cards, setCard] = useState(null);
  const [opponentCard, setOpponentCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchOpponentCard = async () => {
    const tcgdex = await new TCGdex('en'); 
      try {
        // Fetch random card using SDK
        const randomCard = await tcgdex.random.card();
       setOpponentCard(randomCard);

      } catch (error) {
        console.error('Error fetching card:', error);
      }
    }


    fetchOpponentCard();
    console.log(opponentCard)
  }, [])

  const getNumberOfCards = (inputValue) => {
    setInputValue(inputValue);
  }

  const getCardType = (selectValue) => {
    setCardType(selectValue);
  }

  const handleAttackClick = (attack) => {
    setAttackDamage(attack)
    opponentCard.hp = opponentCard.hp - attack;
  }
  
  const handleOpponentAttackClick = (attack) => {
    setOpponentAttackDamage(attack)
  }

const fetchRandomCard = async () => {
    setLoading(true);
    try {
      
      // TCGdex provides a full card list endpoint
      const response = await fetch(`https://api.tcgdex.net/v2/en/cards?types=eq:${cardType}`);
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
      setCard(detailedCards); // Set cards data
    } catch (error) {
      console.error("Error fetching card:", error);
    }
    setLoading(false);
  }

    return (
        <>
{!cards ? (
        // Wrap multiple elements in a React Fragment
<Form onInputChange={getNumberOfCards} onSelectChange={getCardType} handleClick={fetchRandomCard} text={loading ? 'Loading' : 'Get a card'}/>
      ) : (
        // The false branch can also have multiple elements
        <>
          {attackDamage ? (<p>You hit them for {attackDamage}!</p>) : null} 
          <div className="hand">
            
            {cards && cards.map((card) => {
              return <Card key={card.id} name={card.name} hp={card.hp} attacks={card.attacks} onAttackClick={handleAttackClick}/>
            })}
          </div>

            {opponentCard &&
            <div>
            <h3>You're opponent!</h3>
             {opponentAttackDamage ? (<p>They hit you for {opponentAttackDamage}!</p>) : null}
             {opponentCard.hp > 0 ? (<Card name={opponentCard.name} hp={opponentCard.hp} attacks={opponentCard.attacks} onAttackClick={handleOpponentAttackClick} />) : (<p className="text-align--center">You win!</p>)}

            </div>
            }
        </>
      )}
      

        </>
    )
}

export default FormField;