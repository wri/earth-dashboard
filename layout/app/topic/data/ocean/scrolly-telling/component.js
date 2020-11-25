import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import classnames from 'classnames';

// components
import TextBox from 'components/scrolly-telling/text-box';

// utils
import { Mobile, Desktop, MediaContextProvider } from 'utils/responsive';

// constants
import { OCEAN_STEPS, OCEAN_STEPS_INTRO } from './constants';

// styles
import styles from './ocean-scrolly-telling.module.scss';

function OceansScrollyTelling({ topic }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const isBrowser = typeof window !== 'undefined';

    const currentStep = OCEAN_STEPS[currentStepIndex];

    // This callback fires when a Step hits the offset threshold. It receives the
    // data prop of the step, which in this demo stores the index of the step.
    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
        console.log('onStepEnter!', data);
    };

    const getStepContent = (mobile = false, step) =>
        <div className={classnames({
            'text-box-container': true,
            '-desktop': !mobile,
            '-mobile': mobile,
        })}>
            <TextBox
                text={step.textPanel.text}
                imageHeader={step.textPanel.imageHeader}
            />
        </div>;

    // const getStickyContainerElement = (mobile = false, container) =>
    //     <div className={classnames({
    //         [styles['sticky-element']]: true,
    //         [styles['-desktop']]: !mobile,
    //         [styles['-mobile']]: mobile,
    //     })}>
    //         {container}
    //     </div>;

    return (
        <div
            className={styles['c-ocean-scrolly-telling']}
        >
            <MediaContextProvider>
                <div className={styles['intro-story']}>
                    <div className={styles['intro-charts-container']}>
                        <img src="/static/images/scrolly-telling/ocean/ocean-resources-charts.svg" />
                    </div>
                    {isBrowser &&
                        <div className={styles.steps}>
                            <Scrollama
                                onStepEnter={onStepEnter}
                                offset={0.6}
                            >
                                {OCEAN_STEPS_INTRO.map((step, stepIndex) => {
                                    return (
                                        <Step data={stepIndex} key={`step-intro-${stepIndex}`}>
                                            <div>
                                                <Desktop>
                                                    {getStepContent(false, step)}
                                                </Desktop>
                                                <Mobile>
                                                    {getStepContent(true, step)}
                                                </Mobile>
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
                        {currentStep.stickyContainerElement &&
                            <div className={styles['wrapper-container']}>
                                <Desktop className={classnames({
                                    [styles['sticky-element']]: true,
                                    [styles['-desktop']]: true
                                })}>
                                    {currentStep.stickyContainerElement}
                                </Desktop>
                                <Mobile className={classnames({
                                    [styles['sticky-element']]: true,
                                    [styles['-desktop']]: true
                                })}>
                                    {currentStep.stickyContainerElement}
                                </Mobile>
                            </div>
                        }
                    </div>
                    {isBrowser &&
                        <div className={styles.steps}>
                            <Scrollama
                                onStepEnter={onStepEnter}
                                offset={0.6}
                            >
                                {OCEAN_STEPS.map((step, stepIndex) => {
                                    return (
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
                                    );
                                })
                                }
                            </Scrollama>
                        </div>
                    }
                </div>
            </MediaContextProvider>
        </div >
    );
}

export default OceansScrollyTelling;