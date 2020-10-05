import React, { useState, useEffect } from 'react';
import Particles from 'react-particles-js';
// import Globe from 'react-globe.gl';
// import { Scrollama, Step } from 'react-scrollama';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import { Link, Router } from 'routes';

// services
// import { fetchWidgets } from 'services/widget';

// components
import Layout from 'layout/layout/layout-app';
// import TextBox from 'components/scrolly-telling/text-box';
// import Trees from 'components/scrolly-telling/visualizations/trees';

// styles
import styles from './homepage.module.scss';
import WidgetPreview from 'components/admin/data/widgets/form/preview';

// constants
import { PARTICLES_DEFINITION } from './constants';

// import WidgetPreview from 'components/admin/data/widgets/form/preview';

// const VISUALIZATION_SOURCES = [
//   <Trees data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]} width={500} height={400} />,
//   <Trees data={[1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1]} width={500} height={400} />,
//   <Trees data={[0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1]} width={500} height={400} />
// ];

const STEPS_CONTENT = [
  {
    description: 'The tiny trees here represent the estimated XX Ha of tree cover present in the world in the year 2000. That would be a tree cover area equivalent to a country like Mexico',
    visualizationIndex: 0
  },
  {
    description: 'To get an idea of the scale, one tree represents XX Ha of tree cover, equivalent to an area the size of Monaco',
    visualizationIndex: 1
  },
  {
    description: 'Let’s fast forward to 2020. This is how much of that 2000 tree cover is left. The world has lost the equivalent of the size of Belgium since 2000.',
    visualizationIndex: 2
  }
];


function LayoutHome(props) {
  // const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // const [highlightedWidgets, setHighlightedWidgets] = useState([]);
  // const isBrowser = typeof window !== 'undefined';

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step
  // const onStepEnter = ({ data }) => {
  //   setCurrentStepIndex(data);
  // };

  // useEffect(() => {
  //   fetchWidgets({
  //     includes: 'metadata',
  //     application: process.env.APPLICATIONS,
  //     env: process.env.API_ENV
  //   })
  //     .then((widgets) => {
  //       setHighlightedWidgets(widgets.filter((widget) => {
  //         const metadata = widget.metadata;
  //         return metadata && metadata.length > 0 && metadata[0].info &&
  //           metadata[0].info.highlighted
  //       }));
  //     });
  // }, []);

  return (
    <Layout
      title="Earth Dashboard"
      description="Earth Dashboard"
      className={styles.homepage}
    >
      <Particles 
        className={styles.particles}
        params={PARTICLES_DEFINITION}
      />

      <div className={styles['main-title']}>
        <h1>Earth HQ</h1>
        <h5>A Global Commons alliance project, powered by RESOURCE WATCH</h5>
      </div>

      {/* <section
        className="header-section"
      >
        <h1>Earth Dashboard</h1>
      </section>

      {/* <section
        className="highlighted-widgets-section"
      >
        <h2>Highlighted widgets</h2>
        <div className="highlighted-widgets-container">
          <div className="row">
            { highlightedWidgets.map(hw => 
              <div
                key={`widget-box-${hw.id}`}
                className="column small-12 medium-6 widget-box"
              >
                <WidgetPreview widget={hw} />
              </div>
            )}
          </div>
        </div>
      </section>

      {isBrowser &&
        <section
          className="story-section"
        >
          <h2>Tree cover change insight</h2>
          <div
            id="scrollama"
          >
            <div className="description">
              <p>Lorem ipsum dolor</p>
            </div>
            <div className="story">
              <div className="main-map">
                {VISUALIZATION_SOURCES[currentStepIndex]}
              </div>
              <div className="steps">
                <Scrollama onStepEnter={onStepEnter}>
                  {STEPS_CONTENT.map((stepObject, stepIndex) => (
                    <Step data={stepIndex} key={stepIndex}>
                      <div>
                        <TextBox text={stepObject.description} />
                      </div>
                    </Step>
                  ))}
                </Scrollama>
              </div>
            </div>
          </div>
        </section>
      } */}
    </Layout>
  );
}

// const step_spec =
// { 
//   title: "Story title",
//   description: "Story description",
//   steps: [
//     {
//       offsetTop: 1000,
//       offsetBottom: 1000,
//       widget: "widget-id/null",
//       iframe: {
//         src: "",
//         width: "",
//         height: ""
//       }
//     }
//   ]
// };

export default LayoutHome;
