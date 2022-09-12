import classnames from "classnames";
import styles from "./globe-card.module.scss";

const GlobeCard = () => {
  return (
    <div className={classnames(styles["c-globe-card"])}>
      <h1 className={classnames(styles["title"])}>Earth HQ</h1>
      <p className={classnames(styles["description"])}>
        Make a wider impact and spread awareness of the climate emergency.
      </p>
    </div>
  );
};

export default GlobeCard;
