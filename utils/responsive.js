import { createMedia } from "@artsy/fresnel";

const breakpoints = {
  sm: 0,
  md: 768,
  lg: 1024,
  xl: 1192,
};

const EDMedia = createMedia({ breakpoints });
const { MediaContextProvider, Media } = EDMedia;
const mediaStyle = EDMedia.createMediaStyle();

function Desktop({ children, className, includeBiggerScreens = true }) {
  return (
    <Media
      greaterThanOrEqual="md"
      {...(!includeBiggerScreens && { lessThan: 'lg' })}
      className={props.className}>
      {props.children}
    </Media>);
};

function DesktopLarge({ children, className, includeBiggerScreens = true }) {
  return (
    <Media
      greaterThanOrEqual="lg"
      {...(!includeBiggerScreens && { lessThan: 'xl' })}
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
