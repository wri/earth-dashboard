import classnames from "classnames";
import styles from "./globe-card.module.scss";

type GlobeCardProps = {};

const GlobeCard = ({}: GlobeCardProps) => {
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
