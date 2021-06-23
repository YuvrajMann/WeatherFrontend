import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
      x: {
        ticks: {
          callback: function(val, index) {
            return '';
          },
         
        }
      }
    }
};
const data = {
  labels: [],
  datasets: [
    {
      label: "Temperature(deg C)",
      data: [],
      fill: false,
      backgroundColor: "#eb6e4b",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};
export default class chartComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let dynamicData = data;
    let labels = [];
    let dataset = [];
    {
      if (this.props.chartData) {
        this.props.chartData.list.map((data, idx) => {
          let label = data.dt_txt;

          labels.push(label);

          let temp = data.main.temp - 273.15;
          temp = temp.toPrecision(4);

          dataset.push(parseInt(temp));
        });
        dynamicData.labels = labels;
        dynamicData.datasets[0].data = dataset;
      }
    }
    console.log(this.props.chartData, dynamicData);
    return (
      <div >
        <Line data={dynamicData} options={options} />
      </div>
    );
  }
}
