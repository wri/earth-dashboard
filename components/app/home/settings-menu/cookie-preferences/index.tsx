import FormSwitch from "components/form/switch";
import { ANALYTICS_ACCEPTED, COOKIES_ACCEPTED } from "layout/layout/layout-app/constants";
import { useEffect, useState } from "react";
import styles from "./cookie-preferences.module.scss";

/** Contains all preference global settings. */
const CookiePreferences = () => {
  const [analytics, setAnalytics] = useState<boolean>(true);
  const [cookies, setCookies] = useState<boolean>(true);

  useEffect(() => {
    setAnalytics(localStorage.getItem(ANALYTICS_ACCEPTED) === "false" ? false : true);
    setCookies(localStorage.getItem(COOKIES_ACCEPTED) === "false" ? false : true);
  }, []);
  return (
    <div className={styles["c-preferences"]}>
      <h3>Preferences</h3>

      {/* Analytics toggle */}
      <FormSwitch
        label="Analytics"
        onChange={e => {
          setAnalytics(e);
          localStorage.setItem(ANALYTICS_ACCEPTED, `${e}`);
        }}
        isActive={analytics}
        className={styles["c-preferences__toggle--analytics"]}
      />

      {/* Cookies toggle */}
      <FormSwitch
        label="Cookies"
        onChange={e => {
          setCookies(e);
          localStorage.setItem(COOKIES_ACCEPTED, `${e}`);
        }}
        isActive={cookies}
        className={styles["c-preferences__toggle--cookies"]}
      />
    </div>
  );
};

export default CookiePreferences;
