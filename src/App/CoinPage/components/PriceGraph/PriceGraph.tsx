import { GRAPH_BLUE } from "@config/contants";
import options from "@config/priceGraphOptions";
import { parseDataWithTime } from "@utils/parseDataWithTime";
import classnames from "classnames";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

import styles from "./PriceGraph.module.scss";

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
        options={options}
      />
    </div>
  );
};

export default PriceGraph;
