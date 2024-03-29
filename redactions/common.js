const SET_LOCALE = "common/SET_LOCALE";
const SET_EMBED = "common/SET_EMBED";
const SET_WEBSHOT = "common/SET_WEBSHOT";
const SET_IS_LOADED_EXTERNALY = "common/SET_IS_LOADED_EXTERNALY";
const SET_IS_SERVER = "common/SET_IS_SERVER";
const SET_HOSTNAME = "common/SET_HOSTNAME";

const initialState = {
  locale: "en",
  embed: false,
  webshot: false,
  isLoadedExternally: false,
  isServer: true,
  hostname: "https://earthhq.org"
};

export default function Common(state = initialState, action) {
  switch (action.type) {
    case SET_LOCALE:
      return Object.assign({}, state, { locale: action.payload });

    case SET_EMBED:
      return Object.assign({}, state, { embed: action.payload });

    case SET_WEBSHOT:
      return Object.assign({}, state, { webshot: action.payload });

    case SET_IS_LOADED_EXTERNALY:
      return Object.assign({}, state, { isLoadedExternally: action.payload });

    case SET_IS_SERVER:
      return Object.assign({}, state, { isServer: action.payload });

    case SET_HOSTNAME:
      return Object.assign({}, state, { hostname: action.payload });

    default:
      return state;
  }
}

/**
 * Set the locale of the app (used by the API)
 * NOTE: doesn't not change the language of the app, only
 * Transifex can do so
 * @param {string} locale Two-letter locale
 */
export function setLocale(locale) {
  return {
    type: SET_LOCALE,
    payload: locale
  };
}

/**
 * Set if we are on an embed or not
 * @param {boolean} embed Two-letter locale
 */
export function setEmbed(embed) {
  return {
    type: SET_EMBED,
    payload: embed
  };
}

/**
 * Set if we are on webshot mode or not
 * @param {boolean} webshot
 */
export function setWebshotMode(webshot) {
  return {
    type: SET_WEBSHOT,
    payload: webshot
  };
}

/**
 * Set if we are on an embed or not
 * @param {boolean} embed Two-letter locale
 */
export function setIsLoadedExternaly(isLoadedExternally) {
  return {
    type: SET_IS_LOADED_EXTERNALY,
    payload: isLoadedExternally
  };
}

/**
 * Set if we are on the server side or not
 * @param {boolean} isServer boolean
 */
export function setIsServer(isServer) {
  return {
    type: SET_IS_SERVER,
    payload: isServer
  };
}

/**
 * Set hostname
 * @param {string} hostname
 */
export function setHostname(hostname) {
  return {
    type: SET_HOSTNAME,
    payload: hostname
  };
}
