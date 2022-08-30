import FormSwitch from "components/form/switch";
import SelectInput from "components/ui/select";
import { LANGUAGES, UNITS } from "constants/settings";
import { useState } from "react";
import styles from "./preferences.module.scss";

type ToggleType = "grid" | "animations" | "hd" | "3d";

/** Contains all preference global settings. */
const Preferences = () => {
  const [language, setLanguage] = useState<string>("en");
  const [unit, setUnit] = useState<string>("metric");

  // Toggle states
  const [mapGridActive, setMapGridActive] = useState<boolean>(false);
  const [animationsActive, setAnimationsActive] = useState<boolean>(false);
  const [hdActive, setHdActive] = useState<boolean>(false);
  const [threeDActive, setThreeDActive] = useState<boolean>(false);

  /** Toggles and sets the checked state for map grid. */
  const handleGridChange = (checked: boolean, type: ToggleType) => {
    switch (type) {
      case "grid":
        setMapGridActive(checked);
        break;
      case "animations":
        setAnimationsActive(checked);
        break;
      case "hd":
        setHdActive(checked);
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
        onChange={checked => handleGridChange(checked, "grid")}
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
        onChange={checked => handleGridChange(checked, "hd")}
        isActive={hdActive}
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
