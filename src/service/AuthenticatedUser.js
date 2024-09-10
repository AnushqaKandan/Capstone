import axios from 'axios';

// Function to set the authorization token for requests
export function applyToken(token) {
  if (token) {
    axios.defaults.headers= {
      Authorization: `${token}`};
  } 
}
