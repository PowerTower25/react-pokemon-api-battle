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
  const [card, setCard] = useState(null);
  const [opponentCard, setOpponentCard] = useState({ hp: 100 });
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
    
  }, [])

  const getNumberOfCards = (inputValue) => {
    setInputValue(inputValue);
  }

  const getCardType = (selectValue) => {
    setCardType(selectValue);
  }

  const handleAttackClick = (attack) => {
    setAttackDamage(attack)
    setOpponentCard(prev => ({ ...prev, hp: prev.hp - attack }));
  }
  
  const handleOpponentAttackClick = (attack) => {
    setOpponentAttackDamage(attack)
    setCard(prev => ({ ...prev, hp: prev.hp - attack }));
  }

const fetchRandomCard = async () => {
    setLoading(true);
    try {
      
    fetch('https://api.tcgdex.net/v2/en/cards')
      .then(response => response.json())
      .then(data => {
        // Select a random card from the list
        const randomCard = data[Math.floor(Math.random() * data.length)];
        // Fetch full details for the random card
        return fetch(`https://api.tcgdex.net/v2/en/cards/${randomCard.id}`);
      })
      .then(response => response.json())
      .then(data => setCard(data))
    } catch (error) {
      console.error("Error fetching card:", error);
    }
    setLoading(false);
  }

    return (
    <>
      {!card ? (<Form onInputChange={getNumberOfCards} onSelectChange={getCardType} handleClick={fetchRandomCard} text={loading ? 'Loading' : 'Get a card'}/>) : (<>
          {attackDamage ? (<p>You hit them for {attackDamage}!</p>) : null} 
          <div className="hand">
             {card.hp < 0 ? (<p className="text-align--center">You lose!</p>) : null}
          <Card key={card.id} name={card.name} hp={card.hp} attacks={card.attacks} onAttackClick={handleAttackClick}/>
          </div>

            {opponentCard &&
            <div>
            <h3>You're opponent!</h3>
             {opponentAttackDamage ? (<p>They hit you for {opponentAttackDamage}!</p>) : null}
             {opponentCard.hp < 0 ? (<p className="text-align--center">You win!</p>) : null}
             <Card name={opponentCard.name} hp={opponentCard.hp} attacks={opponentCard.attacks} onAttackClick={handleOpponentAttackClick} />

            </div>
            }
        </>)}

        
      

        </>
    )
}

export default FormField;