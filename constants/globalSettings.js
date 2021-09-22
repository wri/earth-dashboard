import FormSwitch from "components/form/switch";
import { setSettingById, getSettingValueById } from "slices/globalSettings";

const globalSettings = [
  {
    id: "show-map-grid",
    props: {
      label: "Show Map Grid",
      isActiveSelector: () => getSettingValueById("show-map-grid"),
      getDispatch: (isActive) => () => setSettingById({ id: "show-map-grid", newState: !isActive })
    },
    component: FormSwitch,
    initialState: false
  },
  {
    id: "animations",
    props: {
      label: "Animations",
      isActiveSelector: () => getSettingValueById("animations"),
      getDispatch: (isActive) => () => setSettingById({ id: "show-map-grid", newState: !isActive })
    },
    component: FormSwitch,
    initialState: true
  },
  {
    id: "high-definition-mode",
    props: {
      label: "High Definition Mode",
      isActiveSelector: () => getSettingValueById("high-definition-mode"),
      getDispatch: (isActive) => () => setSettingById({ id: "show-map-grid", newState: !isActive })
    },
    component: FormSwitch,
    initialState: false
  }
];

export default globalSettings;
