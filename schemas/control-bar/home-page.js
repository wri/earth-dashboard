import settings from "constants/control-bar/controls/settings";
import location from "constants/control-bar/controls/location";
import getZoomIn from "constants/control-bar/controls/zoom-in";
import getZoomOut from "constants/control-bar/controls/zoom-out";
import projectionTypeToggle from "constants/control-bar/controls/projectionTypeToggle";

const getHomePageControlBarItems = earthServer => [
  getZoomIn(earthServer),
  getZoomOut(earthServer),
  location,
  projectionTypeToggle,
  settings
];

export default getHomePageControlBarItems;
