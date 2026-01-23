import { useEffect, useState } from "react";
import Card from "./components/card/Card";

const apiURL = "https://api.pokemontcg.io/v2/cards?pageSize=1&page=100"

  
function FormField() {
  const [cards, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const fetchRandomCard = async () => {
    setLoading(true);
    try {
      // Fetch a random page, assuming ~15k+ cards, 1 per page
      const randomPage = Math.floor(Math.random() * 1000) + 1;
      const response = await fetch(`https://api.pokemontcg.io/v2/cards?page=${randomPage}&pageSize=2`);
      const data = await response.json();
      setCard(data.data); // Set the first card from the result
      console.log(data.data)
    } catch (error) {
      console.error("Error fetching card:", error);
    }
    setLoading(false);
  }
    // useEffect(() => {
    //     // Define the function to fetch the data
    //     const fetchCards = async () => {

    //     };

    //     // Call the fetch function
    //     fetchCards();
    // }, []); 


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