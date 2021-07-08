/* eslint-disable quotes */
import React from 'react';

export const BIODIVERSITY_STEPS = [
  {
    index: 0,
    textPanel: {
      text: (
        <>
          <h6 className="biodiversity">Biodiversity step 1</h6>
          <p>
            Hey!
          </p>
        </>
      )
    },
    location: { lat: 13, lng: -12, altitude: 2 },
    stickyContainer: <div />,
    arcs: [],
    visualSource: <a href="https://www.mcc-berlin.net/en/research/co2-budget.html" target="_blank" rel="noreferrer">MCC</a>,
    visualDataset: <a href="https://www.ipcc.ch/sr15/" target="_blank" rel="noreferrer">IPCC</a>
  },
  {
    index: 1,
    textPanel: {
      text: (
        <>
          <h6 className="biodiversity">Biodiversity step 2</h6>
          <p>
            Let's move around a bit
          </p>
        </>
      )
    },
    location: { lat: 23, lng: 42, altitude: 2 },
    stickyContainer: <div />,
    arcs: [],
    visualSource: <a href="https://www.mcc-berlin.net/en/research/co2-budget.html" target="_blank" rel="noreferrer">MCC</a>,
    visualDataset: <a href="https://www.ipcc.ch/sr15/" target="_blank" rel="noreferrer">IPCC</a>
  },
  {
    index: 2,
    textPanel: {
      text: (
        <>
          <h6 className="biodiversity">Biodiversity step 3</h6>
          <p>
            Now moving but also zooming in
          </p>
        </>
      )
    },
    location: { lat: -3, lng: 2, altitude: 0.3 },
    stickyContainer: <div />,
    arcs: [],
    visualSource: <a href="https://www.mcc-berlin.net/en/research/co2-budget.html" target="_blank" rel="noreferrer">MCC</a>,
    visualDataset: <a href="https://www.ipcc.ch/sr15/" target="_blank" rel="noreferrer">IPCC</a>
  },
  {
    index: 3,
    textPanel: {
      text: (
        <>
          <h6 className="biodiversity">Biodiversity step 4</h6>
          <p>
            Now zooming out and also set on rotation forever
          </p>
        </>
      )
    },
    location: { lat: -3, lng: 2, altitude: 3 },
    autoRotate: true,
    arcs: [],
    stickyContainer: <div />,
    visualSource: <a href="https://www.mcc-berlin.net/en/research/co2-budget.html" target="_blank" rel="noreferrer">MCC</a>,
    visualDataset: <a href="https://www.ipcc.ch/sr15/" target="_blank" rel="noreferrer">IPCC</a>
  },
  {
    index: 4,
    textPanel: {
      text: (
        <>
          <h6 className="biodiversity">Biodiversity step 5</h6>
          <p>
            Now zooming in plus some arcs
          </p>
        </>
      )
    },
    location: { lat: 32, lng: 10, altitude: 1.2 },
    arcs: [
      {
        latStart: 36,
        lngStart: -4,
        latEnd: 40,
        lngEnd: -3,
        label: 'Malaga - Madrid! ',
        color: 'red'
      },
      {
        latStart: 40,
        lngStart: -3,
        latEnd: 44,
        lngEnd: 15,
        label: 'Madrid - somewhere else! ',
        color: 'green'
      }
    ],
    autoRotate: false,
    stickyContainer: <div />,
    visualSource: <a href="https://www.mcc-berlin.net/en/research/co2-budget.html" target="_blank" rel="noreferrer">MCC</a>,
    visualDataset: <a href="https://www.ipcc.ch/sr15/" target="_blank" rel="noreferrer">IPCC</a>
  }
];
