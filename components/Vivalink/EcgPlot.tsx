import dynamic from 'next/dynamic';
import * as Plotly from 'plotly.js';
import React, { useState, useEffect } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const ECGPlot = ({ data }: { data: { time: number; mv: number }[] }) => {


  const xAxis = data.map((point) => point.time);
  const yAxis = data.map((point) => point.mv); // ECG-like data

  const xMin = 0;
  const xMax = xAxis[xAxis.length - 1]; // Full range of data (5 seconds)

  const plotData: Plotly.Data[] = [
    {
      x: xAxis,
      y: yAxis,
      type: 'scatter',
      mode: 'lines',
      line: { color: 'black', width: 2 }, // Line color set to black and width increased
    },
  ];

  var maxY = Math.max(...yAxis);
  var minY = Math.min(...yAxis) * -1;

  var m = Math.max(maxY, minY);

  m = Math.ceil(m);

  const [initialYRange, setInitialYRange] = useState([-2, 2]);

  // Handle the layout changes when zooming or panning
  // const handleRelayout = (eventData: any) => {
  //   // Extract x-axis range from the relayout event data
  //   const newXRange = [eventData['xaxis.range[0]'], eventData['xaxis.range[1]']];
  //   setInitialXRange(newXRange);

  //   // Recalculate the y-axis range based on the new x-axis range
  //   const newYRange = calculateYRange(newXRange);
  //   setInitialYRange(newYRange);
  // };

  // Define vertical and horizontal grid lines
  const smallTimeIncrement = 0.04;
  const largeTimeIncrement = smallTimeIncrement * 5;
  const smallYIncrement = 0.1;
  const largeYIncrement = smallYIncrement * 5;

  var verticalSmallLines = Array.from(
    { length: Math.floor((xMax - xMin) / smallTimeIncrement) + 1 },
    (_, i) => ({
      type: 'line' as const,
      x0: xMin + i * smallTimeIncrement,
      x1: xMin + i * smallTimeIncrement,
      y0: -10,
      y1: 10,
      line: {
        color: 'rgba(255, 0, 0, 0.1)',
        width: 1,
      },
    })
  );


  var verticalLargeLines = Array.from(
    { length: Math.floor((xMax - xMin) / largeTimeIncrement) + 1 },
    (_, i) => ({
      type: 'line' as const,
      x0: xMin + i * largeTimeIncrement,
      x1: xMin + i * largeTimeIncrement,
      y0: -10,
      y1: 10,
      line: {
        color: 'rgba(255, 0, 0, 0.6)',
        width: 1.5,
      },
    })
  );

  var horizontalSmallLines = Array.from(
    { length: Math.floor((10 - 0) / smallYIncrement) + 1 },
    (_, i) => {
      const yValue = i * smallYIncrement;
      return {
        type: 'line' as const,
        x0: xMin,
        x1: xMax,
        y0: yValue,
        y1: yValue,
        line: {
          color: 'rgba(255, 0, 0, 0.1)',
          width: 1,
        },
      };
    }
  );

  var horizontalSmallLinesBelow = Array.from(
    { length: Math.floor((10 - 0) / smallYIncrement) + 1 },
    (_, i) => {
      const yValue = i * smallYIncrement;
      return {
        type: 'line' as const,
        x0: xMin,
        x1: xMax,
        y0: -1 * yValue,
        y1: -1 * yValue,
        line: {
          color: 'rgba(255, 0, 0, 0.1)',
          width: 1,
        },
      };
    }
  );

  // remove main axis

  var horizontalLargeLines = Array.from(
    { length: Math.floor((10 - 0) / largeYIncrement) + 1 },
    (_, i) => {
      const yValue = i * largeYIncrement;
      return {
        type: 'line' as const,
        x0: xMin,
        x1: xMax,
        y0: yValue,
        y1: yValue,
        line: {
          color: 'rgba(255, 0, 0, 0.6)',
          width: 1.5,
        },
      };
    }
  );

  var horizontalLargeLinesBelow = Array.from(
    { length: Math.floor((10 - 0) / largeYIncrement) + 1 },
    (_, i) => {
      const yValue = i * largeYIncrement;
      return {
        type: 'line' as const,
        x0: xMin,
        x1: xMax,
        y0: -1 * yValue,
        y1: -1 * yValue,
        line: {
          color: 'rgba(255, 0, 0, 0.6)',
          width: 1.5,
        },
      };
    }
  );

  // remove the axis lines

  horizontalLargeLines = horizontalLargeLines.filter((line) => line.y0 !== 0);
  horizontalLargeLinesBelow = horizontalLargeLinesBelow.filter((line) => line.y0 !== 0);

  const shapes = [
    ...verticalSmallLines,
    ...verticalLargeLines,
    ...horizontalSmallLines,
    ...horizontalLargeLines,
    ...horizontalLargeLinesBelow,
    ...horizontalSmallLinesBelow,
  ];

  var singleUnit = 400 / (2 * initialYRange[1] * 10)
  var secondsEcg = data.length / 128;
  var width = singleUnit * secondsEcg * 25;

  const layout: Partial<Plotly.Layout> = {
    title: 'ECG Signal',
    width: width, // Set width to dynamic 50% of the viewport width
    height: 580,
    xaxis: {
      title: 'Time (s)',
      range: [0, xMax],
      showline: true,
      tickmode: 'linear',
      constrain: 'range',
      dtick: 0.2,
      scaleratio: 1,
      fixedrange: true,
    },
    yaxis: {
      title: 'mV',
      range: initialYRange,
      showline: true,
      tickmode: 'linear',
      dtick: 0.5,
      fixedrange: true,
    },
    autosize: true,
    showlegend: false,
    shapes: shapes,
    dragmode: false,
  };

  return <Plot data={plotData} layout={layout} />;
};

export default ECGPlot;
