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
        ? "Select a point on the globe to view the latest extreme events from Mongabay."
        : "Select a point on the globe or use the arrows to view the latest extreme events from Mongabay."
      : isCondensed
      ? "Select a location on the globe to view how extreme the situation is."
      : "Select a category to explore real-time data.";

  return (
    <div
      className={styles["event-prompt-container"]}
      style={
        router?.pathname === "/explore" && !isCondensed && isMobile
          ? { margin: "20px 24px 0", minHeight: "auto" }
          : router?.pathname === "/explore" && !isMobile
          ? { margin: 0 }
          : {}
      }
    >
      <p>{text}</p>
    </div>
  );
};

export default EventPrompt;
