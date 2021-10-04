import { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";
import Image from "next/image";
import ReactPlayer from "react-player";
import classnames from "classnames";
import { CSSTransition } from "react-transition-group";
import styles from "./video-article.module.scss";
import YouTubePlayIcon from "public/static/icons/youtube-play.svg";
import ErrorIcon from "public/static/icons/error-circle.svg";
import PropTypes from "prop-types";

const VideoArticle = ({ className, title, duration, image, videoURL }) => {
  const { current: id } = useRef(uuid());
  const ref = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (ref.current && isPlaying && !hasError) {
      ref.current.querySelector("iframe")?.focus();
      ref.current.querySelector("video")?.focus();
    }
  }, [ref, isPlaying, hasError]);

  return (
    <article className={classnames(className, styles["c-video-article"])} onClick={() => setIsPlaying(true)}>
      <div
        className={classnames(
          styles["c-video-article__player-wrapper"],
          !isPlaying && "u-display-none",
          hasError && "u-display-none"
        )}
        ref={ref}
      >
        <ReactPlayer
          width="100%"
          height="100%"
          playing={isPlaying}
          controls={true}
          url={videoURL}
          onError={() => setHasError(true)}
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
          <Image src={image} layout="fill" objectFit="cover" role="presentation" alt="" />

          <div className={styles["c-video-article__content"]}>
            <div className={styles["c-video-article__duration-wrap"]}>
              <span className={styles["c-video-article__duration"]} aria-label="Duration">{duration}</span>
            </div>

            <div className={styles["c-video-article__play-icon-wrap"]}>
              <button
                className={styles["c-video-article__play-icon"]}
                onClick={() => setIsPlaying(true)}
                aria-label={isPlaying && hasError ? "Error Playing Video" : "Play Video"}
                disabled={isPlaying && hasError}
                aria-describedby={!hasError && id}
              >
                <Image src={isPlaying && hasError ? ErrorIcon : YouTubePlayIcon} layout="responsive" role="presentation" alt="" />
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
  title: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  videoURL: PropTypes.string.isRequired
};

VideoArticle.defaultProps = {};

export default VideoArticle;
