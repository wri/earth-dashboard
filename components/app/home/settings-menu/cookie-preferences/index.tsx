import FormSwitch from "components/form/switch";
import { ANALYTICS_ACCEPTED } from "layout/layout/layout-app/constants";
import { useEffect, useState } from "react";
import styles from "./cookie-preferences.module.scss";

/** Contains all preference global settings. */
const CookiePreferences = () => {
  const [analytics, setAnalytics] = useState<boolean>(true);
  const [cookies, setCookies] = useState<boolean>(true);

  useEffect(() => {
    setAnalytics(localStorage.getItem(ANALYTICS_ACCEPTED) === "false" ? false : true);
  }, []);
  return (
    <div className={styles["c-preferences"]}>
      <h3>Preferences</h3>

      {/* Analytics toggle */}
      <FormSwitch
        label="Cookies"
        onChange={e => {
          setAnalytics(e);
          localStorage.setItem(ANALYTICS_ACCEPTED, `${e}`);
          window.dispatchEvent(new Event("storage"));
        }}
        isActive={analytics}
        className={styles["c-preferences__toggle--analytics"]}
      />
    </div>
  );
};

export default CookiePreferences;
