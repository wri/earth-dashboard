import { useState, useRef, useEffect } from "react";
import Icon from "components/ui/Icon";
import uuid from "react-uuid";
import Image from "next/image";
import ReactPlayer from "react-player";
import { secondsToHms } from "utils/time";
import classnames from "classnames";
import { CSSTransition } from "react-transition-group";
import styles from "./video-article.module.scss";
import PropTypes from "prop-types";
import { fireEvent } from "utils/gtag";
import { NEWS_PLAYED_VIDEO } from "constants/tag-manager";

const VideoArticle = ({ className, topic, title, image, videoURL }) => {
  const { current: id } = useRef(uuid());
  const ref = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [duration, setDuration] = useState(undefined);

  useEffect(() => {
    if (ref.current && isPlaying && !hasError) {
      let player = ref.current.getInternalPlayer();

      // Available on YouTube Players
      if (player.getIframe) {
        player = player.getIframe();
      }

      const handleBlur = () => {
        setIsPlaying(false);
        player.removeEventListener("blur", handleBlur);
      };

      player.focus();

      player.addEventListener("blur", handleBlur);
    }
  }, [isPlaying, hasError]);

  return (
    <article
      className={classnames(
        className,
        styles["c-video-article"],
        isPlaying && !hasError && styles["c-video-article--playing"]
      )}
      onClick={() => setIsPlaying(true)}
    >
      <div
        className={classnames(
          styles["c-video-article__player-wrapper"],
          !isPlaying && "u-display-none",
          hasError && "u-display-none"
        )}
      >
        <ReactPlayer
          ref={ref}
          width="100%"
          height="100%"
          playing={isPlaying}
          controls={true}
          url={videoURL}
          onError={() => setHasError(true)}
          onStart={() => fireEvent(NEWS_PLAYED_VIDEO, null, { video_title: title, category_name: topic })}
          onDuration={duration => setDuration(duration)}
        />
      </div>

      <CSSTransition
        in={!isPlaying || hasError}
        appear={true}
        timeout={parseInt(styles.transition)}
        classNames={{
          exit: styles["c-video-article-thumbnail"],
          exitActive: styles["c-video-article-thumbnail--hiding"],
          exitDone: styles["c-video-article-thumbnail--hidden"]
        }}
      >
        <div>
          <Image
            src={`/api/imageproxy?url=${encodeURIComponent(image)}`}
            layout="fill"
            objectFit="cover"
            role="presentation"
            alt=""
          />

          <div className={styles["c-video-article__content"]}>
            <div className={styles["c-video-article__duration-wrap"]}>
              {duration && (
                <span className={styles["c-video-article__duration"]} aria-label="Duration">
                  {secondsToHms(duration)}
                </span>
              )}
            </div>

            <div className={styles["c-video-article__play-icon-wrap"]}>
              <button
                className={styles["c-video-article__play-icon"]}
                onClick={() => setIsPlaying(true)}
                aria-label={isPlaying && hasError ? "Error Playing Video" : "Play Video"}
                disabled={isPlaying || hasError}
                aria-describedby={!hasError && id}
              >
                <Icon name={isPlaying && hasError ? "error-circle" : "youtube-play"} />
              </button>
            </div>

            <div className={styles["c-video-article__title-wrap"]}>
              <span className={styles["c-video-article__title"]} id={id}>
                {title}
              </span>
            </div>
          </div>
        </div>
      </CSSTransition>
    </article>
  );
};

VideoArticle.propTypes = {
  className: PropTypes.string,
  topic: PropTypes.string,
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  videoURL: PropTypes.string.isRequired
};

VideoArticle.defaultProps = {
  className: "",
  topic: "all"
};

export default VideoArticle;
