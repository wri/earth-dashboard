import { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import uuid from "react-uuid";
import Image from "next/image";
import styles from "./radio-image.module.scss";

const ID = "radio-image-" + uuid();

const RadioImage = forwardRef(({ className, label, name, options, getSelectOption, handleChange }, ref) => {
  const dispatch = useDispatch();
  const activeId = useSelector(getSelectOption());

  return (
    <div className={classnames(styles["c-radio-image"], className)}>
      {label && <span id={ID} className={styles["c-radio-image__label"]}>{label}</span>}

      <div className={styles["c-radio-image__options"]} role="group" aria-labelledby={ID}>
        {options.map(option => {
          const id = `radio-image-${name}-${option.id}`;
          const checked = option.id === activeId;

          return (
            <div key={option.id}>
              <input
                className={classnames(styles["c-radio-image__input"])}
                type="radio"
                id={id}
                name={name}
                value={option.id}
                checked={checked}
                onChange={e => dispatch(handleChange(e.currentTarget.value))}
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
});

export default RadioImage;
