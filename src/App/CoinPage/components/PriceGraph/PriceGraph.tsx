import WithErrorMessage from "@components/WithErrorMessage";
import WithLoader from "@components/WithLoader";
import { CHART_POINTS, GRAPH_BLUE } from "@config/contants";
import options from "@config/priceGraphOptions";
import { SparklineModel } from "@store/models/Sparkline";
import classnames from "classnames";
import { LTTB } from "downsample";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import { RequestStatus } from "types";

import styles from "./PriceGraph.module.scss";

export type GraphProps = {
  data: SparklineModel;
  status: RequestStatus;
  className?: string;
};

const PriceGraph: React.FC<GraphProps> = ({ className, data, status }) => {
  const graphClass = classnames(styles.graph, className);

  return (
    <div className={graphClass}>
      <WithLoader loading={status === RequestStatus.pending}>
        <WithErrorMessage isError={status === RequestStatus.error}>
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
        </WithErrorMessage>
      </WithLoader>
    </div>
  );
};

export default PriceGraph;
