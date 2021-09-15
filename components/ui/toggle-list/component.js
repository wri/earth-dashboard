import PropTypes from "prop-types";
import { Children, cloneElement } from "react";
import styles from "./toggle-list.module.scss";
import classnames from "classnames";

const ToggleList = ({
  title,
  legendComponent,
  hasLegend,
  selectedValue,
  onSelect,
  children,
  className,
  singularMode,
  ...rest
}) => {
  const getChildren = () => {
    const array = Children.toArray(children).filter(element => !!element.type && element.type.tagName === "ToggleItem");

    const handleSelect = e => {
      const value = e.target.value;
      const type = e.target.type;

      if (type === "checkbox" && !singularMode) {
        const index = selectedValue.indexOf(value);
        if (index > -1) {
          const newValue = [...selectedValue];
          newValue.splice(index, 1);
          onSelect(newValue);
        } else {
          onSelect([...selectedValue, value]);
        }
      } else if (singularMode) {
        onSelect(selectedValue === value ? "" : value);
      } else {
        onSelect(value);
      }
    };

    const isSelected = el => {
      if (el.props.type === "checkbox" && !singularMode) {
        const index = selectedValue.indexOf(el.props.value);
        return index > -1;
      }

      return el.props.value === selectedValue;
    };

    const resp = array.map(el => {
      return cloneElement(el, {
        checked: isSelected(el),
        name: title,
        onChange: handleSelect
      });
    });

    return resp;
  };

  return (
    <fieldset className={classnames(styles["c-toggle-list"], className)} {...rest}>
      {hasLegend && (legendComponent ? legendComponent : <legend>{title}</legend>)}
      {getChildren()}
    </fieldset>
  );
};

ToggleList.propTypes = {
  title: PropTypes.string.isRequired,
  selectedValue: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.array.isRequired]),
  onSelect: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  legendComponent: PropTypes.node,
  className: PropTypes.string,
  hasLegend: PropTypes.bool,
  singularMode: PropTypes.bool
};

ToggleList.defaultProps = {
  className: "",
  hasLegend: true,
  legendComponent: null,
  singularMode: false
};

export default ToggleList;
