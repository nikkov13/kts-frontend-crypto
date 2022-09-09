import options from "@config/sparklineOptions";
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
        options={options}
      />
    </div>
  );
};

export default Sparkline;
