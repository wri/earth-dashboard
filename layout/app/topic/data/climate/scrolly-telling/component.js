import React, { useEffect, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import d3 from 'd3';
import classnames from 'classnames';

// components
import TextBox from 'components/scrolly-telling/text-box';

// utils
import { getColorByTopic } from 'utils/topics';
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// constants
import { CLIMATE_STEPS, CLIMATE_CLOCK_STEPS } from './constants';

// styles
import styles from './climate-scrolly-telling.module.scss';

function ClimateScrollyTelling({ topic }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isBrowser = typeof window !== 'undefined';
  const currentStep = CLIMATE_STEPS[currentStepIndex];
  const topicColor = getColorByTopic(topic);
  
  const [counterData, setCounterData] = useState({
    seconds: 15,
    minutes: 19,
    hours: 19,
    tones: 300445753479
  });
  const { seconds, minutes, hours, tones } = counterData;

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
    console.log('onStepEnter!', data);
  };

  // ------------- SMOKE GENERATOR -----------------------
  useEffect(() => {
    if (isBrowser) {
      const canvas = document.getElementById('smoke-canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1000;
      canvas.height = 600;
      const SmokeMachine = require('@bijection/smoke');
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
      const newSeconds = (counterData.seconds != 0) ? counterData.seconds - 1 : 59;
      const newMinutes = newSeconds === 60 ? counterData.minutes - 1 : counterData.minutes;
      setCounterData({
        tones: counterData.tones - (Math.round(Math.random() * 100) % 30),
        seconds: newSeconds,
        minutes: newMinutes
      });
    }, 1000);
    return () => {
      clearInterval(counterInterval);
    };
  }, [counterData]);
  // -------------------------------------


  return (
    <div
      className={styles['c-climate-scrolly-telling']}
    >
      {/* ----------------------- CLIMATE CLOCK ------------------------ */}
      <div className={styles['climate-clock-story']}>
        <div className={styles['smoke-container']}>
          <div className={styles['smoke-text']}>
            <h6>Time left until CO<sub>2</sub> budget depleted</h6>
            <h1>7y 1m 26d {hours}h {minutes}' {seconds}''</h1>
            <h6>CO<sub>2</sub> budget left</h6>
            <h1>{d3.format(',')(tones)} tons</h1>
          </div>
          <canvas id="smoke-canvas" />
        </div>
        {isBrowser &&
          <div className={styles.steps}>
            <Scrollama
              onStepEnter={onStepEnter}
              offset={0.6}
            >
              {CLIMATE_CLOCK_STEPS.map((step, stepIndex) =>
                (<Step data={stepIndex} key={`step-clock-${stepIndex}`}>
                  <div
                    className={classnames({
                      [styles['text-box-container']]: true,
                      [styles['-mobile']]: showMobileVersion
                    })}
                  >
                    <TextBox text={step.textPanel.text} />
                  </div>
                </Step>))
              }
            </Scrollama>
          </div>
        }
      </div>
      {/* ---------------------- MAIN STORY ----------------------- */}
      <div className={styles.story}>
        <div className={styles['sticky-container']}>
          <div className={styles['wrapper-container']}>
            {/* {currentStep.stickyContainerElement &&
                            <div className={classnames({
                                [styles['sticky-element']]: true,
                                [styles['-mobile']]: showMobileVersion
                            })}>
                                {currentStep.stickyContainerElement}
                            </div>
                        } */}
            {currentStep.showYearCounter &&
              <div
                className={styles['year-container']}
                style={{ backgroundColor: currentStep.yearBackgroundColor }}
              >
                <div
                  className={styles['year-value']}
                >
                  {currentStep.yearValue}
                </div>
                <div className={styles['year-subtitle']}>
                  {currentStep.yearSubtitle}
                </div>
              </div>
            }
          </div>
        </div>

        {isBrowser &&
          <div className={styles.steps}>
            <Scrollama
              onStepEnter={onStepEnter}
              offset={0.6}
            >
              {CLIMATE_STEPS.map((step, stepIndex) => (
                <Step data={stepIndex} key={`step-${stepIndex}`}>
                  <div
                    className={classnames({
                      [styles['text-box-container']]: true,
                      [styles['-mobile']]: showMobileVersion
                    })}
                  >
                    <TextBox
                      text={step.textPanel.text} 
                      imageHeader={step.textPanel.imageHeader} 
                    />
                  </div>
                </Step>
              ))
              }
            </Scrollama>
          </div>
        }
      </div>
    </div >
  );
}

export default ClimateScrollyTelling;
