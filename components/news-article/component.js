import classnames from "classnames";
import styles from "./news-article.module.scss";
import Image from "next/image";
import { formatDate } from "utils/dates";
import ExternalLink from "public/static/icons/external-link.svg";
import PropTypes from "prop-types";

const NewsArticle = ({
  className,
  featured,
  title,
  author,
  date,
  image,
  link
}) => (
  <article className={classnames(className, styles["c-news-article"], featured && styles["c-news-article--featured"])}>
    <div className={styles["c-news-article__image"]}>
      <Image src={image} layout="fill" objectFit="cover" role="presentation" alt="" />
    </div>

    <div className={styles["c-news-article__content"]}>
      {!featured && <span className={styles["c-news-article__title"]}>{author}</span>}

      <span className={styles["c-news-article__title"]}>{title}</span>
      <span className={styles["c-news-article__date"]}>{author} . {formatDate(date)}</span>

      <a className={styles["c-news-article__link"]} href={link}>
        <Image src={ExternalLink} role="presentation" alt="" />
        <span>Read full article</span>
      </a>
    </div>
  </article>
);

NewsArticle.propTypes = {
  className: PropTypes.string,
  featured: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  image: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired
};

NewsArticle.defaultProps = {
  featured: false
};

export default NewsArticle;
