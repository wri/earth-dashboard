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

function Desktop(props) {
  return (
    <Media
      greaterThanOrEqual="md"
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
  Mobile,
  MediaContextProvider,
  mediaStyle
};
