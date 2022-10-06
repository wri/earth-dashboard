import classnames from "classnames";
import { UseFormRegister, UseFormSetFocus, UseFormSetValue } from "react-hook-form";
import Icon, { IconNames } from "components/ui/Icon";
import IconButton from "components/ui/icon-button";
import styles from "./input.module.scss";

type InputProps = {
  name: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  setFocus: UseFormSetFocus<any>;
  iconName?: IconNames;
  className?: string;
} & Partial<HTMLInputElement>;

/** Styles generic input. */
const Input = ({ register, name, setValue, setFocus, iconName, className, placeholder }: InputProps) => {
  /** Clears the text-entry of the input and re-focuses. */
  const handleClearInput = () => {
    setValue(name, undefined);
    setFocus(name);
  };

  return (
    <div className={classnames(styles["c-input"], className)}>
      {/* Left-side icon */}
      {iconName && <Icon name={iconName} size={16} type="decorative" className={styles["icon"]} />}

      {/* Text entry */}
      <input className={styles["text-entry"]} placeholder={placeholder} {...register(name)} />

      {/* On clear */}
      <IconButton name="close" size={9} onClick={handleClearInput} extraSmall />
    </div>
  );
};

export default Input;
