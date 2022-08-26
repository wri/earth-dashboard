// import classnames from "classnames";
import styles from "./onboarding-modal.module.scss";
import { useRouter } from "next/router";
import IconButton from "components/ui/icon-button";
import Icon from "components/ui/Icon";

const OnboardingModal = () => {
  const router = useRouter();

  return (
    <div className={styles["modal-backdrop"]}>
      <div className={styles["modal"]}>
        <div className={styles["modal-top"]}>
          <div className={styles["modal-header"]}>
            <div className={styles["modal-logo"]}>
              <Icon name="earth-hq" size={32} type="decorative" className={styles["earth-hq"]} />
              <h3 className={styles["modal-title"]}>WELCOME TO EARTH HQ</h3>
            </div>
            <IconButton name="close" className={styles["close-button"]} onClick={() => console.log("Close Modal")} />
          </div>
        </div>
        <div className={styles["modal-main-content"]}>
          <h4 className={styles["text"]}>
            The effects of human-induced climate change can be seen and felt across the planet.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
