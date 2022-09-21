import styles from "./panel.module.scss";
import CtaButton from "components/ui/cta-button";

export type SharePanelProps = {
  ctaAction?: () => void;
};

const SharePanel = ({ ctaAction }: SharePanelProps) => (
  <div className={styles["c-share-panel__underlay"]} data-testid="share-panel">
    <div className={styles["c-share-panel"]}>
      <h3 className={styles["c-share-panel__title"]}>Share</h3>
      <p className={styles["c-share-panel__subtitle"]}>
        Make a wider impact and spread awareness of the climate emergency
      </p>
      <CtaButton text="Share" iconName="share" onClick={ctaAction} />
    </div>
  </div>
);

export default SharePanel;
