import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Scrollama, Step } from 'react-scrollama';
import classnames from 'classnames';
let Globe = null;
if (typeof window !== 'undefined') {
  Globe = require('react-globe.gl').default;
}

// components
import TextBox from 'components/scrolly-telling/text-box';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// constants
import { BIODIVERSITY_STEPS } from './constants';

// styles
import styles from './biodiversity-scrolly-telling.module.scss';

function BiodiversityScrollyTelling({ topic }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isBrowser = typeof window !== 'undefined';
  const currentStep = BIODIVERSITY_STEPS[currentStepIndex];
  const { location, autoRotate, arcs } = currentStep;
  const globe = useRef();

  useEffect(() => {
    if (globe) {
      globe.current.controls().enableZoom = false;
    }
  }, [globe]);

  useEffect(() => {
    if (globe) {
      globe.current.pointOfView(location, 2000);

      if (autoRotate) {
        globe.current.controls().autoRotate = true;
      } else {
        globe.current.controls().autoRotate = false;
      }
    }
  }, [location, autoRotate]);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
    console.info('onStepEnter!', data);
  };

  const getStepContent = (mobile = false, step) => {
    return (
      <div className={classnames({
        'text-box-container': true,
        '-desktop': !mobile,
        '-mobile': mobile
      })}
      >
        <TextBox
          text={step.textPanel.text}
          imageHeader={step.textPanel.imageHeader}
        />
      </div>
    );
  };

  return (
    <div
      className={styles['c-biodiversity-scrolly-telling']}
    >
      <MediaContextProvider>
        {/* ---------------------- MAIN STORY ----------------------- */}
        <div className={styles.story}>
          <div className={styles['sticky-container']}>
            <div className={styles['wrapper-container']}>
              {isBrowser && (
                <Globe
                  ref={globe}
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                  className="globe"
                  arcLabel="label"
                  arcsData={arcs}
                  arcStartLat="latStart"
                  arcEndLat="latEnd"
                  arcStartLng="lngStart"
                  arcEndLng="lngEnd"
                  arcColor="color"
                  arcDashLength={Math.random()}
                  arcDashGap={Math.random()}
                  arcDashAnimateTime={(Math.random() * 1000) + 500}
                />
              )}
              {currentStep.stickyContainerElement && (
                <>
                  <Desktop className={classnames({
                    [styles['sticky-element']]: true,
                    [styles['-desktop']]: true
                  })}
                  >
                    {currentStep.stickyContainerElement}
                  </Desktop>
                  <Mobile className={classnames({
                    [styles['sticky-element']]: true,
                    [styles['-mobile']]: true
                  })}
                  >
                    {currentStep.stickyContainerElement}
                  </Mobile>
                </>
              )}
            </div>
          </div>

          {isBrowser &&
            <div className={styles.steps}>
              <Scrollama
                onStepEnter={onStepEnter}
                offset={0.6}
              >
                {BIODIVERSITY_STEPS.map((step, stepIndex) => (
                  <Step data={stepIndex} key={`step-${stepIndex}`}>
                    <div>
                      <Desktop>
                        {getStepContent(false, step)}
                      </Desktop>
                      <Mobile>
                        {getStepContent(true, step)}
                      </Mobile>
                    </div>
                  </Step>
                ))
                }
              </Scrollama>
            </div>
          }
        </div>
      </MediaContextProvider>
    </div >
  );
}

BiodiversityScrollyTelling.propTypes = { topic: PropTypes.string.isRequired };

export default BiodiversityScrollyTelling;
