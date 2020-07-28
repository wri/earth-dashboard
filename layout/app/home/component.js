import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import { Link, Router } from 'routes';

// components
import Layout from 'layout/layout/layout-app';

// styles
import './styles.scss';

const IFRAME_SOURCES = [
  'https://www.youtube.com/embed/bFdPmiwZzVE?autoplay=1&controls=0',
  'https://resourcewatch.org/embed/data/explore/Coral-Bleaching-Frequency-Prediction?section=All%20data&zoom=1.7257785315276597&lat=-4.158823646934527&lng=89.79658291955457&pitch=0&bearing=0&basemap=satellite&labels=light&layers=%255B%257B%2522dataset%2522%253A%25221ef55baf-bbbe-480d-85e9-7132c742f196%2522%252C%2522opacity%2522%253A1%252C%2522layer%2522%253A%2522dc2c2cc8-a351-4221-ad16-0671bc430ada%2522%257D%255D&page=1&sort=relevance&sortDirection=-1&search=coral%20bleaching',
  'https://resourcewatch.org/embed/data/explore/bio005-Coral-Reef-Bleaching-Alerts?section=All%20data&zoom=1.7257785315276597&lat=-4.158823646934527&lng=89.79658291955457&pitch=0&bearing=0&basemap=aqueduct&labels=light&layers=%255B%257B%2522dataset%2522%253A%2522e2a2d074-8428-410e-920c-325bbe363a2e%2522%252C%2522opacity%2522%253A1%252C%2522layer%2522%253A%252231429259-9a9a-4d66-a1b9-92c08aa407f3%2522%257D%255D&page=1&sort=relevance&sortDirection=-1&search=coral%20bleaching'
];

const STEPS_CONTENT = [
  {
    description: 'This dataset was created by the World Resources Institute (WRI) in conjunction with Simon Donner at the University of British Columbia. It was created as part of the Reefs at Risk Revisited project to assess the status and threats to the world’s coral reefs. It can be used to help determine government policy and increase awareness on the issue. It strives to create public understanding on the importance of protecting coral reefs for future generations. Coral reefs play an integral role in the world. They are where over 25% of all marine species live and over 25 million people are directly reliant on coral reefs for their livelihood. They are the breeding grounds and nurseries for many species and without them the ocean would become much less productive.',
    iframe: null
  },
  {
    description: 'This is a description',
    iframe: <iframe src="https://resourcewatch.org/embed/widget/8aa36188-2e20-40a9-8735-107fa81f7ece" width="100%" height="500px" frameBorder="0" />
  },
  {
    description: 'Socioeconomic dependence and adaptive capacity of national fisheries in the coming century measured to determine their vulnerability. Sea surface temperature anomalies affect fishing markets, and this is projected to worsen.',
    iframe: <iframe src="https://resourcewatch.org/embed/widget/24b15bbf-edf9-4904-93d1-14e9476fa423" width="100%" height="500px" frameBorder="0" />
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
                      <div
                        className="step-panel"
                      >
                        <p>{stepObject.description}</p>
                        {stepObject.iframe}
                      </div>
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
