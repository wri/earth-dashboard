import { setSettingsOpen, setSettingsClose, isSettingsOpen } from "slices/controlBar";
import cogIcon from "public/static/icons/cog.svg";

const settings = {
  key: "settings",
  image: cogIcon,
  isActiveSelector: isSettingsOpen,
  getDispatch: isActive => (isActive ? setSettingsClose : setSettingsOpen),
  disabled: false,
  "aria-label": "Settings"
};

export default settings;
