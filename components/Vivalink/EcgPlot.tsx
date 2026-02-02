import dynamic from 'next/dynamic';
import * as Plotly from 'plotly.js';
import React, { useState, useEffect } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const ECGPlot = ({ data }: { data: { time: number; mv: number }[] }) => {
  const [initialYRange] = useState([-2, 2]);

  const { plotData, layout } = React.useMemo(() => {
    const xAxis = data?.map((point) => point.time) || [];
    const yAxis = data?.map((point) => point.mv) || [];
    const xMax = xAxis[xAxis.length - 1] || 0;
    const xMin = 0;

    const pData: Plotly.Data[] = [
      {
        x: xAxis,
        y: yAxis,
        type: 'scatter',
        mode: 'lines',
        line: { color: 'black', width: 1.5 },
      },
    ];

    const smallTimeIncrement = 0.04;
    const largeTimeIncrement = 0.2;
    const smallYIncrement = 0.1;
    const largeYIncrement = 0.5;

    const shapes: Partial<Plotly.Shape>[] = [];

    // Optimize grid generation: Use a single loop for axes
    for (let x = xMin; x <= xMax; x += smallTimeIncrement) {
      const isLarge = Math.abs(x % largeTimeIncrement) < 0.001 || Math.abs(x % largeTimeIncrement - largeTimeIncrement) < 0.001;
      shapes.push({
        type: 'line',
        x0: x, x1: x, y0: -10, y1: 10,
        line: {
          color: isLarge ? 'rgba(255, 0, 0, 0.4)' : 'rgba(255, 0, 0, 0.1)',
          width: isLarge ? 1.2 : 0.8,
        },
      });
    }

    for (let y = -10; y <= 10; y += smallYIncrement) {
      if (y === 0) continue;
      const isLarge = Math.abs(y % largeYIncrement) < 0.001 || Math.abs(y % largeYIncrement - largeYIncrement) < 0.001;
      shapes.push({
        type: 'line',
        x0: xMin, x1: xMax, y0: y, y1: y,
        line: {
          color: isLarge ? 'rgba(255, 0, 0, 0.4)' : 'rgba(255, 0, 0, 0.1)',
          width: isLarge ? 1.2 : 0.8,
        },
      });
    }

    const singleUnit = 400 / (2 * initialYRange[1] * 10);
    const secondsEcg = data?.length ? data.length / 128 : 0;
    const width = Math.max(1200, singleUnit * secondsEcg * 25);

    const lout: Partial<Plotly.Layout> = {
      title: 'ECG Signal',
      width: width,
      height: 450,
      margin: { t: 40, b: 40, l: 40, r: 40 },
      xaxis: {
        title: 'Time (s)',
        range: [0, xMax],
        showline: true,
        tickmode: 'linear',
        dtick: 0.2,
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
      showlegend: false,
      shapes: shapes,
      dragmode: false,
      autosize: false,
    };

    return { plotData: pData, layout: lout };
  }, [data, initialYRange]);

  return (
    <div className="ecg-plot-container bg-white rounded-lg p-2 shadow-inner">
      <Plot
        data={plotData}
        layout={layout}
        config={{
          responsive: false,
          displayModeBar: false,
          staticPlot: true
        }}
      />
    </div>
  );
};

export default ECGPlot;
