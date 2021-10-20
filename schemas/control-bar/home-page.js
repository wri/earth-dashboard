import settings from "constants/control-bar/controls/settings";
import location from "constants/control-bar/controls/location";
import getZoomIn from "constants/control-bar/controls/zoom-in";
import getZoomOut from "constants/control-bar/controls/zoom-out";
import projectionType from "constants/control-bar/controls/projection-type";

const getHomePageControlBarItems = earthServer => [
  getZoomIn(earthServer),
  getZoomOut(earthServer),
  location,
  projectionType,
  settings
];

export default getHomePageControlBarItems;
