import RadioImage from "components/form/radio-image";
import { setSettingById, getSettingValueById } from "slices/globalSettings";
import geographyImage from "public/static/images/basemaps/geography-basemap-thumbnail.webp";
import simpleImage from "public/static/images/basemaps/simple-basemap-thumbnail.webp";

export const ID = "basemaps";

const basemapsSchema = {
  id: ID,
  props: {
    name: ID,
    label: "Basemaps",
    options: [
      { id: "geography", label: "Geography", image: geographyImage },
      { id: "simple", label: "Simple", image: simpleImage }
    ],
    getSelectedOption: () => getSettingValueById(ID),
    handleChange: id => setSettingById({ id: ID, newState: id })
  },
  component: RadioImage
};

export default basemapsSchema;
