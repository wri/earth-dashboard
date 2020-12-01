import React from 'react';

// components
import LayoutHome from 'layout/app/home';

// constants
import { ABOUT_HEADER_TAB } from 'layout/header/constants';

function HomePage() {
  return (<LayoutHome 
    openHeaderMenu={true} 
    headerTabSelected={ABOUT_HEADER_TAB}
    title="What is the Earth Dashboard?"
    description="We created the Earth Dashboard as a “Situation Room” for the planet."
  />);
}

export default HomePage;
