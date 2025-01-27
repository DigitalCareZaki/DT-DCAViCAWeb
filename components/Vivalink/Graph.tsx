import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const WINDOW_SIZE = 128; // Number of visible points
const VOLTAGE_SCALE = 10; // Scale voltage (mV -> pixels)
const TIME_SCALE = 1; // Scale time (s -> pixels)

const ECGGraphWithGrid = ({ data }: { data: { time: number; mv: number }[] }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentData, setCurrentData] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    // Draw the grid on the canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const width = canvas.width;
        const height = canvas.height;

        const smallBoxSize = 20; // Size of small boxes (pixels)
        const largeBoxSize = smallBoxSize * 5; // Size of large boxes (5x5 small boxes)

        // Clear the canvas
        ctx.clearRect(0, 0, width, height);

        // Draw small red grid lines
        ctx.strokeStyle = "#FFCCCC"; // Light red for small boxes
        ctx.lineWidth = 0.5;
        for (let x = 0; x < width; x += smallBoxSize) {
          for (let y = 0; y < height; y += smallBoxSize) {
            ctx.strokeRect(x, y, smallBoxSize, smallBoxSize);
          }
        }

        // Draw larger grid lines
        ctx.strokeStyle = "#FF0000"; // Dark red for large boxes
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += largeBoxSize) {
          for (let y = 0; y < height; y += largeBoxSize) {
            ctx.strokeRect(x, y, largeBoxSize, largeBoxSize);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    // Format data for ApexCharts
    const formattedData = data.map((point) => ({
      x: point.time, // Time in seconds
      y: point.mv, // Voltage in mV
    }));
    setCurrentData(formattedData);
  }, [data]);

  const options = {
    chart: {
      type: "line",
      animations: { enabled: false },
      toolbar: { show: false },
      background: "transparent", // Transparent background to overlay on canvas
    },
    stroke: {
      curve: "smooth", // Smooth ECG waveform
      width: 2, // Line thickness
    },
    grid: {
      show: false, // Hide ApexCharts grid to use the canvas grid
    },
    xaxis: {
      type: "numeric",
      labels: {
        formatter: (value: number) => `${(value * 0.4).toFixed(2)}s`, // Adjusted formatter
      },
      title: { text: "Time (s)" },
    },
    yaxis: {
      min: -VOLTAGE_SCALE * 1,
      max: VOLTAGE_SCALE * 1,
      labels: {
        formatter: (value: number) => `${value.toFixed(1)} mV`, // Format voltage
      },
      title: { text: "Voltage (mV)" },
    },
    tooltip: { enabled: false },
  };

  return (
    <div style={{ position: "relative", width: "1200px", height: "600px" }}>
      {/* Canvas for the grid */}
      <canvas
        ref={canvasRef}
        width={1200}
        height={600}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
      />
      {/* ApexCharts for the ECG */}
      <div style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}>
        <Chart
          options={options as any}
          series={[
            {
              name: "ECG",
              data: currentData,
            },
          ]}
          type="line"
          width={1200}
          height={600}
        />
      </div>
    </div>
  );
};

export default ECGGraphWithGrid;
