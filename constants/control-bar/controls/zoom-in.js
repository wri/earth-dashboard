import zoomInIcon from "public/static/icons/zoom-in.svg";
import * as d3 from "utils/d3";
import { reorientController } from "utils/iframeBridge/iframeBridge";

const getZoomIn = earthServer => ({
  key: "zoom-in",
  icon: zoomInIcon,
  ref: el => {
    reorientController(d3.select(el), () => earthServer?.current?.reorient({ scaleBy: 1.05 }));
  },
  "aria-label": "Zoom in",
  className: "u-margin-right-xs"
});

export default getZoomIn;
