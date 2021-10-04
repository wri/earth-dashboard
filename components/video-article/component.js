import { useState } from "react";
import Image from "next/image";
import ReactPlayer from 'react-player';
import classnames from "classnames";
import { CSSTransition } from "react-transition-group";
import styles from "./video-article.module.scss";
import YouTubePlayIcon from "public/static/icons/youtube-play.svg";
import ErrorIcon from "public/static/icons/error-circle.svg";
import PropTypes from "prop-types";

const VideoArticle = ({ className, title, duration, image, videoURL }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const videoPlayerStyles = {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0"
  };

  return (
    <article className={classnames(className, styles["c-video-article"])} onClick={() => setIsPlaying(true)}>
      <ReactPlayer style={videoPlayerStyles} width="100%" height="100%" playing={isPlaying} controls={true} url={videoURL} onError={() => setHasError(true)} />

      <CSSTransition in={!isPlaying || hasError} appear={true} timeout={parseInt(styles.transition)} classNames={{
        exit: styles["c-video-article-thumbnail"],
        exitActive: styles["c-video-article-thumbnail--hiding"],
        exitDone: styles["c-video-article-thumbnail--hidden"],
      }}>
        <div>
          <Image src={image} layout="fill" objectFit="cover" role="presentation" alt="" />

          <div className={styles["c-video-article__content"]}>
            <div className={styles["c-video-article__duration-wrap"]}>
              <span className={styles["c-video-article__duration"]}>{duration}</span>
            </div>

            <div className={styles["c-video-article__play-icon-wrap"]}>
              <button className={styles["c-video-article__play-icon"]}>
                <Image src={isPlaying && hasError ? ErrorIcon : YouTubePlayIcon} role="presentation" alt="" />
              </button>
            </div>

            <div className={styles["c-video-article__title-wrap"]}>
              <span className={styles["c-video-article__title"]}>{title}</span>
            </div>
          </div>
        </div>
      </CSSTransition>
    </article>
  )
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
