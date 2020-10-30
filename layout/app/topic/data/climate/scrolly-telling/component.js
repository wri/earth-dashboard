import React, { useState } from 'react';
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

    // This callback fires when a Step hits the offset threshold. It receives the
    // data prop of the step, which in this demo stores the index of the step.
    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
        console.log('onStepEnter!', data);
    };

    return (
        <div
            className={styles['c-climate-scrolly-telling']}
        >
            <div className={styles.story}>
                <div className={styles['sticky-container']}>
                    <div className={styles['wrapper-container']}>
                        {/* {currentStep.stickyContainerElement &&
                            <div className={classnames({
                                [styles['sticky-element']]: true,
                                [styles['-mobile']]: isTabletOrMobile
                            })}>
                                {currentStep.stickyContainerElement}
                            </div>
                        } */}
                        {currentStep.showYearCounter &&
                            <div className={styles['year-container']}>
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