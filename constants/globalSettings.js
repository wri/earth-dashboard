import FormSwitch from "components/form/switch";
import { setSettingById, getSettingValueById } from "slices/globalSettings";

const globalSettings = [
  {
    id: "show-map-grid",
    props: {
      label: "Show Map Grid",
      isActiveSelector: () => getSettingValueById("show-map-grid"),
      setActive: () => setSettingById({ id: "show-map-grid", newState: true }),
      setInactive: () => setSettingById({ id: "show-map-grid", newState: false })
    },
    component: FormSwitch,
    initialState: false
  },
  {
    id: "animations",
    props: {
      label: "Animations",
      isActiveSelector: () => getSettingValueById("animations"),
      setActive: () => setSettingById({ id: "animations", newState: true }),
      setInactive: () => setSettingById({ id: "animations", newState: false })
    },
    component: FormSwitch,
    initialState: true
  },
  {
    id: "high-definition-mode",
    props: {
      label: "High Definition Mode",
      isActiveSelector: () => getSettingValueById("high-definition-mode"),
      setActive: () => setSettingById({ id: "high-definition-mode", newState: true }),
      setInactive: () => setSettingById({ id: "high-definition-mode", newState: false })
    },
    component: FormSwitch,
    initialState: false
  }
];

export default globalSettings;
