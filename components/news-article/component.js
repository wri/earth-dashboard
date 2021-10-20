import classnames from "classnames";
import styles from "./news-article.module.scss";
import Image from "next/image";
import { formatDate } from "utils/dates";
import ExternalLink from "components/ui/external-link";
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

      <ExternalLink className={styles["c-news-article__link"]} onClick={() => fireEvent(NEWS_VIEW_FULL_ARTICLE, topic)} link={link} label="Read full article" />
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
