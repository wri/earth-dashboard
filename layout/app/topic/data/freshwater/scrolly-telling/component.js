import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';

// components
import TextBox from 'components/scrolly-telling/text-box';

// constants
import { FRESHWATER_STEPS } from './constants';

// styles
import styles from './freshwater-scrolly-telling.module.scss';

function FreshwaterScrollyTelling(props) {
    const [currentStepIndex, setCurrentStepIndex] = useState(null);
    const isBrowser = typeof window !== 'undefined';

    // This callback fires when a Step hits the offset threshold. It receives the
    // data prop of the step, which in this demo stores the index of the step.
    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
        console.log('onStepEnter!', data);
    };

    return (
        <div className={styles['c-freshwater-scrolly-telling']}>

            <div className={styles.story}>
                <div className={styles['water-drop-container']}>
                    <div className={styles['water-drop-background']}>
                        <img src="/static/images/scrolly-telling/freshwater/isometric_terrain.png" />
                    </div>
                    <div className={styles['water-drop']}>
                        <img src="/static/images/scrolly-telling/freshwater/drop.png" />
                    </div>
                </div>
                {isBrowser &&
                    <div className={styles.steps}>
                        <Scrollama onStepEnter={onStepEnter} debug>
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
            </div>
        </div>
    );
}

export default FreshwaterScrollyTelling;