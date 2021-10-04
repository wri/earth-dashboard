import FormSwitch from "components/form/switch";
import { setSettingById, getSettingValueById } from "slices/globalSettings";

export const ID = "animations";

const animationsSchema = {
  id: ID,
  props: {
    label: "Animations",
    isActiveSelector: () => getSettingValueById(ID),
    handleChange: checked => setSettingById({ id: ID, newState: checked })
  },
  component: FormSwitch
};

export default animationsSchema;