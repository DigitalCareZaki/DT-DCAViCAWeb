import { Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ClientComponentProps } from '@types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const WINDOW_SIZE = 100; // Adjust this to change the number of visible points

const Graph: ClientComponentProps<{ data: number[] }> = ({ data }) => {
  const [currentData, setCurrentData] = useState<number[]>(
    new Array(WINDOW_SIZE).fill(null)
  );
  const chartRef = useRef<any>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setCurrentData(new Array(WINDOW_SIZE).fill(null));

    const interval = setInterval(() => {
      if (indexRef.current < data.length) {
        setCurrentData((prevData) => {
          const newData = [...prevData.slice(1), data[indexRef.current]];
          if (chartRef.current) {
            chartRef.current.chart.updateSeries([{ data: newData }]);
          }
          return newData;
        });
        indexRef.current++;
      }
    }, 200); // Adjust this value to control the speed of the movement

    return () => clearInterval(interval);
  }, [data]);

  return (
    <Suspense fallback={<span>Loading Chart</span>}>
      <div className="h-full w-fit">
        <Chart
          ref={chartRef}
          options={{
            chart: {
              type: 'line',
              animations: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: 'smooth',
              width: 2,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            grid: {
              show: true,
              borderColor: '#a0a0a0',
              strokeDashArray: 1,
              xaxis: {
                lines: {
                  show: true,
                },
              },
              yaxis: {
                lines: {
                  show: true,
                },
              },
            },
            // grid: {
            //   show: false,
            // },
            tooltip: {
              enabled: false,
            },
          }}
          series={[
            {
              name: 'ECG',
              data: currentData,
            },
          ]}
          type="line"
          width={700}
          height={300}
        />
      </div>
    </Suspense>
  );
};

export default Graph;
