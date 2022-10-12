import styles from "./event-prompt.module.scss";

const EventPrompt = () => {
  return (
    <div className={styles["event-prompt-container"]}>
      <p>Select a point on the globe to view the latest Extreme Events from Mongabay.</p>
    </div>
  );
};

export default EventPrompt;
