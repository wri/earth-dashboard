import { setSettingsOpen, setSettingsClose, isSettingsOpen } from "slices/controlBar";

export default {
  id: "settings",
  src: "cog.svg",
  isActiveSelector: isSettingsOpen,
  setActive: setSettingsOpen,
  setInactive: setSettingsClose,
};
