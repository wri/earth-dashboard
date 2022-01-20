/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./headline.module.scss";
import WidgetPreview from "components/widgets/preview";
import { RESOURCE_WATCH_WIDGET_LINK } from "constants/widgets";
import { useMemo, useEffect } from "react";
import { fireEvent } from "utils/gtag";
import { CLIMATE_ALERT_VIEW_FULL_ARTICLE_EVENT_NAME } from "constants/tag-manager";

const Headline = ({
  isMobile,
  headline,
  className,
  currentMode,
  setIsDatePickerDisabled,
  setCurrentLocation,
  setCurrentScale,
  setCurrentScaleBy,
  setDateOfDataShown,
  setIsFetchLocationDisabled,
  ...rest
}) => {
  const isBrowser = typeof window !== "undefined";
  const activeLayerString = useMemo(() => {
    if (currentMode) {
      const defaultTemplateNames = currentMode.attributes.data_layers.default.map(layer => layer.attributes.title);
      return defaultTemplateNames.join(", ");
    }

    return "";
  }, [currentMode]);

  useEffect(() => {
    setIsDatePickerDisabled(true);
    setIsFetchLocationDisabled(true);

    return () => {
      setIsDatePickerDisabled(false);
      setIsFetchLocationDisabled(false);

      if (!isMobile) {
        setDateOfDataShown(new Date().toString());
      }
    };
  }, [setIsDatePickerDisabled, setIsFetchLocationDisabled, setDateOfDataShown]);

  useEffect(() => {
    if (headline?.attributes.location) {
      setCurrentLocation([headline?.attributes.location.lat, headline?.attributes.location.lng]);
      setCurrentScale(headline.attributes.zoom_level);
      setCurrentScaleBy(1);
    }

    if (headline?.attributes.climate_alert_date) {
      setDateOfDataShown(new Date(headline?.attributes.climate_alert_date).toString());
    }
  }, [headline, setCurrentLocation, setCurrentScale, setCurrentScaleBy, setDateOfDataShown]);

  return (
    <article className={classnames(styles["c-headline"], className)} {...rest} data-testid="headline">
      <h3 className={classnames(styles["c-headline__title"], "u-margin-none")}>{headline.attributes.title}</h3>
      <p className={classnames(styles["c-headline__body"], "u-margin-top-xs u-margin-bottom-l u-text-pre-line")}>
        {headline.attributes.content.body}
      </p>
      <div className={styles["c-headline__media-container"]}>
        {isBrowser && headline.attributes.content.media.widget?.attributes.widget_id && (
          <>
            <div className={styles["c-headline__widget"]}>
              <WidgetPreview
                widget={{ id: headline.attributes.content.media.widget.attributes.widget_id }}
                widgetShouldBeLoaded
              />
            </div>
            <div className={styles["c-headline__widget-source"]}>
              <p className="u-margin-vertical-xs">
                Source:
                <a
                  href={RESOURCE_WATCH_WIDGET_LINK + headline.attributes.content.media.widget.attributes.widget_id}
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  ResourceWatch
                </a>
              </p>
            </div>
          </>
        )}
        {headline.attributes.content.media.body_image && (
          <img
            className={styles["c-headline__image"]}
            src={headline.attributes.content.media.body_image}
            alt=""
            role="presentation"
          />
        )}
      </div>
      <div className={styles["c-headline__meta"]}>
        <p className="u-margin-none">Showing</p>
        <p className="u-margin-none">{activeLayerString}</p>
        <p className="u-margin-none">Affected Area</p>
        <p className="u-margin-none">{headline.attributes.location.name}</p>
      </div>
      <div className="u-text-right u-margin-top-m">
        <a
          href={headline.attributes.content.article_url}
          target="_blank"
          rel="noreferrer"
          className={classnames("c-button c-button--new-style c-button--flame", styles["c-headline__cta"])}
          onClick={() => fireEvent(CLIMATE_ALERT_VIEW_FULL_ARTICLE_EVENT_NAME, headline.attributes.title)}
        >
          View full article
        </a>
      </div>
    </article>
  );
};

Headline.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  headline: PropTypes.object.isRequired,
  className: PropTypes.string,
  currentMode: PropTypes.object,
  setIsDatePickerDisabled: PropTypes.func.isRequired,
  setCurrentLocation: PropTypes.func.isRequired,
  setCurrentScale: PropTypes.func.isRequired,
  setCurrentScaleBy: PropTypes.func.isRequired,
  setDateOfDataShown: PropTypes.func.isRequired
};

Headline.defaultProps = {
  className: "",
  currentMode: null
};

export default Headline;
