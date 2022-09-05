import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import FormSwitch from "components/form/switch";
import SelectInput from "components/ui/select";
import { LANGUAGES } from "constants/settings";
import { useState } from "react";
import { BasemapType, GlobalSetting } from "slices/globalSettings";
import styles from "./preferences.module.scss";

type ToggleType = "show-map-grid" | "animations" | "high-definition-mode" | "3d";

type PreferencesProps = {
  mapGridActive: boolean;
  animationsActive: boolean;
  highDefinitionActive: boolean;
  is2D: boolean;
  isMobile: boolean;
  setSettingById: ActionCreatorWithPayload<{ id: GlobalSetting; newState: boolean | BasemapType }, string>;
  setGlobe3d: ActionCreatorWithoutPayload<string>;
  setGlobe2d: ActionCreatorWithoutPayload<string>;
};

/** Contains all preference global settings. */
const Preferences = ({
  mapGridActive,
  animationsActive,
  highDefinitionActive,
  is2D,
  isMobile,
  setSettingById,
  setGlobe3d,
  setGlobe2d
}: PreferencesProps) => {
  const [language, setLanguage] = useState<{ value: string; label: string }>(LANGUAGES[0]);
  // const [unit, setUnit] = useState<{ value: string; label: string }>(UNITS[0]);

  /** Toggles and sets the new state for map grid. */
  const handleGridChange = (newState: boolean, type: ToggleType) => {
    switch (type) {
      case "show-map-grid":
        setSettingById({
          id: "showMapGrid",
          newState
        });
        break;
      case "animations":
        setSettingById({
          id: "showAnimations",
          newState
        });
        break;
      case "high-definition-mode":
        setSettingById({
          id: "showHighDefinition",
          newState
        });
        break;
      case "3d":
        is2D ? setGlobe3d() : setGlobe2d();
        break;
    }
  };

  return (
    <div className={styles["c-preferences"]}>
      <h3>Preferences</h3>

      {/* Languages */}
      {isMobile && (
        <div className={styles["c-preferences__language"]}>
          <h4>Language</h4>
          <SelectInput options={LANGUAGES} value={language} onChange={setLanguage} aria-label="Select a language" />
        </div>
      )}

      {/* Units */}
      {/* TODO: Blocked and waiting for client
        <div className={styles["c-preferences__unit"]}>
          <h4>Units</h4>
          <SelectInput options={UNITS} value={unit} onChange={setUnit} aria-label="Select a unit" />
        </div>
      */}

      {/* Map grid toggle */}
      <FormSwitch
        label="Show Map Grid"
        onChange={newState => handleGridChange(newState, "show-map-grid")}
        isActive={mapGridActive}
        className={styles["c-preferences__toggle--grid"]}
      />

      {/* Animations toggle */}
      <FormSwitch
        label="Animations"
        onChange={newState => handleGridChange(newState, "animations")}
        isActive={animationsActive}
        className={styles["c-preferences__toggle--animations"]}
      />

      {/* HD toggle */}
      <FormSwitch
        label="High Definition Mode"
        onChange={newState => handleGridChange(newState, "high-definition-mode")}
        isActive={highDefinitionActive}
        className={styles["c-preferences__toggle--hd"]}
      />

      {/* 3D toggle */}
      <FormSwitch
        label="3D"
        onChange={newState => handleGridChange(newState, "3d")}
        isActive={!is2D}
        className={styles["c-preferences__toggle--3d"]}
      />
    </div>
  );
};

export default Preferences;
