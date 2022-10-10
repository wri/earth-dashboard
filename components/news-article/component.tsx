import classnames from "classnames";
import styles from "./news-article.module.scss";
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
    fireEvent(NEWS_OPENED_ARTICLE, null, { news_title: title, category_name: topic });
  };

  return (
    <article
      className={classnames(
        styles["c-news-article"],
        {
          [styles["featured"]]: featured
        },
        className
      )}
    >
      {/* Top section */}
      <div className={styles["top"]}>
        <div
          className={classnames(styles["image"], {
            [styles["no-image"]]: !image
          })}
        >
          {/* Thumbnail */}
          <Image src={image} layout="fill" objectFit="cover" role="presentation" alt="" />
        </div>

        {/* Title */}
        <span className={styles["title"]}>{title}</span>
      </div>

      {/* Bottom section */}
      <div className={styles["bottom"]}>
        {/* Date */}
        <span className={styles["date"]}>{formatDatePretty(date)}</span>

        {/* Article link */}
        <ExternalLink className={styles["link"]} onClick={handleClick} link={link} label={author} />
      </div>

      {/* Backdrop */}
      <Image
        src={image}
        layout="fill"
        objectFit="cover"
        role="presentation"
        alt=""
        className={classnames(styles["backdrop"], {
          [styles["no-image"]]: !image
        })}
      />
    </article>
  );
};

export default NewsArticle;
