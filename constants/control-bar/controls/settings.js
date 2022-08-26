import { setSettingsOpen, setSettingsClose, isSettingsOpen } from "slices/mapControls";

const settingsControlConfig = {
  key: "settings",
  name: "cog",
  isActiveSelector: isSettingsOpen,
  getDispatch: isActive => (isActive ? setSettingsClose : setSettingsOpen),
  disabled: false,
  "aria-label": "Settings"
};

export default settingsControlConfig;
