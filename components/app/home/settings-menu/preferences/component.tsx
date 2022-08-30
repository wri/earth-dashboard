import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import FormSwitch from "components/form/switch";
import SelectInput from "components/ui/select";
import { LANGUAGES, UNITS } from "constants/settings";
import { useState } from "react";
import { GlobalSetting } from "slices/globalSettings";
import styles from "./preferences.module.scss";

type ToggleType = "show-map-grid" | "animations" | "high-definition-mode" | "3d";

type PreferencesProps = {
  mapGridActive: boolean;
  animationsActive: boolean;
  highDefinitionActive: boolean;
  setSettingById: ActionCreatorWithPayload<{ id: GlobalSetting; checked: boolean }, string>;
};

/** Contains all preference global settings. */
const Preferences = ({ mapGridActive, animationsActive, highDefinitionActive, setSettingById }: PreferencesProps) => {
  const [language, setLanguage] = useState<string>("en");
  const [unit, setUnit] = useState<string>("metric");

  // Toggle states
  const [threeDActive, setThreeDActive] = useState<boolean>(false);

  /** Toggles and sets the checked state for map grid. */
  const handleGridChange = (checked: boolean, type: ToggleType) => {
    switch (type) {
      case "show-map-grid":
        setSettingById({
          id: "show-map-grid",
          checked
        });
        break;
      case "animations":
        setSettingById({
          id: "animations",
          checked
        });
        break;
      case "high-definition-mode":
        setSettingById({
          id: "high-definition-mode",
          checked
        });
        break;
      case "3d":
        setThreeDActive(checked);
        break;
    }
  };

  return (
    <div className={styles["c-preferences"]}>
      <h3>Preferences</h3>

      {/* Languages */}
      <div className={styles["c-preferences__language"]}>
        <h4>Language</h4>
        <SelectInput
          options={LANGUAGES}
          value={LANGUAGES.find(option => option.value === language)}
          onChange={setLanguage}
          aria-label="Select a language"
        />
      </div>

      {/* Units */}
      <div className={styles["c-preferences__unit"]}>
        <h4>Units</h4>
        <SelectInput
          options={UNITS}
          value={UNITS.find(option => option.value === unit)}
          onChange={setUnit}
          aria-label="Select a unit"
        />
      </div>

      {/* Map grid toggle */}
      <FormSwitch
        label="Show Map Grid"
        onChange={checked => handleGridChange(checked, "show-map-grid")}
        isActive={mapGridActive}
        className={styles["c-preferences__toggle--grid"]}
      />

      {/* Animations toggle */}
      <FormSwitch
        label="Animations"
        onChange={checked => handleGridChange(checked, "animations")}
        isActive={animationsActive}
        className={styles["c-preferences__toggle--animations"]}
      />

      {/* HD toggle */}
      <FormSwitch
        label="High Definition Mode"
        onChange={checked => handleGridChange(checked, "high-definition-mode")}
        isActive={highDefinitionActive}
        className={styles["c-preferences__toggle--hd"]}
      />

      {/* 3D toggle */}
      <FormSwitch
        label="3D"
        onChange={checked => handleGridChange(checked, "3d")}
        isActive={threeDActive}
        className={styles["c-preferences__toggle--3d"]}
      />
    </div>
  );
};

export default Preferences;
