import { GRAPH_BLUE } from "@config/contants";
import { parseDataWithTime } from "@utils/parseDataWithTime";
import { Chart, registerables } from "chart.js";
import classnames from "classnames";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

import styles from "./PriceGraph.module.scss";

Chart.register(...registerables);

export type GraphProps = {
  data: {
    price: number[];
    lastUpdate: string;
  };
  className?: string;
};

const PriceGraph: React.FC<GraphProps> = ({ className, data }) => {
  const parsedData = parseDataWithTime(data.price, data.lastUpdate);

  const graphClass = classnames(styles.graph, className);

  return (
    <div className={graphClass}>
      <Line
        data={{
          datasets: [
            {
              data: parsedData,
              parsing: false,
              borderColor: GRAPH_BLUE,
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
              type: "timeseries" as const,
              grid: {
                drawOnChartArea: false,
              },
            },
          },
          elements: {
            point: {
              radius: 0,
              hoverRadius: 5,
            },
            line: {
              borderWidth: 2,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default PriceGraph;
