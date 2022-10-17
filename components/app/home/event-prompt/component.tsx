import { useRouter } from "next/router";
import styles from "./event-prompt.module.scss";

type EventPromptProps = {
  isMobile?: boolean;
  isCondensed?: boolean;
};

/** Shows information on how to use the globe. */
const EventPrompt = ({ isMobile, isCondensed }: EventPromptProps) => {
  const router = useRouter();

  const text =
    router?.pathname === "/"
      ? isMobile
        ? "Swipe left or select a point on the globe to view the latest extreme events from Mongabay."
        : "Select a point on the globe to view the latest Extreme Events from Mongabay."
      : isCondensed
      ? "Select a location on the globe to view how extreme the emergency is."
      : "Select a category to explore real-time data.";

  return (
    <div className={styles["event-prompt-container"]}>
      <p>{text}</p>
    </div>
  );
};

export default EventPrompt;
