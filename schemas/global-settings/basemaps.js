import RadioImage from "components/form/radio-image";
import { setSettingById, getSettingValueById } from "slices/globalSettings";
import imageTest from "public/static/images/star-background.jpg";

export const ID = "basemaps";

const basemapsSchema = {
  id: ID,
  props: {
    name: ID,
    label: "Basemaps",
    options: [
      { id: "default", label: "Default", image: imageTest },
      { id: "geography", label: "Geography", image: imageTest }
    ],
    getSelectedOption: () => getSettingValueById(ID),
    handleChange: id => setSettingById({ id: ID, newState: id })
  },
  component: RadioImage,
  initialState: "default"
};

export default basemapsSchema;
