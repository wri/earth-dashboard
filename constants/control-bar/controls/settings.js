import { setSettingsOpen, setSettingsClose, isSettingsOpen } from "slices/mapControls";
import cogIcon from "public/static/icons/cog.svg";

const settingsControlConfig = {
  key: "settings",
  icon: cogIcon,
  isActiveSelector: isSettingsOpen,
  getDispatch: isActive => (isActive ? setSettingsClose : setSettingsOpen),
  disabled: false,
  "aria-label": "Settings"
};

export default settingsControlConfig;
