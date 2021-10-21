import { useEffect, useMemo, useState } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./scale.module.scss";
import FocusTrap from "focus-trap-react";
import ToolTip from "components/ui/tooltip";
import { POSITIONS } from "components/ui/tooltip/component";
import { SCALE_TYPES } from "constants/map";

const Scale = ({
  className,
  title,
  min,
  max,
  scaleUnit,
  scaleGradient,
  isHorizontal,
  toolTipData,
  value,
  hasSmallLabels,
  ...rest
}) => {
  const [shouldShowToolTip, setShouldShowToolTip] = useState(false);
  const minLabel = `${min}${scaleUnit}`.length > 9 ? `${min} ${scaleUnit}` : `${min}${scaleUnit}`;
  const maxLabel = `${max}${scaleUnit}`.length > 9 ? `${max} ${scaleUnit}` : `${max}${scaleUnit}`;
  const style = { "--min": `"${minLabel}"`, "--max": `"${maxLabel}"`, "--gradient": scaleGradient };

  const valueParsed = useMemo(
    () => parseFloat(toolTipData.overlay ? toolTipData.overlay.value : value),
    [toolTipData.overlay?.value, value]
  );

  const percent = useMemo(() => {
    const minParsed = parseFloat(min);
    const maxParsed = parseFloat(max);

    const linearPercent = ((valueParsed - minParsed) * 100) / (maxParsed - minParsed);
    const logPercent =
      ((Math.log(valueParsed) - Math.log(minParsed)) * 100) / (Math.log(maxParsed) - Math.log(minParsed));

    let percent = 0;

    if (toolTipData.layer) {
      percent = toolTipData.layer.product.scale.type === SCALE_TYPES.log ? logPercent : linearPercent;
      if (percent > 100) {
        percent = 100;
      }

      if (percent < 0) {
        percent = 0;
      }
    }

    return percent;
  }, [min, max, valueParsed, toolTipData.layer]);

  useEffect(() => {
    if (toolTipData.overlay || toolTipData.annotation) {
      setShouldShowToolTip(true);
    } else {
      setShouldShowToolTip(false);
    }
  }, [toolTipData]);

  const focusTrapOptions = {
    onDeactivate: () => {
      setShouldShowToolTip(false);
    },
    clickOutsideDeactivates: true
  };

  return (
    <div className={classnames(className, styles["c-scale"], isHorizontal && styles["c-scale--horizontal"])}>
      <label htmlFor="scale">Scale</label>
      <div className={styles["c-scale__input-container"]}>
        {shouldShowToolTip && !Number.isNaN(percent) && (
          <>
            <FocusTrap focusTrapOptions={focusTrapOptions}>
              <div className={styles["c-scale__tooltip"]}>
                <ToolTip
                  y={
                    isHorizontal
                      ? toolTipData.overlay && toolTipData.annotation
                        ? "-110px"
                        : "-90px"
                      : `${100 - percent}%`
                  }
                  x={isHorizontal ? `50%` : "19px"}
                  arrowPosition={isHorizontal ? POSITIONS.none : POSITIONS.right}
                  className={styles["c-scale__tooltip-item"]}
                >
                  <button
                    className="u-button-no-style"
                    aria-label="Close tooltip"
                    onClick={() => setShouldShowToolTip(false)}
                  >
                    {toolTipData.overlay && <p className="u-no-wrap u-margin-none">{toolTipData.overlay.str}</p>}
                    {toolTipData.annotation && <p className="u-no-wrap u-margin-none">{toolTipData.annotation.str}</p>}
                  </button>
                </ToolTip>
              </div>
            </FocusTrap>
            <span
              className={styles["c-scale__input-thumb"]}
              style={{ top: isHorizontal ? 9 : `${100 - percent}%`, left: isHorizontal ? `${percent}%` : 10 }}
            ></span>
          </>
        )}
        <div
          className={classnames(
            styles["c-scale__gradient"],
            hasSmallLabels && styles["c-scale__gradient--small-labels"]
          )}
          style={style}
        />
        <input
          id="scale"
          type="range"
          orient={isHorizontal ? "horizontal" : "vertical"}
          aria-orientation={isHorizontal ? "horizontal" : "vertical"}
          value={valueParsed}
          min={min}
          max={max}
          {...rest}
          className="u-visually-hidden"
        />
      </div>
    </div>
  );
};

Scale.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  alt: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hasSmallLabels: PropTypes.bool,
  scaleUnit: PropTypes.string,
  readOnly: PropTypes.bool,
  isHorizontal: PropTypes.bool,
  toolTipData: PropTypes.object
};

Scale.defaultProps = {
  className: "",
  title: "Scale",
  min: 0,
  max: 100,
  value: 0,
  scaleUnit: "%",
  readOnly: true,
  isHorizontal: false,
  hasSmallLabels: false,
  toolTipData: {
    annotation: null,
    overlay: null,
    layer: null
  }
};

export default Scale;
