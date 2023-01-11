import { useDebounce } from "react-use";
import classnames from "classnames";
import Input from "components/form/input";
import TOPICS from "constants/news";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./news-search.module.scss";
import { fireEvent } from "utils/gtag";
import { NEWS_SEARCH_FILTER } from "constants/tag-manager";
import IconButton from "components/ui/icon-button";

type NewsSearchFormData = {
  search: string;
};

type NewsSearchProps = {
  topic: keyof typeof TOPICS | undefined;
  setTopic: Dispatch<SetStateAction<keyof typeof TOPICS | undefined>>;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
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
  setSearch,
  className = "",
  inputClassName = "",
  filtersClassName = ""
}: NewsSearchProps) => {
  // Form
  const form = useForm<NewsSearchFormData>();

  const search = form.watch("search");

  const topics = Object.keys(TOPICS) as (keyof typeof TOPICS)[];

  // Emits query value to parent
  useDebounce(
    () => {
      if (!search) return setSearch(undefined);

      if (search.length < 3) return;

      setSearch(search);
      // eslint-disable-next-line
    },
    400,
    [search]
  );

  const setTopicHandler = (
    topicName: SetStateAction<"climate" | "freshwater" | "ocean" | "biodiversity" | "forests" | undefined>
  ) => {
    setTopic(topicName);
    fireEvent(NEWS_SEARCH_FILTER, topicName as string);
  };

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
            onClick={() => setTopicHandler(topicText)}
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
