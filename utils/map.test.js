import {
  getFriendlyOverlayDataBySamples,
  getFriendlyAnnotationDataBySamples,
  getOverlayData,
  getAnnotationData
} from "./map";
import { windParticulateFireSample, windParticulateOnlySample, windDataSample, baaSample } from "../test/mapSamples";
import { fires, wind, hasEnumOverlay } from "../test/layerSamples";

describe("Map utility", () => {
  test("getFriendlyOverlayDataBySamples returns a friendly format for overlaying scale data", () => {
    const expected = "Particulate Matter < 2.5 µm @ Surface: 21 µg/m^3";

    expect(getFriendlyOverlayDataBySamples(windParticulateFireSample, fires)).toEqual(expected);
  });

  test("getFriendlyOverlayDataBySamples returns a friendly format for overlaying scale data (alternate sample)", () => {
    const expected = "Wind @ Surface: 21 km/h";

    expect(getFriendlyOverlayDataBySamples(windDataSample, wind)).toEqual(expected);
  });

  test("getFriendlyOverlayDataBySamples handles an sample array with a length of two", () => {
    const expected = "Particulate Matter < 2.5 µm @ Surface: 14 µg/m^3";

    expect(getFriendlyOverlayDataBySamples(windParticulateOnlySample, fires)).toEqual(expected);
  });

  test("getFriendlyOverlayDataBySamples returns null when not given the right data", () => {
    expect(getFriendlyOverlayDataBySamples([], fires)).toBeNull();
    expect(getFriendlyOverlayDataBySamples([], [])).toBeNull();
    expect(getFriendlyOverlayDataBySamples(windParticulateFireSample, [])).toBeNull();
  });

  test("getFriendlyAnnotationDataBySamples returns a friendly format for annotation scale data", () => {
    const expected = "Fire Detections: 1.13 MW (October 17 at 23:20)";

    expect(getFriendlyAnnotationDataBySamples(windParticulateFireSample, fires)).toEqual(expected);
  });

  test("getOverlayData returns the correct data and friendly string", () => {
    const expected = {
      str: "Particulate Matter < 2.5 µm @ Surface: 21 µg/m^3",
      units: "µg/m^3",
      value: 20.653234705221482
    };

    expect(getOverlayData(windParticulateFireSample, fires)).toEqual(expected);
  });

  test("getAnnotationData returns the correct data and friendly string", () => {
    const expected = {
      date: "2021-10-17T23:20Z",
      coordinates: [29.542999267578125, -16.76799964904785],
      frp: 1.1299999952316284,
      units: "MW",
      str: "Fire Detections: 1.13 MW (October 17 at 23:20)"
    };

    expect(getAnnotationData(windParticulateFireSample, fires)).toEqual(expected);
  });

  test("getOverlayData returns the correct data when an enum overlay unit is given", () => {
    const expected = {
      str: "Bleaching Alert Area: Bleaching Watch",
      units: "heat_stress_level",
      value: 1
    };

    expect(getOverlayData(baaSample, hasEnumOverlay)).toEqual(expected);
  });
});
