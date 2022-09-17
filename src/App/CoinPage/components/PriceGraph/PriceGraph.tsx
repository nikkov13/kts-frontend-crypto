import WithLoader from "@components/WithLoader";
import { CHART_POINTS, GRAPH_BLUE } from "@config/contants";
import options from "@config/priceGraphOptions";
import { SparklineModel } from "@store/models/Sparkline";
import classnames from "classnames";
import { LTTB } from "downsample";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

import styles from "./PriceGraph.module.scss";

export type GraphProps = {
  data: SparklineModel;
  isLoading: boolean;
  className?: string;
};

const PriceGraph: React.FC<GraphProps> = ({ className, data, isLoading }) => {
  const graphClass = classnames(styles.graph, className);

  return (
    <div className={graphClass}>
      <WithLoader loading={isLoading}>
        <Line
          data={{
            datasets: [
              {
                data: LTTB(data, CHART_POINTS),
                parsing: false,
                borderColor: GRAPH_BLUE,
              },
            ],
          }}
          options={options}
        />
      </WithLoader>
    </div>
  );
};

export default PriceGraph;
