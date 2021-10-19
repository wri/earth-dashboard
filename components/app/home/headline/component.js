/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./headline.module.scss";
import WidgetPreview from "components/widgets/preview";
import { useMemo, useEffect } from "react";
import { fireEvent } from "utils/gtag";
import { CLIMATE_ALERT_VIEW_FULL_ARTICLE_EVENT_NAME } from "constants/tag-manager";

const Headline = ({ headline, className, currentMode, setIsDatePickerDisabled, ...rest }) => {
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
    return () => setIsDatePickerDisabled(false);
  }, [setIsDatePickerDisabled]);

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
                <a href="https://resourcewatch.org/" target="_blank" rel="noreferrer">
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
  headline: PropTypes.object.isRequired,
  className: PropTypes.string,
  currentMode: PropTypes.object,
  setIsDatePickerDisabled: PropTypes.func.isRequired
};

Headline.defaultProps = {
  className: "",
  currentMode: null
};

export default Headline;
