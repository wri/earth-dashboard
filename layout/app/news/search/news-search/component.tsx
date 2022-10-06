import Input from "components/form/input";
import { useForm } from "react-hook-form";
import styles from "./news-search.module.scss";

/** Contains search bar logic. */
const NewsSearch = () => {
  // form
  const { register, setValue, setFocus } = useForm();

  return (
    <div className={styles["c-news-search"]}>
      <Input
        iconName="search"
        name="search"
        register={register}
        setValue={setValue}
        setFocus={setFocus}
        className={styles["input"]}
        placeholder="What are you looking for?"
      />
    </div>
  );
};

export default NewsSearch;
