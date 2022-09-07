import { LTTB } from "downsample";
import { Line } from "react-chartjs-2";

export type SparklineProps = {
  data: number[];
  color?: string;
  className?: string;
};

const Sparkline: React.FC<SparklineProps> = ({ className, data, color }) => {
  const parsedData = data.map((item, i) => {
    return { x: i, y: item };
  });
  const downscaledData = LTTB(parsedData, 15);

  return (
    <div className={className}>
      <Line
        data={{
          datasets: [
            {
              data: downscaledData,
              parsing: false,
              borderColor: color,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: {
              type: "linear" as const,
              display: false,
            },
            xAxes: {
              type: "linear" as const,
              display: false,
            },
          },
          elements: {
            point: {
              radius: 0,
              hoverRadius: 0,
            },
            line: {
              borderWidth: 1,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        }}
      />
    </div>
  );
};

export default Sparkline;
