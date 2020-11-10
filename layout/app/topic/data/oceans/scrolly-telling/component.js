import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import classnames from 'classnames';

// components
import TextBox from 'components/scrolly-telling/text-box';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// constants
import {OCEANS_STEPS, OCEANS_STEPS_INTRO } from './constants';

// styles
import styles from './oceans-scrolly-telling.module.scss';

function OceansScrollyTelling({ topic }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const isBrowser = typeof window !== 'undefined';
    
    const currentStep = OCEANS_STEPS[currentStepIndex];

    // This callback fires when a Step hits the offset threshold. It receives the
    // data prop of the step, which in this demo stores the index of the step.
    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
        console.log('onStepEnter!', data);
    };

    return (
        <div
            className={styles['c-oceans-scrolly-telling']}
        >
            <div className={styles['intro-story']}>
                <div className={styles['intro-charts-container']}>
                    <img src="/static/images/scrolly-telling/oceans/oceans-resources-charts.svg" />
                </div>
                {isBrowser &&
                    <div className={styles.steps}>
                        <Scrollama
                            onStepEnter={onStepEnter}
                            offset={0.6}
                        >
                            {OCEANS_STEPS_INTRO.map((step, stepIndex) => {

                                return (
                                    <Step data={stepIndex} key={`step-intro-${stepIndex}`}>
                                        <div className={styles['text-box-container']}>
                                            <TextBox
                                                text={step.textPanel.text}
                                                imageHeader={step.textPanel.imageHeader}
                                            />
                                        </div>
                                    </Step>
                                );
                            })
                            }
                        </Scrollama>
                    </div>
                }
            </div>
            <div className={styles.story}>
                <div className={styles['sticky-container']}>
                    <div className={styles['wrapper-container']}>
                        {currentStep.stickyContainerElement &&
                            <div className={classnames({
                                [styles['sticky-element']]: true,
                                [styles['-mobile']]: showMobileVersion
                            })}>
                                {currentStep.stickyContainerElement}
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
                            {OCEANS_STEPS.map((step, stepIndex) => {

                                return (
                                    <Step data={stepIndex} key={`step-${stepIndex}`}>
                                        <div className={styles['text-box-container']}>
                                            <TextBox
                                                text={step.textPanel.text}
                                                imageHeader={step.textPanel.imageHeader}
                                            />
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

export default OceansScrollyTelling;