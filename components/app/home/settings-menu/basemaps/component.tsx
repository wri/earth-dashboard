import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import RadioImage from "components/form/radio-image";
import geographyImage from "public/static/images/basemaps/geography-basemap-thumbnail.png";
import simpleImage from "public/static/images/basemaps/simple-basemap-thumbnail.png";
import { BasemapType, GlobalSetting } from "slices/globalSettings";

type BasemapsProps = {
  activeOptionId: string;
  setSettingById: ActionCreatorWithPayload<{ id: GlobalSetting; newState: boolean | BasemapType }, string>;
};

/** Options for basemap image selection. */
const Basemaps = ({ activeOptionId, setSettingById }: BasemapsProps) => {
  /** Updates the redux store with new value. */
  const handleChange = (id: string) => {
    setSettingById({
      id: "basemap",
      newState: id as BasemapType
    });
  };

  return (
    <RadioImage
      name="basemaps"
      label="Basemaps"
      options={[
        { id: "geography", label: "Geography", image: geographyImage },
        { id: "simple", label: "Simple", image: simpleImage }
      ]}
      activeOptionId={activeOptionId}
      onChange={handleChange}
    />
  );
};

export default Basemaps;
