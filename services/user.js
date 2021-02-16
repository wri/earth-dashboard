// utils
import { logger } from 'utils/logs';
import { WRIAPI } from 'utils/axios';

const isServer = typeof window === 'undefined';

/**
 * Logs in a user based on the email + password combination
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#login-email-password|here}
 * @param {Object} options
 * @returns {Object}
 */
export const checkAuth = () => {
  logger.info('Check user logged in');
  return WRIAPI
    .get('/auth/check-logged', {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${!isServer && localStorage.getItem('userToken')}`
      }
    })
    .then(response => response.data);
};


/**
 * Logs in a user based on the email + password combination
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#login-email-password|here}
 * @param {Object} options
 * @returns {Object}
 */
export const loginUser = ({ email, password }) => {
  logger.info('Login user');
  return WRIAPI
    .post('/auth/login', { email, password })
    .then(response => response.data);
};

/**
 * Logs out the user that's currently logged in (if any)
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#login-email-password|here}
 * @returns {Object}
 */
export const logoutUser = () => {
  logger.info('Logout user');
  return WRIAPI
    .get('/auth/logout')
    .then((response) => {
      if (response.status < 400 && !isServer) {
        localStorage.removeItem('userToken');
        window.location.reload();
      }
    });
};

export default {
  loginUser,
  logoutUser,
  checkAuth
};
