import React from 'react';

// components
import LayoutHome from 'layout/app/home';

// constants
import { ABOUT_HEADER_TAB } from 'layout/header/constants';

function HomePage() {
  return (<LayoutHome openHeaderMenu={true} headerTabSelected={ABOUT_HEADER_TAB} />);
}

export default HomePage;
