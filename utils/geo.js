import axios from 'axios';

export const POSITION_STACK_URL = 'http://api.positionstack.com/v1/forward';

const POSITION_STACK_API = axios.create({
  baseURL: POSITION_STACK_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const getLocationForString = value =>
  POSITION_STACK_API.get(`/?access_key=daaabb1cd0abfc42d1bed27ca8e74a8e&query=${value}`)
    .then(result => ({
      lat: result.latitude,
      lng: result.longitude
    }));
