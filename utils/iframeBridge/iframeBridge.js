import { EarthClient } from "./earthClient";
import * as Comlink from "comlink";
import * as d3 from "utils/d3";
import uuid from "react-uuid";
import basemaps from "constants/basemaps";

const CONNECTION_TIMEOUT = 5000;

/**
 * @param {string} api
 * @param {number} version
 * @param {object} initialState
 * @returns {Promise<MessagePort>}
 */
const connect = ({ api, version, initialState, iframe }) => {
  const iframeURL = new URL(process.env.NULL_SCHOOL_IFRAME_BASE);
  const id = uuid();

  return new Promise((resolve, reject) => {
    function listener({ data, origin, source, ports }) {
      if (origin !== iframeURL.origin || source !== iframe.contentWindow) {
        return; // ignore message not from the iframe
      }

      if (data.api !== api || data.id !== id) {
        return; // ignore message that isn't a response to the connection attempt
      }

      window.removeEventListener("message", listener);

      if (data.success === true) {
        resolve(ports[0]);
      } else {
        reject(data);
      }
    }

    window.addEventListener("message", listener);

    setTimeout(() => {
      reject("Timeout on connecting to iframe window");
      window.removeEventListener("message", listener);
    }, CONNECTION_TIMEOUT);

    const req = { action: "connect", api, version, initialState, id };
    iframe.contentWindow.postMessage(req, iframeURL.origin);
  });
};

export const getEarthServer = async (iframe, windowWidth, createEarthClient) => {
  // Clamp size of initial earth.
  // Between 200 -> 768
  const scale = Math.min(Math.max((windowWidth * 0.4) / 2, 150), 768);

  const initialState = {
    animation_enabled: false,
    overlay_type: "temp",
    orientation: { scale },
    map_scene: basemaps["geography"]
  };

  try {
    const port = await connect({ api: "net.nullschool.earth", version: 1, initialState, iframe });
    const server = Comlink.wrap(port);
    const client = createEarthClient ? createEarthClient() : new EarthClient();
    Comlink.expose(client, port);

    const initialStateResp = await server.getState();
    client.state = initialStateResp;

    return { server, client };
  } catch (err) {
    console.log("Failed to connect to iframe", err);
    throw err;
  }
};

export const reorientController = (button, cb) => {
  let zoomAction;

  function action() {
    cb();
    zoomAction = setTimeout(action, 25);
  }

  const zoomBehavior = d3
    .zoom()
    .on("start", action)
    .on("end", () => clearTimeout(zoomAction));

  button.call(zoomBehavior).on("dblclick.zoom", null).on("wheel.zoom", null);
};
