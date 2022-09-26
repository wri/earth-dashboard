// Set this to true if you wish to debug Google Analytics in a non production
// environment for example on localhost
export const DEBUG = process.env.GA4_DEBUG === "true" || false;

export const GA_TRACKING_ID = process.env.GA4_ID;
import { ANALYTICS_ACCEPTED } from "../layout/layout/layout-app/constants";

// Check if Analytics data collection is permitted.
const allowAnalytics = () => localStorage.getItem(ANALYTICS_ACCEPTED) === "true";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
  console.log(`pageView, env: ${process.env.ED_NODE_ENV}`);
  if (process.env.ED_NODE_ENV === "production" && allowAnalytics()) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const logEvent = ({ action, category, label, value }) => {
  if (process.env.ED_NODE_ENV === "production" && allowAnalytics()) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value
    });
  } else {
    console.log(`GA event: ${action} - ${category} - ${label} - ${value}`);
  }
};

/**
 * Will fire the event using the dataLayer array from Tag Manager
 * Or, if not in production will log the payload to the console.
 *
 * @param {String} eventName
 *        The event name that is recognised by Tag Manager,
 *         either a default event or a custom one
 * @param {String | null} param
 *        The extra dataLayer param that can be passed along with each Tag
 * @param {...Object} rest
 *        Any extra params that need to be passed along with the event
 */
export const fireEvent = (eventName, param, ...rest) => {
  if (!eventName) {
    console.log("An Event name is required to fire a GA Event");
  }

  const payload = Object.assign(
    rest.reduce((o, e) => ({ ...o, ...e }), {}),
    param && { param: param },
    { event: eventName }
  );
  let hasFired = false;

  if ((process.env.ED_NODE_ENV === "production" && allowAnalytics()) || DEBUG) {
    window.dataLayer?.push(payload);
    hasFired = true;
  }

  if (!hasFired || DEBUG) {
    console.log("GA Event", payload);
  }
};
