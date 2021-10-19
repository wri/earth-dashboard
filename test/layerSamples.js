export const fires = [
  {
    type: "animation",
    product: {
      name: "wind",
      source: "GFS / NCEP / US National Weather Service",
      description: "Wind @ Surface",
      validTime: "2021-10-18 13:00Z",
      units: {
        "km/h": {
          symbol: "km/h",
          symbolHTML: "km/h",
          precision: 0,
          convention: "into"
        },
        "m/s": {
          symbol: "m/s",
          symbolHTML: "m/s",
          precision: 1,
          convention: "into"
        },
        kn: {
          symbol: "kn",
          symbolHTML: "kn",
          precision: 0,
          convention: "into"
        },
        mph: {
          symbol: "mph",
          symbolHTML: "mph",
          precision: 0,
          convention: "into"
        }
      },
      timeline: [
        {
          type: "recurring_interval",
          start: "2013-11-01T00:00Z",
          end: "2021-01-01T00:00Z",
          frequency: {
            hours: 3
          }
        },
        {
          type: "recurring_interval",
          start: "2021-01-01T00:00Z",
          frequency: {
            hours: 1
          }
        }
      ],
      nav: {
        prev2: "-8 hours",
        prev1: "-1 hour",
        next1: "+1 hour",
        next2: "+8 hours"
      },
      supportedLevels: ["surface", "1000hPa", "850hPa", "700hPa", "500hPa", "250hPa", "70hPa", "10hPa"],
      scale: {
        range: {
          "km/h": [0, 360],
          "m/s": [0, 100],
          kn: [0, 194.3844],
          mph: [0, 223.6936]
        },
        colors: {
          0: 0,
          1: 0,
          2: 255,
          3: 255,
          4: 0,
          5: 2,
          6: 254,
          7: 255,
          8: 0,
          9: 4,
          10: 254
        }
      }
    }
  },
  {
    type: "overlay",
    product: {
      name: "pm2.5",
      source: "CAMS / Copernicus / European Commission + ECMWF",
      description: "Particulate Matter < 2.5 µm @ Surface",
      validTime: "2021-10-18 13:00Z",
      units: {
        "µg/m^3": {
          symbol: "µg/m^3",
          symbolHTML: "µg/m<sup>3</sup>",
          precision: 0
        }
      },
      timeline: [
        {
          type: "recurring_interval",
          start: "2017-06-02T01:00Z",
          frequency: {
            hours: 1
          }
        }
      ],
      nav: {
        prev2: "-8 hours",
        prev1: "-1 hour",
        next1: "+1 hour",
        next2: "+8 hours"
      },
      scale: {
        range: {
          "µg/m^3": [1.0000000000000007, 1000.0000000000003]
        },
        colors: {
          0: 8,
          1: 29,
          2: 88,
          3: 255,
          4: 8,
          5: 29,
          6: 88,
          7: 255,
          8: 8,
          9: 29,
          10: 89
        }
      }
    }
  },
  {
    type: "annotation",
    product: {
      name: "fires",
      source: "VIIRS NRT / FIRMS / EOSDIS / NASA",
      description: "Fire Detections",
      units: {
        MW: {
          symbol: "MW",
          symbolHTML: "MW",
          precision: 2
        }
      },
      timeline: [
        {
          type: "continuous",
          start: "2021-04-13T02:00Z"
        }
      ],
      scale: {
        range: {
          MW: [0, 50]
        },
        colors: {
          0: 128,
          1: 0,
          2: 38,
          3: 255,
          4: 129,
          5: 0,
          6: 38,
          7: 255,
          8: 129,
          9: 0,
          10: 38
        }
      }
    }
  }
];

export const wind = [
  {
    type: "animation",
    product: {
      name: "wind",
      source: "GFS / NCEP / US National Weather Service",
      description: "Wind @ Surface",
      validTime: "2021-10-18 13:00Z",
      units: {
        "km/h": {
          symbol: "km/h",
          symbolHTML: "km/h",
          precision: 0,
          convention: "into"
        },
        "m/s": {
          symbol: "m/s",
          symbolHTML: "m/s",
          precision: 1,
          convention: "into"
        },
        kn: {
          symbol: "kn",
          symbolHTML: "kn",
          precision: 0,
          convention: "into"
        },
        mph: {
          symbol: "mph",
          symbolHTML: "mph",
          precision: 0,
          convention: "into"
        }
      },
      timeline: [
        {
          type: "recurring_interval",
          start: "2013-11-01T00:00Z",
          end: "2021-01-01T00:00Z",
          frequency: {
            hours: 3
          }
        },
        {
          type: "recurring_interval",
          start: "2021-01-01T00:00Z",
          frequency: {
            hours: 1
          }
        }
      ],
      nav: {
        prev2: "-8 hours",
        prev1: "-1 hour",
        next1: "+1 hour",
        next2: "+8 hours"
      },
      supportedLevels: ["surface", "1000hPa", "850hPa", "700hPa", "500hPa", "250hPa", "70hPa", "10hPa"],
      scale: {
        range: {
          "km/h": [0, 360],
          "m/s": [0, 100],
          kn: [0, 194.3844],
          mph: [0, 223.6936]
        },
        colors: {
          0: 0,
          1: 0,
          2: 255,
          3: 255,
          4: 0,
          5: 2,
          6: 254,
          7: 255,
          8: 0,
          9: 4,
          10: 254
        }
      }
    }
  },
  {
    type: "overlay",
    product: {
      name: "wind",
      source: "GFS / NCEP / US National Weather Service",
      description: "Wind @ Surface",
      validTime: "2021-10-18 13:00Z",
      units: {
        "km/h": {
          symbol: "km/h",
          symbolHTML: "km/h",
          precision: 0,
          convention: "into"
        },
        "m/s": {
          symbol: "m/s",
          symbolHTML: "m/s",
          precision: 1,
          convention: "into"
        },
        kn: {
          symbol: "kn",
          symbolHTML: "kn",
          precision: 0,
          convention: "into"
        },
        mph: {
          symbol: "mph",
          symbolHTML: "mph",
          precision: 0,
          convention: "into"
        }
      },
      timeline: [
        {
          type: "recurring_interval",
          start: "2013-11-01T00:00Z",
          end: "2021-01-01T00:00Z",
          frequency: {
            hours: 3
          }
        },
        {
          type: "recurring_interval",
          start: "2021-01-01T00:00Z",
          frequency: {
            hours: 1
          }
        }
      ],
      nav: {
        prev2: "-8 hours",
        prev1: "-1 hour",
        next1: "+1 hour",
        next2: "+8 hours"
      },
      supportedLevels: ["surface", "1000hPa", "850hPa", "700hPa", "500hPa", "250hPa", "70hPa", "10hPa"],
      scale: {
        range: {
          "km/h": [0, 360],
          "m/s": [0, 100],
          kn: [0, 194.3844],
          mph: [0, 223.6936]
        },
        colors: {
          0: 0,
          1: 0,
          2: 255,
          3: 255,
          4: 0,
          5: 2,
          6: 254,
          7: 255,
          8: 0,
          9: 4,
          10: 254
        }
      }
    }
  },
  null
];
