import axios from 'axios';

export const POSITION_STACK_URL = 'http://api.positionstack.com/v1/forward?access_key=daaabb1cd0abfc42d1bed27ca8e74a8e&query=';

export const getLocationForString = value =>
  axios.get(`${POSITION_STACK_URL}${value}`)
    .then(result => ({
      lat: result.latitude,
      lng: result.longitude
    }));
