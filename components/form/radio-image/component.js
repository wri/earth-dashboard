import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import styles from "./radio-image.module.scss";

const RadioImage = ({ className, label, name, options, getSelectOption, handleChange }) => {
  const dispatch = useDispatch();
  const activeId = useSelector(getSelectOption());

  return (
    <div className={classnames(styles["c-radio-image"], className)}>
      {label && <label className={styles["c-radio-image__label"]}>{label}</label>}

      <div className={styles["c-radio-image__options"]}>
        {options.map(option => (
          <div key={option.id}>
            <input
              className={styles["c-radio-image__input"]}
              type="radio"
              id={`radio-image-${name}-${option.id}`}
              name={name}
              value={option.id}
              checked={option.id === activeId}
              onChange={e => dispatch(handleChange(e.currentTarget.value))}
            />
            <label className={styles["c-radio-image__input-label"]} htmlFor={`radio-image-${name}-${option.id}`}>
              <div className={styles["c-radio-image__image"]}><img src={option.image} /></div>
              <span>{option.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioImage;
