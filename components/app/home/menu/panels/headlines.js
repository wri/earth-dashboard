import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "../menu.module.scss";
import { connect } from "react-redux";
import { fetchHeadlines } from "services/gca";
import { setHeadlines } from "slices/headlines";
import { setCurrentTemplate } from "slices/templates";

import HeadlineCard from "components/app/home/headline-card";
import Headline from "components/app/home/headline";

const HeadlinesPanel = ({ headlines, setHeadlines, onForceInfoPage, forceInfoPage, setCurrentTemplate }) => {
  const [isFetching, setIsFetching] = useState(true);
  const [currentHeadline, setCurrentHeadline] = useState(null);

  useEffect(() => {
    if (!forceInfoPage) {
      setCurrentHeadline(null);
    }
  }, [forceInfoPage]);

  useEffect(() => {
    if (currentHeadline) {
      // Set default template
      setCurrentTemplate(currentHeadline.attributes.template);
    }
  }, [currentHeadline]);

  // Fetch Headlines from the GCA CMS
  useEffect(() => {
    setIsFetching(true);
    const getHeadlines = async () => {
      try {
        const resp = await fetchHeadlines();
        setHeadlines(resp.data.data);
      } catch (err) {
        console.log("Error fetching templates");
      } finally {
        setIsFetching(false);
      }
    };

    getHeadlines();
  }, [setHeadlines]);

  const onSelectHeadline = headline => {
    onForceInfoPage();
    setCurrentHeadline(headline);
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
        Learn more about the top headlines describing the climate emergency. Stay up to date with the news you need to
        know and the places that are being affected.
      </p>
      <div className={styles["c-home-menu__tab-panel-scroll-area"]}>
        {!isFetching ? (
          headlines.map(headline => (
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
  forceInfoPage: PropTypes.bool.isRequired
};

HeadlinesPanel.defaultProps = {};

export default connect(
  state => ({
    headlines: state.headlines.headlines
  }),
  { setHeadlines, setCurrentTemplate }
)(HeadlinesPanel);
