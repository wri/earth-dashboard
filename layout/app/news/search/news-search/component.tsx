import classnames from "classnames";
import Input from "components/form/input";
import TOPICS from "constants/news";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import styles from "./news-search.module.scss";

type NewsSearchProps = {
  topic: keyof typeof TOPICS | undefined;
  setTopic: Dispatch<SetStateAction<keyof typeof TOPICS | undefined>>;
  darkColors?: boolean;
  className?: string;
  inputClassName?: string;
  filtersClassName?: string;
};

/** Contains search bar logic and topic filters. */
const NewsSearch = ({
  topic,
  setTopic,
  darkColors,
  className = "",
  inputClassName = "",
  filtersClassName = ""
}: NewsSearchProps) => {
  // Form
  const form = useForm();

  const topics = Object.keys(TOPICS) as (keyof typeof TOPICS)[];

  return (
    <div
      className={classnames(
        styles["c-news-search"],
        {
          [styles["dark"]]: darkColors
        },
        className
      )}
    >
      {/* Search bar */}
      <Input
        iconName="search"
        name="search"
        className={classnames(styles["input"], inputClassName)}
        placeholder="What are you looking for?"
        {...form}
      />

      {/* Filters */}
      <div className={classnames(styles["filters"], filtersClassName)}>
        {/* All */}
        <button
          onClick={() => setTopic(undefined)}
          className={classnames({
            [styles["active"]]: !topic
          })}
        >
          All
        </button>

        {/* Other topics */}
        {topics.map(topicText => (
          <button
            key={topicText}
            onClick={() => setTopic(topicText)}
            className={classnames({
              [styles["active"]]: topicText === topic
            })}
          >
            {topicText}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NewsSearch;
