import classnames from "classnames";
import { max } from "lodash";
import PropTypes from "prop-types";
import styles from "./scale.module.scss";

const Scale = ({ className, title, min, max, scaleUnit, scaleGradient, ...rest }) => {
  const minLabel = `${min}${scaleUnit}`.length > 9 ? `${min} ${scaleUnit}` : `${min}${scaleUnit}`;
  const maxLabel = `${max}${scaleUnit}`.length > 9 ? `${max} ${scaleUnit}` : `${max}${scaleUnit}`;

  const style = { "--min": `"${minLabel}"`, "--max": `"${maxLabel}"`, "--gradient": scaleGradient };

  return (
    <div className={classnames(className, styles["c-scale"])}>
      <label htmlFor="scale">Scale</label>
      <input
        id="scale"
        type="range"
        orient="vertical"
        aria-orientation="vertical"
        value="0"
        min={min}
        max={max}
        {...rest}
        style={style}
      />
    </div>
  );
};

Scale.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  alt: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  scaleUnit: PropTypes.string
};

Scale.defaultProps = {
  className: "",
  title: "Scale",
  min: 0,
  max: 100,
  scaleUnit: "%"
};

export default Scale;
