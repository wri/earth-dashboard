import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import { Link, Router } from 'routes';

// components
import Layout from 'layout/layout/layout-app';
import TextBox from 'components/scrolly-telling/text-box';

// styles
import './styles.scss';

const IFRAME_SOURCES = [
  'https://www.youtube.com/embed/bFdPmiwZzVE?autoplay=1&controls=0',
  'https://resourcewatch.org/embed/data/explore/Coral-Bleaching-Frequency-Prediction?section=All%20data&zoom=1.7257785315276597&lat=-4.158823646934527&lng=89.79658291955457&pitch=0&bearing=0&basemap=satellite&labels=light&layers=%255B%257B%2522dataset%2522%253A%25221ef55baf-bbbe-480d-85e9-7132c742f196%2522%252C%2522opacity%2522%253A1%252C%2522layer%2522%253A%2522dc2c2cc8-a351-4221-ad16-0671bc430ada%2522%257D%255D&page=1&sort=relevance&sortDirection=-1&search=coral%20bleaching',
  'https://resourcewatch.org/embed/data/explore/bio005-Coral-Reef-Bleaching-Alerts?section=All%20data&zoom=1.7257785315276597&lat=-4.158823646934527&lng=89.79658291955457&pitch=0&bearing=0&basemap=aqueduct&labels=light&layers=%255B%257B%2522dataset%2522%253A%2522e2a2d074-8428-410e-920c-325bbe363a2e%2522%252C%2522opacity%2522%253A1%252C%2522layer%2522%253A%252231429259-9a9a-4d66-a1b9-92c08aa407f3%2522%257D%255D&page=1&sort=relevance&sortDirection=-1&search=coral%20bleaching'
];

const STEPS_CONTENT = [
  {
    description: 'The tiny trees here represent the estimated XX Ha of tree cover present in the world in the year 2000. That would be a tree cover area equivalent to a country like Mexico',
    iframe: null
  },
  {
    description: 'To get an idea of the scale, one tree represents XX Ha of tree cover, equivalent to an area the size of Monaco',
    iframe: null
  },
  {
    description: 'Let’s fast forward to 2020. This is how much of that 2000 tree cover is left. The world has lost the equivalent of the size of Belgium since 2000.',
    iframe: null
  }
];


function LayoutHome(props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isBrowser = typeof window !== 'undefined';

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  return (
    <Layout
      title="Earth Dashboard"
      description="Earth Dashboard"
      className="homepage"
    >

      <section
        className="header-section"
      >
        <h1>Earth Dashboard</h1>

      </section>

      {isBrowser &&
        <section
          className="story-section"
        >
          <h2>Coral Bleaching</h2>
          <div
            id="scrollama"
          >
            <div className="description">
              <p>The Frequency of Future Coral Reef Bleaching Events dataset shows the number of years during the 2030 and 2050 decades that coral bleaching is likely to occur from increased water temperature. The dataset relies on a thermal stress model that uses the units degree heating months (DHM) to determine risk of bleaching. A water temperature rise of 2 degrees celsius is equal to the National Oceanic and Atmospheric Administration (NOAA) Bleaching Alert Level 2, where bleaching will likely occur. The final dataset is presented at a gridded spatial resolution of 50 km and shows the number of years each grid cell will reach a DHM of at least 2 during the decade.</p>
            </div>
            <div className="story">
              <div className="main-map">
                <div>
                  <iframe src={IFRAME_SOURCES[currentStepIndex]} width="100%" height="500px" frameBorder="0" />
                </div>
              </div>
              <div className="steps">
                <Scrollama onStepEnter={onStepEnter}>
                  {STEPS_CONTENT.map((stepObject, stepIndex) => (
                    <Step data={stepIndex} key={stepIndex}>
                      <TextBox text={stepObject.description} />
                    </Step>
                  ))}
                </Scrollama>
              </div>
            </div>
          </div>
        </section>
      }
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
