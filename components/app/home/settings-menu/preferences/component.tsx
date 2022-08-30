import FormSwitch from "components/form/switch";
import SelectInput from "components/ui/select";
import { LANGUAGES, UNITS } from "constants/settings";
import { useState } from "react";
import styles from "./preferences.module.scss";

/** Contains all preference global settings. */
const Preferences = () => {
  const [language, setLanguage] = useState<string>("en");
  const [unit, setUnit] = useState<string>("metric");
  const [mapGridActive, setMapGridActive] = useState<boolean>(false);

  /** Toggles and sets the checked state for map grid. */
  const handleGridChange = (checked: boolean) => {
    setMapGridActive(checked);
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

      <FormSwitch label="Show Map Grid" onChange={handleGridChange} isActive={mapGridActive} />
    </div>
  );
};

export default Preferences;
