import PropTypes from "prop-types";

// styles
import styles from "./guardian-news.module.scss";

function GuardianNews(props) {
  const { item } = props;
  const {
    fields: { thumbnail, trailText },
    webTitle,
    webUrl
  } = item;

  return (
    <div className={styles["c-guardian-news"]}>
      <div className={styles["image-container"]}>
        <img src={thumbnail} />
      </div>
      <div className={styles["text-container"]}>
        <h3>
          <a href={webUrl} target="_blank" rel="noreferrer">
            {webTitle}
          </a>
        </h3>
        <p>{trailText}</p>
      </div>
    </div>
  );
}

GuardianNews.propTypes = {
  item: PropTypes.object.isRequired
};

export default GuardianNews;
