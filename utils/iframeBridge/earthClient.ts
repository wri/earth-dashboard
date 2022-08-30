import { EarthLayer } from "components/app/home/main-container/types";

export class EarthClient {
  public state = {};
  public allowClickEvents: boolean = false;

  /**
   * Invoked when any of the globe's state variables change.
   *
   * The available state variables and their meanings are documented in sharedStore.js and sessionStore.js.
   *
   * Example:
   *
   *     stateChanged({hd_enabled: true}, {hd_enabled: false});  // hd_enabled changed from false to true
   *
   * @see EarthServer.getState
   * @see EarthServer.saveState
   */
  public stateChanged(delta: Record<string, string>, old: Record<string, string>) {
    this.state = { ...this.state, ...delta };
  }

  /**
   * Invoked when any of the globe's layers change. All layers are provided each time this method is invoked.
   *
   * Schema for a layer:
   *     {
   *         type: <string>,  // one of "animation", "overlay", or "annotation"
   *         product: {
   *             name: <string>,               // name of the product, "wind", "temp", "cosc", "total_cloud_water"
   *             source: <string>,             // source of the data
   *             description: <string>,        //
   *             validTime: <string>,          // ISO date string for when the data is valid
   *             units: <object[]>,            // array of unit objects that describe the units of the product
   *             timeline: <object[]>,         // array of time intervals that describe the product's validity timeline
   *             nav: <object>,                // set of time navigation step operations
   *             supportedLevels: <string[]>,  // the set of z_level values that can be specified for this product
   *         }
   *     }
   *
   * Example:
   *
   *     layersChanged([
   *         {type: "animation", product: {name: "wind", ...}},
   *         {type: "overlay", product: {name: "temp", ...}},
   *         undefined,
   *     ]);
   */
  public layersChanged(layers: EarthLayer[]) {
    console.log("layers changed:", { layers });
  }

  /**
   * Invoked when the user clicks the globe.
   *
   * Example:
   *
   *     click([150, 273], [139.7, 35.7]);  // click occurred at x=150,y=273, corresponding to lon=139.7, lat=35.7
   */
  public click(point: [number, number], coords: [number, number]) {
    console.log("click:", { point, coords });
  }

  public reorientStart(payload: any) {
    console.log("reorientStart:", { payload });
  }

  public reorientStep(payload: any) {
    console.log("reorientStep:", { payload });
  }

  public reorientEnd(payload: any) {
    console.log("reorientEnd:", { payload });
  }
}
