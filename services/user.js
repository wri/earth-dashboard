// utils
import { logger } from 'utils/logs';
import { controlTowerAPI } from 'utils/axios';

const isServer = typeof window === 'undefined';

/**
 * Logs in a user based on the email + password combination
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#login-email-password|here}
 * @param {Object} options
 * @returns {Object}
 */
export const checkAuth = () => {
  logger.info('Check user logged in');
  return controlTowerAPI
    .get('auth/check-logged', {
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
  return controlTowerAPI
    .post('auth/login', { email, password })
    .then(response => response.data);
};

/**
 * Logs out the user that's currently logged in (if any)
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#login-email-password|here}
 * @returns {Object}
 */
export const logoutUser = () => {
  logger.info('Logout user');
  return controlTowerAPI
    .get('auth/logout')
    .then((response) => {
      if (response.status < 400 && !isServer) {
        localStorage.removeItem('userToken');
        window.location.reload();
      } 
    });
};

/**
 * This function sends a request to reset the user's password.
 * It generates a token to be used in resetPassword
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#password-recovery|here}
 * @param {Object} options
 * @returns {Object}
 */
export const forgotPassword = ({ email }) => {
  logger.info('Forgot password');
  return controlTowerAPI
    .post('auth/reset-password', { email }, { params: { origin: process.env.APPLICATIONS } })
    .then(response => response.data)
    .catch(({ response }) => {
      const { status, statusText } = response;

      if (status >= 300) {
        logger.error(`Error requesting token for password reset: ${status}: ${statusText}`);
        throw new Error(`Error requesting token for password reset: ${status}: ${statusText}`);
      }
    });
};

/**
 * Register a new user based on the email + password combination
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#registration|here}
 * @param {Object} options
 * @returns {Object}
 */
export const registerUser = ({ email, password, repeatPassword }) => {
  logger.info('Register user');
  return controlTowerAPI
    .post(
      `auth/sign-up?origin=${process.env.APPLICATIONS}`,
      {
        email,
        password,
        repeatPassword,
        apps: [process.env.APPLICATIONS]
      }
    )
    .then(response => response.data)
    .catch(({ response }) => {
      const { status, statusText } = response;
      logger.error(`Error registering user: ${status}: ${statusText}`);
      throw new Error(`Error registering user: ${status}: ${statusText}`);
    });
};

/**
 * Resets the user's password.
 * Needs the token hosted in the email sent in forgotPassword
 * NOTE:this is NOT implemented in the API to be done from the app.
 * right now the only way it's through the email link pointing to Control Tower.
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#password-recovery|here}
 * @param {Object} options
 * @returns {Object}
 */
export const resetPassword = ({ tokenEmail, password, repeatPassword }) => {
  logger.info('Reset password');
  return controlTowerAPI
    .post(
      `auth/reset-password/${tokenEmail}?origin=${process.env.APPLICATIONS}`,
      { password, repeatPassword }
    )
    .then(response => response.data)
    .catch(({ response }) => {
      const { status, statusText } = response;
      logger.error(`Error resetting user password: ${status}: ${statusText}`);
      throw new Error(`Error resetting user password: ${status}: ${statusText}`);
    });
};

export default {
  loginUser,
  forgotPassword,
  registerUser,
  resetPassword
};
