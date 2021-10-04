import FormSwitch from "components/form/switch";
import { setSettingById, getSettingValueById } from "slices/globalSettings";

export const ID = "show-map-grid";

const showMapGridSchema = {
  id: ID,
  props: {
    label: "Show Map Grid",
    isActiveSelector: () => getSettingValueById(ID),
    handleChange: checked => setSettingById({ id: ID, newState: checked })
  },
  component: FormSwitch
};

export default showMapGridSchema;