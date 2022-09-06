import styles from "./panel.module.scss";
import Icon from "components/ui/Icon";

export type MenuOptionProps = {
  ctaAction?: () => void;
};

const SharePanel = ({ ctaAction }: MenuOptionProps) => (
  <div className={styles["c-share-panel__underlay"]} data-testid="share-panel">
    <div className={styles["c-share-panel"]}>
      <h3 className={styles["c-share-panel__title"]}>Share</h3>
      <p className={styles["c-share-panel__description"]}>
        Make a wider impact and spread awareness of the climate emergency
      </p>
      <button className={styles["c-share-panel__button"]} onClick={ctaAction}>
        <span className={styles["c-share-panel__button-text"]}>Share</span>
        <span className={styles["c-share-panel__button-icon"]}>
          <Icon name={"arrow-right"} type="decorative" size={15} />
        </span>
      </button>
    </div>
  </div>
);

export default SharePanel;
