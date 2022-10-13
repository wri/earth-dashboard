import styles from "./event-prompt.module.scss";

type EventPromptProps = {
  isMobile?: boolean;
};

/** Shows information on how to use the globe. */
const EventPrompt = ({ isMobile }: EventPromptProps) => {
  return (
    <div className={styles["event-prompt-container"]}>
      {isMobile ? (
        <p>Swipe left or select a point on the globe to view the latest extreme events from Mongabay.</p>
      ) : (
        <p>Select a point on the globe to view the latest Extreme Events from Mongabay.</p>
      )}
    </div>
  );
};

export default EventPrompt;
