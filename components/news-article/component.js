import classnames from "classnames";
import styles from "./news-article.module.scss";
import Image from "next/image";
import { formatDate } from "utils/dates";
import ExternalLink from "public/static/icons/external-link.svg";
import PropTypes from "prop-types";
import { fireEvent } from "utils/gtag";
import { NEWS_VIEW_FULL_ARTICLE } from "constants/tag-manager";

const NewsArticle = ({ className, topic, featured, title, author, date, image, link }) => (
  <article className={classnames(className, styles["c-news-article"], featured && styles["c-news-article--featured"])}>
    <div className={styles["c-news-article__image"]}>
      <Image src={image} layout="fill" objectFit="cover" role="presentation" alt="" />
    </div>

    <div className={styles["c-news-article__content"]}>
      {!featured && (
        <span className={classnames(styles["c-news-article__title"], styles["c-news-article__author"])}>{author}</span>
      )}

      <span className={styles["c-news-article__title"]}>{title}</span>
      <span className={styles["c-news-article__date"]}>
        {author} . {formatDate(date)}
      </span>

      <a className={styles["c-news-article__link"]} href={link} target="_blank" rel="nofollow noreferrer" onClick={() => fireEvent(NEWS_VIEW_FULL_ARTICLE, topic)}>
        <Image src={ExternalLink} role="presentation" alt="" />
        <span>Read full article</span>
      </a>
    </div>
  </article>
);

NewsArticle.propTypes = {
  className: PropTypes.string,
  topic: PropTypes.string,
  featured: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  link: PropTypes.string.isRequired
};

NewsArticle.defaultProps = {
  className: "",
  topic: "",
  featured: false
};

export default NewsArticle;
