import * as d3 from "utils/d3";
import { reorientController } from "utils/iframeBridge/iframeBridge";

const getZoomOut = earthServer => ({
  key: "zoom-out",
  name: "zoom-out",
  ref: el => {
    reorientController(d3.select(el), () => earthServer?.current?.reorient({ scaleBy: 0.95 }));
  },
  "aria-label": "Zoom out",
  className: "u-margin-right-xs"
});

export default getZoomOut;
