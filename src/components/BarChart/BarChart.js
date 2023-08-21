import React, { useState, useEffect } from "react";
import  "./BarChart.css";
import { useSelector, useDispatch } from 'react-redux';
import { getChartData } from '../../_actions/memoriespost';
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
function BarChart(){
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getChartData());
  }, [dispatch]);
   const chartData = useSelector(state => state.chart);
   const chartDataSet = {
      labels: chartData.labels,
      datasets: [
      {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: chartData.data,
      },
      ],
  };

        return (
           <div className="barChart">
              {/* <h1>Bar page</h1> */}
              {chartData &&
                <div >
                    <Bar data={chartDataSet} />
                </div> 
                }
           </div>
        );
}

export default BarChart;