/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "../menu.module.scss";
import { connect } from "react-redux";
import { setCurrentMode, NAME as modesSliceName } from "slices/modes";
import headlineStyles from "components/app/home/headline-card/headline.module.scss";
import { RadioGroup } from "@headlessui/react";

const DataHighlightsPanel = ({ setCurrentMode, currentMode, highlights }) => {
  return (
    <>
      <p className={classnames(styles["c-home-menu__tab-description"], "u-margin-none")}>
        View dynamic data of weather conditions in near-real time to understand the global crisis. Powered by Earth
        Nullschool.
      </p>
      <div className={styles["c-home-menu__tab-panel-scroll-area"]}>
        <RadioGroup
          value={currentMode.id}
          onChange={id => setCurrentMode(highlights.find(highlight => highlight.id === id))}
        >
          <RadioGroup.Label className="u-visually-hidden">Data Highlights</RadioGroup.Label>
          {highlights.map(hightlight => (
            <RadioGroup.Option
              key={hightlight.id}
              value={hightlight.id}
              className={classnames(headlineStyles["c-headline-card"], "u-margin-bottom-xs")}
            >
              <img
                className={classnames(
                  headlineStyles["c-headline-card__image"],
                  headlineStyles["c-headline-card__image--small-sq"]
                )}
                src={hightlight.attributes.icon}
                alt=""
                role="presentation"
              />
              <div>
                <RadioGroup.Label as="h3" className={headlineStyles["c-headline-card__title"]}>
                  {hightlight.attributes.title}
                </RadioGroup.Label>
                <RadioGroup.Description as="p" className={headlineStyles["c-headline-card__subtitle"]}>
                  {hightlight.attributes.description}
                </RadioGroup.Description>
              </div>
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};

DataHighlightsPanel.propTypes = {
  setCurrentMode: PropTypes.func.isRequired,
  currentMode: PropTypes.object,
  highlights: PropTypes.array
};

DataHighlightsPanel.defaultProps = {
  highlights: [],
  currentMode: null
};

export default connect(
  state => ({
    highlights: state[modesSliceName].allModes?.filter(mode => mode.attributes.visibility.data_highlights),
    currentMode: state[modesSliceName].currentMode
  }),
  { setCurrentMode }
)(DataHighlightsPanel);
