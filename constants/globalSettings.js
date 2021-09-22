import FormSwitch from "components/form/switch";
import RadioImage from "components/form/radio-image";
import { setSettingById, getSettingValueById } from "slices/globalSettings";
import imageTest from "public/static/images/star-background.png";

const globalSettings = [
  {
    id: "show-map-grid",
    props: {
      label: "Show Map Grid",
      isActiveSelector: () => getSettingValueById("show-map-grid"),
      handleChange: checked => setSettingById({ id: "show-map-grid", newState: checked })
    },
    component: FormSwitch,
    initialState: false
  },
  {
    id: "animations",
    props: {
      label: "Animations",
      isActiveSelector: () => getSettingValueById("animations"),
      handleChange: checked => setSettingById({ id: "animations", newState: checked })
    },
    component: FormSwitch,
    initialState: true
  },
  {
    id: "high-definition-mode",
    props: {
      label: "High Definition Mode",
      isActiveSelector: () => getSettingValueById("high-definition-mode"),
      handleChange: checked => setSettingById({ id: "high-definition-mode", newState: checked })
    },
    component: FormSwitch,
    initialState: false
  },
  {
    id: "basemaps",
    component: RadioImage,
    props: {
      name: "basemaps",
      label: "Basemaps",
      options: [
        { id: "default", label: "Default", image: imageTest },
        // PLACEHOLDER TEXT
        { id: "placeholder", label: "Lorem ipsum", image: imageTest }
      ],
      getSelectOption: () => getSettingValueById("basemaps"),
      handleChange: id => setSettingById({ id: "basemaps", newState: id })
    },
    initialState: "default"
  }
];

export default globalSettings;
