import settings from "constants/control-bar/controls/settings";
import location from "constants/control-bar/controls/location";
import getZoomIn from "constants/control-bar/controls/zoom-in";
import getZoomOut from "constants/control-bar/controls/zoom-out";

const getHomePageControlBarItems = earthServer => [getZoomIn(earthServer), getZoomOut(earthServer), location, settings];

export default getHomePageControlBarItems;
