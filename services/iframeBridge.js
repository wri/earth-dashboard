import { EarthClient } from "services/earthClient";
import * as Comlink from "comlink";

/**
 * @param {string} api
 * @param {number} version
 * @param {object} initialState
 * @returns {Promise<MessagePort>}
 */
const connect = ({ api, version, initialState, iframe }) => {
  const iframeURL = new URL(process.env.NULL_SCHOOL_IFRAME_BASE);

  return new Promise((resolve, reject) => {
    function listener({ data, origin, source, ports }) {
      if (origin !== iframeURL.origin || source !== iframe.contentWindow) {
        return;
      }
      window.removeEventListener("message", listener);
      if (data.success === true) {
        resolve(ports[0]);
      } else {
        reject(data);
      }
    }

    window.addEventListener("message", listener);
    const req = { action: "connect", api, version, initialState };
    iframe.contentWindow.postMessage(req, iframeURL.origin);
  });
};

export const getEarthServer = async iframe => {
  const initialState = {
    animation_enabled: false,
    overlay_type: "temp"
  };

  try {
    const port = await connect({ api: "earth", version: 1, initialState, iframe });
    const server = Comlink.wrap(port);
    Comlink.expose(new EarthClient(), port);
    return server;
  } catch (err) {
    console.log("Failed to connect to iframe", err);
  }
};
