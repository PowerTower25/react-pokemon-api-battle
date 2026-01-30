const BASE_URL = 'https://api.tcgdex.net/v2/en'
export const fetchCards = async (cardType) => {
  try {
    const response = await fetch(`${BASE_URL}/cards?types=eq:${cardType}`)
    if (!response.ok) throw new Error("Failed to fetch Card")
    const data = await response.json()

    if (!data.length) throw new Error("No card found")
    const randomCard = data[Math.floor(Math.random() * data.length)];
    const cardResponse = await fetch(`https://api.tcgdex.net/v2/en/cards/${randomCard.id}`);

    if (!cardResponse) throw new Error("Failed to get card details")
    const cardData = await cardResponse.json()
    return cardData;
  } catch (error) {
    console.log('Error in fetchCards:', error)
    throw error
  }
}

export default fetchCards;