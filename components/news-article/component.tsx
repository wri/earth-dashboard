import classnames from "classnames";
import styles from "./news-article.module.scss";
import Image from "next/image";
import { formatDatePretty } from "utils/dates";
import ExternalLink from "components/ui/external-link";
import { fireEvent } from "utils/gtag";
import { NEWS_OPENED_ARTICLE } from "constants/tag-manager";
import TOPICS from "constants/news";
import testImage from "public/static/images/basemaps/geography-basemap-thumbnail.png";

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
      className={classnames(className, styles["c-news-article"], featured && styles["c-news-article--featured"])}
    >
      <Image
        src={testImage}
        layout="fill"
        objectFit="cover"
        role="presentation"
        alt=""
        className={styles["backdrop"]}
      />

      {/* Top section */}
      <div className={styles["top"]}>
        <div className={styles["image"]}>
          {/* Thumbnail */}
          <Image src={testImage} layout="fill" objectFit="cover" role="presentation" alt="" />
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
    </article>
  );
};

export default NewsArticle;
