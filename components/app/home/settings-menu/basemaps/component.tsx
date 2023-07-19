import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import RadioImage from "components/form/radio-image";
import Icon from "components/ui/Icon";
import geographyImage from "public/static/images/basemaps/geography-basemap-thumbnail.webp";
import simpleImage from "public/static/images/basemaps/simple-basemap-thumbnail.webp";
import { BasemapType, GlobalSetting } from "slices/globalSettings";
import styles from "./basemaps.module.scss";
import { format } from "date-fns";

type BasemapsProps = {
  activeOptionId: string;
  currentDate?: Date;
  setSettingById: ActionCreatorWithPayload<{ id: GlobalSetting; newState: boolean | BasemapType }, string>;
  setIsDatePickerOpen: ActionCreatorWithPayload<boolean, string>;
};

/** Options for basemap image selection. */
const Basemaps = ({ activeOptionId, currentDate, setSettingById, setIsDatePickerOpen }: BasemapsProps) => {
  /** Updates the redux store with new value. */
  const handleChange = (id: string) => {
    setSettingById({
      id: "basemap",
      newState: id as BasemapType
    });
  };

  /** Opens the date data picker. */
  const handleDateClick = () => {
    setIsDatePickerOpen(true);
  };

  return (
    <div className={styles["c-basemaps"]}>
      {/* Basemap selector */}
      <RadioImage
        name="basemaps"
        label="Basemaps & Data"
        options={[
          { id: "geography", label: "Geography", image: geographyImage },
          { id: "simple", label: "Simple", image: simpleImage }
        ]}
        activeOptionId={activeOptionId}
        onChange={handleChange}
        className={styles["c-basemaps__selector"]}
      />

      {/* Data date selector */}
      <div className={styles["c-basemaps__data"]}>
        <p className={styles["c-basemaps__data__label"]}>Showing Data For:</p>
        <button onClick={handleDateClick}>
          <span>{format(currentDate ?? new Date(), "yyyy-MM-dd")}</span>
          <div className={styles["icon"]}>
            <Icon name="chevron-down" size={12} type="decorative" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Basemaps;
