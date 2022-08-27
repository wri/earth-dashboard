// import classnames from "classnames";
import styles from "./onboarding-modal.module.scss";
import { useRouter } from "next/router";
import IconButton from "components/ui/icon-button";
import Icon from "components/ui/Icon";
import mypic from "public/static/images/about/cover.png";
import Image from "next/image";

const OnboardingModal = (showModal: any, setShowModal: any) => {
  const router = useRouter();

  return (
    <div className={styles["modal-backdrop"]}>
      <div className={styles["modal"]}>
        <div className={styles["modal-top"]}>
          <Image layout="fill" objectFit="cover" src={mypic.src} alt="hello" />
          <div className={styles["modal-header"]}>
            <div className={styles["modal-logo"]}>
              <Icon name="earth-hq" size={32} type="decorative" className={styles["earth-hq"]} />
              <h3 className={styles["modal-title"]}>WELCOME TO EARTH HQ</h3>
            </div>
            <IconButton name="close" className={styles["close-button"]} onClick={() => setShowModal(false)} />
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
