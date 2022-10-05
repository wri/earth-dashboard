import Input from "components/form/input";
import { useForm } from "react-hook-form";

/** Contains search bar logic. */
const NewsSearch = () => {
  const { register, setValue, setFocus } = useForm();

  return <Input iconName="search" name="search" register={register} setValue={setValue} setFocus={setFocus} />;
};

export default NewsSearch;
