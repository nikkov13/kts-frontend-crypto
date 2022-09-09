const options = {
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
      hitRadius: 5,
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
};

export default options;
