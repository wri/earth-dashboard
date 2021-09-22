import { setSettingsOpen, setSettingsClose, isSettingsOpen } from "slices/controlBar";

const settingsControlConfig = {
  id: "settings",
  src: "cog.svg",
  isActiveSelector: isSettingsOpen,
  setActive: setSettingsOpen,
  setInactive: setSettingsClose
};

export default settingsControlConfig;
