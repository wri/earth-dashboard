import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "../menu.module.scss";
import { connect } from "react-redux";
import { fetchClimateAlerts } from "services/gca";
import { setHeadlines, setCurrentHeadline, NAME as headlineSliceName } from "slices/headlines";
import { setCurrentMode } from "slices/modes";
import { fireEvent } from "utils/gtag";
import { CLIMATE_ALERT_EVENT_NAME } from "constants/tag-manager";

import HeadlineCard from "components/app/home/headline-card";
import Headline from "components/app/home/headline";

const MAX_NUMBER_OF_HEADLINES = 10;

const HeadlinesPanel = ({
  headlines,
  setHeadlines,
  onForceInfoPage,
  setCurrentMode,
  setCurrentHeadline,
  currentHeadline
}) => {
  const [isFetching, setIsFetching] = useState(true);
  const mostRecentHeadlines = useMemo(() => {
    const reversed = [...headlines].reverse();
    return reversed.slice(0, MAX_NUMBER_OF_HEADLINES);
  }, [headlines]);

  useEffect(() => {
    if (currentHeadline) {
      // Set default template
      setCurrentMode(currentHeadline.attributes.mode);
      // Open the info panel
      onForceInfoPage();
    }
  }, [currentHeadline, setCurrentMode]);

  // Fetch Headlines from the GCA CMS
  useEffect(() => {
    setIsFetching(true);
    const getHeadlines = async () => {
      try {
        const resp = await fetchClimateAlerts();
        setHeadlines(resp.data.data);
      } catch (err) {
        console.log("Error fetching modes");
      } finally {
        setIsFetching(false);
      }
    };

    getHeadlines();
  }, [setHeadlines]);

  const onSelectHeadline = headline => {
    setCurrentHeadline(headline);

    fireEvent(CLIMATE_ALERT_EVENT_NAME, headline.attributes?.title);
  };

  return currentHeadline ? (
    <div
      className={classnames(
        styles["c-home-menu__tab-panel-scroll-area"],
        styles["c-home-menu__tab-panel-scroll-area--slim"]
      )}
    >
      <Headline headline={currentHeadline} />
    </div>
  ) : (
    <>
      <p className={classnames(styles["c-home-menu__tab-description"], "u-margin-none")}>
        The effects of human-induced climate change can be seen and felt across the planet.
        <br />
        Explore the latest alerts from Mongabay below.
      </p>
      <div
        className={classnames(
          styles["c-home-menu__tab-panel-scroll-area"],
          styles["c-home-menu__tab-panel-scroll-area--extra-top"]
        )}
      >
        {!isFetching ? (
          mostRecentHeadlines.map(headline => (
            <HeadlineCard
              key={headline.id}
              as="button"
              headline={headline}
              className={styles["c-home-menu__headline"]}
              onClick={() => onSelectHeadline(headline)}
            />
          ))
        ) : (
          <p>Loading</p>
        )}
      </div>
    </>
  );
};

HeadlinesPanel.propTypes = {
  onForceInfoPage: PropTypes.func.isRequired,
  headlines: PropTypes.array.isRequired,
  setHeadlines: PropTypes.func.isRequired,
  forceInfoPage: PropTypes.bool.isRequired,
  currentHeadline: PropTypes.object,
  setCurrentHeadline: PropTypes.func.isRequired
};

HeadlinesPanel.defaultProps = {
  currentHeadline: null
};

export default connect(
  state => ({
    headlines: state[headlineSliceName].headlines,
    currentHeadline: state[headlineSliceName].currentHeadline
  }),
  { setHeadlines, setCurrentMode, setCurrentHeadline }
)(HeadlinesPanel);
