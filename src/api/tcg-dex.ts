import axios from 'axios';
export const tcgdexApi = axios.create({
  baseURL: 'https://api.tcgdex.net',
    headers: {
    'Content-Type': 'application/json',
  },
});

// Export functions for specific API calls
export const getCards = () => {
  return tcgdexApi.get('/v2/en/cards');
};

export default tcgdexApi;