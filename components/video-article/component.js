import Image from "next/image";
import classnames from "classnames";
import styles from "./video-article.module.scss";
import YouTubePlayIcon from "public/static/icons/youtube-play.svg";
import PropTypes from "prop-types";

const VideoArticle = ({ className, title, duration, image, videoURL }) => (
  <article className={classnames(className, styles["c-video-article"])}>
    <Image src={image} layout="fill" objectFit="cover" role="presentation" alt="" />

    <div className={styles["c-video-article__duration-wrap"]}>
      <span className={styles["c-video-article__duration"]}>{duration}</span>
    </div>

    <div className={styles["c-video-article__play-icon-wrap"]}>
      <button>
        <Image src={YouTubePlayIcon} role="presentation" alt="" />
      </button>
    </div>

    <div className={styles["c-video-article__title-wrap"]}>
      <span className={styles["c-video-article__title"]}>{title}</span>
    </div>
  </article>
);

VideoArticle.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  videoURL: PropTypes.string.isRequired
};

VideoArticle.defaultProps = {};

export default VideoArticle;
