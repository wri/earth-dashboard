import { useEffect, useMemo, useState } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./scale.module.scss";
import FocusTrap from "focus-trap-react";
import ToolTip from "components/ui/tooltip";
import useDataLayers from "hooks/useDataLayers";
import { SCALE_TYPES } from "constants/map";
import { DATA_LAYER_TYPES } from "constants/datalayers";
import { useIframeBridgeContext } from "hooks/useIframeBridge";

const Scale = props => {
  const { className, isHorizontal, value, currentMode, datasetValue, hidden, hideTooltipLabel, setInfoMode, ...rest } =
    props;

  const {
    scaleData = { min: 0, max: 100, unitSymbol: "%", hasSmallLabels: false },
    scaleToolTipData: toolTipData = { annotation: null, overlay: null, layer: null },
    overlayLayer
  } = useIframeBridgeContext();
  const { min, max, unitSymbol: scaleUnit, hasSmallLabels } = scaleData;
  const scaleGradient = overlayLayer?.product.scale.getCss(isHorizontal ? 90 : 0);

  const datasetLayers = useDataLayers(currentMode, DATA_LAYER_TYPES.dataset);
  const [shouldShowToolTip, setShouldShowToolTip] = useState(false);
  const minLabel = `${min}${scaleUnit}`.length > 9 ? `${min} ${scaleUnit}` : `${min}${scaleUnit}`;
  const maxLabel = `${max}${scaleUnit}`.length > 9 ? `${max} ${scaleUnit}` : `${max}${scaleUnit}`;
  const style = { "--min": `"${minLabel}"`, "--max": `"${maxLabel}"`, "--gradient": scaleGradient };

  // const scaleLabel = useMemo(() => {
  //   const layer = datasetLayers.find(layer => layer.attributes.data_key === datasetValue);
  //
  //   return layer?.attributes?.title || "Scale";
  // }, [datasetValue]);

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

  if (hidden) {
    return (
      <div
        className={classnames(className, styles["c-scale--hidden"], isHorizontal && styles["c-scale--horizontal"])}
      ></div>
    );
  }

  return (
    <div className={classnames(className, styles["c-scale"], isHorizontal && styles["c-scale--horizontal"])}>
      <label htmlFor="scale" style={!currentMode.attributes.scale_info_detail ? { minWidth: "auto" } : {}}>
        Scale
        {currentMode.attributes.scale_info_detail && (
          <span className={styles["info"]} onClick={() => setInfoMode(currentMode)} />
        )}
      </label>
      <div className={styles["c-scale__input-container"]}>
        {shouldShowToolTip && !Number.isNaN(percent) && (
          <>
            {!hideTooltipLabel && (
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
                    arrowPosition={isHorizontal ? "none" : "right"}
                    className={styles["c-scale__tooltip-item"]}
                  >
                    <button
                      className="u-button-no-style"
                      aria-label="Close tooltip"
                      onClick={() => setShouldShowToolTip(false)}
                    >
                      {toolTipData.overlay && <p className="u-no-wrap u-margin-none">{toolTipData.overlay.str}</p>}
                      {toolTipData.annotation && (
                        <p className="u-no-wrap u-margin-none">{toolTipData.annotation.str}</p>
                      )}
                    </button>
                  </ToolTip>
                </div>
              </FocusTrap>
            )}
            <span
              className={styles["c-scale__input-thumb"]}
              style={{ top: isHorizontal ? 0 : `${100 - percent}%`, left: isHorizontal ? `${percent}%` : `50%` }}
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
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  currentMode: PropTypes.object,
  datasetValue: PropTypes.string,
  hidden: PropTypes.bool,
  isHorizontal: PropTypes.bool,
  hideTooltipLabel: PropTypes.bool
};

Scale.defaultProps = {
  className: "",
  value: "0%",
  readOnly: true,
  hidden: false,
  isHorizontal: false,
  hideTooltipLabel: false
};

export default Scale;
