import uuid from "react-uuid";
import classnames from "classnames";
import Image, { StaticImageData } from "next/image";
import styles from "./radio-image.module.scss";

const ID = "radio-image-" + uuid();

type RadioImageData = {
  id: string;
  image: StaticImageData;
  label: string;
};

type RadioImageProps = {
  name: string;
  label: string;
  options: RadioImageData[];
  activeOptionId: string;
  onChange: (id: string) => void;
  className?: string;
};

/** Selector with image and label text. */
const RadioImage = ({ label, name, options, activeOptionId, onChange, className = "" }: RadioImageProps) => {
  return (
    <div className={classnames(styles["c-radio-image"], className)}>
      <span id={ID} className={styles["c-radio-image__label"]}>
        {label}
      </span>

      <div className={styles["c-radio-image__options"]} role="group" aria-labelledby={ID}>
        {options.map(option => {
          const id = `radio-image-${name}-${option.id}`;
          const checked = option.id === activeOptionId;

          return (
            <div key={option.id}>
              <input
                className={classnames(styles["c-radio-image__input"])}
                type="radio"
                id={id}
                name={name}
                value={option.id}
                checked={checked}
                onChange={e => onChange(e.currentTarget.value)}
                data-testid={option.id}
              />
              <label
                className={classnames(
                  styles["c-radio-image__input-label"],
                  !checked && styles["c-radio-image__input-label--unchecked"]
                )}
                htmlFor={id}
              >
                <div className={styles["c-radio-image__image"]}>
                  <Image src={option.image} layout="fill" objectFit="cover" role="presentation" alt="" />
                </div>
                <span className={styles["c-radio-image__image__label"]}>{option.label}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadioImage;
