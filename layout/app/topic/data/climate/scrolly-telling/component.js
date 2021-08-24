import { useEffect, useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import * as d3 from "d3";
import classnames from "classnames";

// components
import TextBox from "components/scrolly-telling/text-box";

// utils
import { Mobile, Desktop, MediaContextProvider } from "utils/responsive";

// constants
import { CLIMATE_STEPS, CLIMATE_CLOCK_STEPS } from "./constants";

// styles
import styles from "./climate-scrolly-telling.module.scss";

function ClimateScrollyTelling({ topic }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStepIndexClock, setCurrentStepIndexClock] = useState(0);
  const isBrowser = typeof window !== "undefined";
  const currentStep = CLIMATE_STEPS[currentStepIndex];
  const currentStepClock = CLIMATE_CLOCK_STEPS[currentStepIndexClock];
  const [currentYear, setCurrentYear] = useState(2020);
  const [currentDegrees, setCurrentDegrees] = useState(1.0);

  const [counterData, setCounterData] = useState({
    seconds: 15,
    minutes: 19,
    hours: 19
  });
  const { seconds, minutes, hours } = counterData;

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);

    const step = CLIMATE_STEPS[data];
    const { showYearCounter, yearValue, previousYearValue, degrees, previousDegrees } = step;

    // ------ YEAR COUNTER COUNT UP EFFECT ------------------
    if (showYearCounter) {
      if (previousYearValue && yearValue) {
        for (let i = previousYearValue, j = 0; i <= yearValue; i++, j++) {
          setTimeout(() => {
            setCurrentYear(i);
          }, j * 50);
        }

        for (let i = previousDegrees, j = 0; i <= degrees; i = Math.round((i + 0.1) * 10) / 10, j++) {
          setTimeout(() => {
            setCurrentDegrees(i);
          }, j * 200);
        }
      } else if (yearValue) {
        setCurrentYear(yearValue);
        setCurrentDegrees(degrees);
      }
    }
    // ------------------------------------------------------
  };

  // ------------- SMOKE GENERATOR -----------------------
  useEffect(() => {
    if (isBrowser) {
      const canvas = document.getElementById("smoke-canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 1000;
      canvas.height = 600;
      const SmokeMachine = require("@bijection/smoke");
      const party = SmokeMachine(ctx, [54, 16.8, 18.2]);
      party.start();
      party.addSmoke(500, 500, 10);

      setInterval(() => {
        party.addSmoke(500, 500, 10);
      }, 400);
    }
  }, []);
  // ----------------------------------------------------

  // ----------- TIME COUNTER -------------
  useEffect(() => {
    const counterInterval = setInterval(() => {
      const newSeconds = counterData.seconds != 1 ? counterData.seconds - 1 : 59;
      const newMinutes = newSeconds === 59 ? counterData.minutes - 1 : counterData.minutes;
      setCounterData({
        seconds: newSeconds,
        minutes: newMinutes,
        hours
      });
    }, 1000);
    return () => {
      clearInterval(counterInterval);
    };
  }, [counterData]);
  // -------------------------------------

  const getStepContent = (mobile = false, step) => (
    <div
      className={classnames({
        "text-box-container": true,
        "-desktop": !mobile,
        "-mobile": mobile
      })}
    >
      <TextBox text={step.textPanel.text} imageHeader={step.textPanel.imageHeader} />
    </div>
  );

  const getVisualSources = (mobile, clockStory) => {
    const currentStepValue = clockStory ? currentStepClock : currentStep;
    return (
      <div
        className={classnames({
          [styles["visual-sources"]]: true,
          [styles["-mobile"]]: mobile,
          [styles["-desktop"]]: !mobile,
          [styles["-climate-story"]]: !clockStory
        })}
      >
        {currentStepValue.visualSource && <div className={styles.source}>Source: {currentStepValue.visualSource}</div>}
        {currentStepValue.visualDataset && (
          <div className={styles.dataset}>Dataset: {currentStepValue.visualDataset}</div>
        )}
      </div>
    );
  };

  const getSmokeContainer = mobile => (
    <>
      <div
        className={classnames({
          [styles["smoke-text"]]: true,
          [styles["-mobile"]]: mobile,
          [styles["-desktop"]]: !mobile
        })}
      >
        <h6>
          Time left until CO<sub>2</sub> budget depleted
        </h6>
        <h1>
          <span className={styles.rest}>7y 1m 26d {hours}h</span>
          <span className={styles.minutes}>{minutes}&apos;</span>
          <span className={styles["seconds-first-digit"]}>{secondsString[0]}</span>
          <span className={styles["seconds-second-digit"]}>{secondsString[1]}&apos;&apos;</span>
        </h1>
      </div>
      <canvas id="smoke-canvas" />
      {getVisualSources(!mobile, true)}
    </>
  );

  const getYearContainer = mobile => {
    const CustomHeaderTag1 = mobile ? "h2" : "h1";
    const CustomHeaderTag2 = mobile ? "h5" : "h2";
    return (
      <div
        className={classnames({
          [styles["year-container"]]: true,
          [styles["-mobile"]]: mobile,
          [styles["-desktop"]]: !mobile
        })}
        style={{ backgroundColor: currentStep.yearBackgroundColor }}
      >
        <CustomHeaderTag1 className={styles["year-value"]}>
          {currentYear}
          <span className={styles["degrees-container"]}> + {d3.format(".2n")(currentDegrees)} °C</span>
        </CustomHeaderTag1>
        <CustomHeaderTag2 className={styles["year-subtitle"]}>{currentStep.yearSubtitle}</CustomHeaderTag2>
      </div>
    );
  };

  const secondsString = seconds <= 9 ? `0${seconds}` : `${seconds}`;

  return (
    <div className={styles["c-climate-scrolly-telling"]}>
      <MediaContextProvider>
        {/* ----------------------- CLIMATE CLOCK ------------------------ */}
        <div className={styles["climate-clock-story"]}>
          <Desktop className={styles["smoke-container"]}>{getSmokeContainer(false)}</Desktop>
          <Mobile className={styles["smoke-container"]}>{getSmokeContainer(true)}</Mobile>
          {isBrowser && (
            <div className={styles.steps}>
              <Scrollama onStepEnter={({ data }) => setCurrentStepIndexClock(data)} offset={0.6}>
                {CLIMATE_CLOCK_STEPS.map((step, stepIndex) => (
                  <Step data={stepIndex} key={`step-clock-${stepIndex}`}>
                    <div>
                      <Desktop>{getStepContent(false, step)}</Desktop>
                      <Mobile>{getStepContent(true, step)}</Mobile>
                    </div>
                  </Step>
                ))}
              </Scrollama>
            </div>
          )}
        </div>
        {/* ---------------------- MAIN STORY ----------------------- */}
        <div className={styles.story}>
          <div className={styles["sticky-container"]}>
            <div className={styles["wrapper-container"]}>
              {currentStep.stickyContainerElement && (
                <>
                  <Desktop
                    className={classnames({
                      [styles["sticky-element"]]: true,
                      [styles["-desktop"]]: true
                    })}
                  >
                    {currentStep.stickyContainerElement}
                    {getVisualSources(false, false)}
                  </Desktop>
                  <Mobile
                    className={classnames({
                      [styles["sticky-element"]]: true,
                      [styles["-mobile"]]: true
                    })}
                  >
                    {currentStep.stickyContainerElement}
                    {getVisualSources(true, false)}
                  </Mobile>
                </>
              )}
              {currentStep.showYearCounter && (
                <>
                  <Desktop>{getYearContainer(false)}</Desktop>
                  <Mobile>{getYearContainer(true)}</Mobile>
                </>
              )}
            </div>
          </div>

          {isBrowser && (
            <div className={styles.steps}>
              <Scrollama onStepEnter={onStepEnter} offset={0.6}>
                {CLIMATE_STEPS.map((step, stepIndex) => (
                  <Step data={stepIndex} key={`step-${stepIndex}`}>
                    <div>
                      <Desktop>{getStepContent(false, step)}</Desktop>
                      <Mobile>{getStepContent(true, step)}</Mobile>
                    </div>
                  </Step>
                ))}
              </Scrollama>
            </div>
          )}
        </div>
      </MediaContextProvider>
    </div>
  );
}

export default ClimateScrollyTelling;
