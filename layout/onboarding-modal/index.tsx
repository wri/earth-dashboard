// import classnames from "classnames";
import styles from "./onboarding-modal.module.scss";
import { useRouter } from "next/router";

const OnboardingModal = () => {
  const router = useRouter();

  return (
    <div className={styles["modal-backdrop"]}>
      <h1>Modal Inserted Here</h1>
    </div>
  );
};

export default OnboardingModal;
