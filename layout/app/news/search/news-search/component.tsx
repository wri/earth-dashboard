import classnames from "classnames";
import Input from "components/form/input";
import TOPICS from "constants/news";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import styles from "./news-search.module.scss";

type NewsSearchProps = {
  topic: keyof typeof TOPICS | undefined;
  setTopic: Dispatch<SetStateAction<keyof typeof TOPICS | undefined>>;
};

/** Contains search bar logic and topic filters. */
const NewsSearch = ({ topic, setTopic }: NewsSearchProps) => {
  // Form
  const { register, setValue, setFocus } = useForm();

  const topics = Object.keys(TOPICS) as (keyof typeof TOPICS)[];

  return (
    <div className={styles["c-news-search"]}>
      {/* Search bar */}
      <Input
        iconName="search"
        name="search"
        register={register}
        setValue={setValue}
        setFocus={setFocus}
        className={styles["input"]}
        placeholder="What are you looking for?"
      />

      {/* Filters */}
      <div className={styles["filters"]}>
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
