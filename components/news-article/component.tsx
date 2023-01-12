import classnames from "classnames";
import styles from "components/news-article/news-article.module.scss";
import Image from "next/image";
import { formatDatePretty } from "utils/dates";
import ExternalLink from "components/ui/external-link";
import { fireEvent } from "utils/gtag";
import { NEWS_OPENED_ARTICLE } from "constants/tag-manager";
import TOPICS from "constants/news";

type NewsArticleProps = {
  featured?: boolean;
  title: string;
  author: string;
  date: Date;
  image: string;
  link: string;
  className?: string;
  topic?: keyof typeof TOPICS;
};

/** News article card for news page. */
const NewsArticle = ({ className = "", topic, featured, title, author, date, image, link }: NewsArticleProps) => {
  const handleClick = () => {
    fireEvent(NEWS_OPENED_ARTICLE, null, { news_title: title, category_name: topic ?? "all" });
  };

  return (
    <article
      className={classnames(
        styles["c-news-article"],
        {
          [styles["c-news-article--featured"]]: featured
        },
        className
      )}
    >
      {/* Backdrop */}
      <div className={styles["c-news-article__backdrop"]}>
        <Image src={image} layout="fill" objectFit="cover" role="presentation" alt="" />
      </div>

      {/* Top section */}
      <div className={styles["c-news-article__top"]}>
        {/* Thumbnail */}
        <div className={styles["c-news-article__thumbnail"]}>
          <Image src={image} layout="fill" objectFit="cover" role="presentation" alt="" />
        </div>

        {/* Title */}
        <span className={styles["c-news-article__title"]}>{title}</span>
      </div>

      {/* Bottom section */}
      <div className={styles["c-news-article__bottom"]}>
        {/* Date */}
        <span className={styles["c-news-article__date"]}>{formatDatePretty(date)}</span>

        {/* Article link */}
        <ExternalLink className={styles["c-news-article__link"]} onClick={handleClick} link={link} label={author} />
      </div>
    </article>
  );
};

export default NewsArticle;
