import FormSwitch from "components/form/switch";
import { setSettingById, getSettingValueById } from "slices/globalSettings";

export const ID = "high-definition-mode";

const highDefinitionModeSchema = {
  id: ID,
  props: {
    label: "High Definition Mode",
    isActiveSelector: () => getSettingValueById(ID),
    handleChange: checked => setSettingById({ id: ID, newState: checked })
  },
  component: FormSwitch
};

export default highDefinitionModeSchema;