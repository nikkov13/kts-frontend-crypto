const options = {
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
};

export default options;
