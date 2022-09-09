import FormSwitch from "components/form/switch";
import styles from "./cookie-preferences.module.scss";

/** Contains all preference global settings. */
const CookiePreferences = () => {
  return (
    <div className={styles["c-preferences"]}>
      <h3>Preferences</h3>

      {/* Analytics toggle */}
      <FormSwitch
        label="Analytics"
        onChange={() => console.log("")}
        isActive={true}
        className={styles["c-preferences__toggle--analytics"]}
      />

      {/* Cookies toggle */}
      <FormSwitch
        label="Cookies"
        onChange={() => console.log("")}
        isActive={true}
        className={styles["c-preferences__toggle--cookies"]}
      />
    </div>
  );
};

export default CookiePreferences;
