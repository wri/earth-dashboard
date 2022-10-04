import classnames from "classnames";
import styles from "./news-article.module.scss";
import Image from "next/image";
import { formatDate } from "utils/dates";
import ExternalLink from "components/ui/external-link";
import { fireEvent } from "utils/gtag";
import { NEWS_OPENED_ARTICLE } from "constants/tag-manager";
import TOPICS from "constants/news";

type NewsArticleProps = {
  featured: boolean;
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
      <div className={styles["c-news-article__image"]}>
        <Image src={image} layout="fill" objectFit="cover" role="presentation" alt="" />
      </div>

      <div className={styles["c-news-article__content"]}>
        {!featured && (
          <span className={classnames(styles["c-news-article__title"], styles["c-news-article__author"])}>
            {author}
          </span>
        )}

        <span className={styles["c-news-article__title"]}>{title}</span>
        <span className={styles["c-news-article__date"]}>
          {author} . {formatDate(date)}
        </span>

        <ExternalLink
          className={styles["c-news-article__link"]}
          onClick={handleClick}
          link={link}
          label="Read full article"
        />
      </div>
    </article>
  );
};

export default NewsArticle;
