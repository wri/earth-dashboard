import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "../menu.module.scss";
import { connect } from "react-redux";
import { fetchHeadlines } from "services/gca";
import { setHeadlines } from "slices/headlines";
import HeadlineCard from "components/app/home/headline/component";

const HeadlinesPanel = ({ headlines, setHeadlines }) => {
  const [isFetching, setIsFetching] = useState(true);

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

  return (
    <>
      <p className={classnames(styles["c-home-menu__tab-description"], "u-margin-none")}>
        Learn more about the top headlines describing the climate emergency. Stay up to date with the news you need to
        know and the places that are being affected.
      </p>
      <div className={styles["c-home-menu__tab-panel-scroll-area"]}>
        {!isFetching ? (
          headlines.map(headline => (
            <HeadlineCard headline={headline} key={headline.id} className={styles["c-home-menu__headline"]} />
          ))
        ) : (
          <p>Loading</p>
        )}
      </div>
    </>
  );
};

HeadlinesPanel.propTypes = {};

HeadlinesPanel.defaultProps = {};

export default connect(
  state => ({
    headlines: state.headlines.headlines
  }),
  { setHeadlines }
)(HeadlinesPanel);
