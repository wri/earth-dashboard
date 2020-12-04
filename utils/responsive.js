import { createMedia } from "@artsy/fresnel";

const breakpoints = {
  sm: 0,
  md: 768,
  lg: 1024,
  xl: 1192,
  xxl: 1440
};

const EDMedia = createMedia({ breakpoints });
const { MediaContextProvider, Media } = EDMedia;
const mediaStyle = EDMedia.createMediaStyle();

function Desktop({ children, className, includeBiggerScreens = true }) {
  return (
    <Media
      {...(includeBiggerScreens && {greaterThanOrEqual: 'md' })}
      {...(!includeBiggerScreens && { at: 'md' })}
      className={className}>
      {children}
    </Media>);
};

function DesktopLarge({ children, className, includeBiggerScreens = true }) {
  return (
    <Media
      {...(includeBiggerScreens && { greaterThanOrEqual: 'lg' })}
      {...(!includeBiggerScreens && { at: 'lg' })}
      className={className}>
      {children}
    </Media>);
};

function DesktopXLarge(props) {
  return (
    <Media
      greaterThanOrEqual="xl"
      className={props.className}>
      {props.children}
    </Media>);
};

function Mobile(props) {
  return (
    <Media
      lessThan="md"
      className={props.className}>
      {props.children}
    </Media>);
};

export {
  breakpoints,
  Desktop,
  DesktopLarge,
  DesktopXLarge,
  Mobile,
  MediaContextProvider,
  mediaStyle
};
