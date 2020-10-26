import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import { useMediaQuery } from 'react-responsive';
import classnames from 'classnames';

// components
import TextBox from 'components/scrolly-telling/text-box';

// constants
import { FRESHWATER_STEPS } from './constants';

// styles
import styles from './freshwater-scrolly-telling.module.scss';

function FreshwaterScrollyTelling(props) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const isBrowser = typeof window !== 'undefined';
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1024 });

    // This callback fires when a Step hits the offset threshold. It receives the
    // data prop of the step, which in this demo stores the index of the step.
    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
        console.log('onStepEnter!', data);
    };

    return (
        <div
            className={styles['c-freshwater-scrolly-telling']}
        >
            <div className={styles.story}>
                <div className={classnames({
                    [styles['water-drop-container']]: true,
                    [styles['-mobile']]: isTabletOrMobile
                })}>
                    <div className={styles['water-drop-elements']}>
                        <div className={styles['water-drop-plus-background']}>
                            <div className={styles['water-drop-background']}>
                                <img src="/static/images/scrolly-telling/freshwater/isometric_terrain.svg" />
                            </div>
                            <div className={styles['water-drop']}>
                                {FRESHWATER_STEPS[currentStepIndex].dropImage}
                            </div>
                        </div>
                        {FRESHWATER_STEPS[currentStepIndex].extraElement}
                    </div>
                </div>
                {isBrowser &&
                    <div className={classnames({
                        [styles.steps]: true,
                        [styles['-mobile']]: isTabletOrMobile
                    })}>
                        <Scrollama
                            onStepEnter={onStepEnter}
                            offset={0.5}
                        >
                            {FRESHWATER_STEPS.map((step, stepIndex) => {

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
                {/* <div className={styles['worldmap-container']}>
                    <img src="/static/images/scrolly-telling/freshwater/worldmap.svg" />
                </div> */}
            </div>
        </div>
    );
}

export default FreshwaterScrollyTelling;