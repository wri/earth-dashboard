import React, { useEffect, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import classnames from 'classnames';

// components
import TextBox from 'components/scrolly-telling/text-box';

// utils
import { getColorByTopic } from 'utils/topics';
import { getShowMobileVersion } from 'utils/responsive';

// constants
import { CLIMATE_STEPS } from './constants';

// styles
import styles from './climate-scrolly-telling.module.scss';

function ClimateScrollyTelling({ topic }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const isBrowser = typeof window !== 'undefined';
    const currentStep = CLIMATE_STEPS[currentStepIndex];
    const topicColor = getColorByTopic(topic);
    const showMobileVersion = getShowMobileVersion();
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
            var canvas = document.getElementById('smoke-canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = 1000;
            canvas.height = 600;
            let SmokeMachine = require('@bijection/smoke');
            const party = SmokeMachine(ctx, [54, 16.8, 18.2]);
            party.start();
            party.addSmoke(500, 500, 10);

            setInterval(function () {
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
            })
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
            <div className={styles.story}>
                <div className={styles['smoke-container']}>
                    <div className={styles['smoke-text']}>
                        <h6>Time left until CO2 budget depleted</h6>
                        <h1>7y 1m 26d {hours}h {minutes}' {seconds}''</h1>
                        <h6>CO2 budget left</h6>
                        <h1>{tones} tons</h1>
                    </div>
                    <canvas id="smoke-canvas" />
                </div>
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
                            {CLIMATE_STEPS.map((step, stepIndex) => {

                                return (
                                    <Step data={stepIndex} key={`step-${stepIndex}`}>
                                        <div className={styles['text-box-container']}>
                                            <TextBox text={step.textPanel.text} />
                                        </div>
                                    </Step>
                                );
                            })
                            }
                        </Scrollama>
                    </div>
                }
            </div>
        </div >
    );
}

export default ClimateScrollyTelling;