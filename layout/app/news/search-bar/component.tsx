import { useDebounce } from "react-use";
import classnames from "classnames";
import Input from "components/form/input";
import TOPICS from "constants/news";
import { useForm, useWatch } from "react-hook-form";
import { breakpoints } from "utils/responsive";
import styles from "./news-search.module.scss";
import { fireEvent } from "utils/gtag";
import { NEWS_SEARCH_FILTER } from "constants/tag-manager";

type NewsSearchFormData = {
  search: string;
};

type NewsSearchProps = {
  topic: keyof typeof TOPICS | undefined;
  onTopicChange: (topic: keyof typeof TOPICS | undefined) => void;
  onSearch: (value: string | undefined) => void;
  darkColors?: boolean;
  className?: string;
  inputClassName?: string;
  filtersClassName?: string;
};

/** Contains search bar logic and topic filters. */
const SearchBar = ({
  topic,
  onTopicChange,
  darkColors,
  onSearch,
  className = "",
  inputClassName = "",
  filtersClassName = ""
}: NewsSearchProps) => {
  // Form
  const form = useForm<NewsSearchFormData>();
  const { search } = useWatch({ control: form.control });

  const topics = Object.keys(TOPICS) as (keyof typeof TOPICS)[];

  // Emits query value to parent
  useDebounce(
    () => {
      if (!search) {
        return onSearch(undefined);
      }

      if (search.length < 3) {
        return;
      }

      onSearch(search);
    },
    400,
    [search]
  );

  const setTopicHandler = (topicName: keyof typeof TOPICS | undefined) => {
    if (topicName) {
      fireEvent(NEWS_SEARCH_FILTER, topicName as string);
    }
    onTopicChange(topicName);
  };

  const handleSearchBarOnBlur = () => {
    // On Mobile devices, scroll to top
    if (window.innerWidth <= breakpoints.md) {
      window.scroll(0, 0);
    }
  };

  return (
    <div
      className={classnames(
        styles["c-news-search"],
        {
          [styles["c-news-search--dark"]]: darkColors
        },
        className
      )}
    >
      {/* Filters */}
      <div className={classnames(styles["c-news-search__filters"], filtersClassName)}>
        {/* All */}
        <button
          onClick={() => setTopicHandler(undefined)}
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
      {/* Search bar */}
      <Input
        iconName="search"
        name="search"
        className={classnames(styles["c-news-search__input"], "u-text-body-200", inputClassName)}
        placeholder="What are you looking for?"
        onblur={handleSearchBarOnBlur}
        {...form}
      />
    </div>
  );
};

export default SearchBar;
