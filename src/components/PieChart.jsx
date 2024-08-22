import React, { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const PieChart = ({ data, refreshChart }) => {
  const chartData = {
    labels: ['True', 'False'],
    datasets: [
      {
        data,
        backgroundColor: ['#19f72b', '#FF6384'],
        hoverBackgroundColor: ['#19f72b', '#FF6384'],
      },
    ],
  };

  const chartRef = useRef(null);

  useEffect(() => {
    if (refreshChart && chartRef.current) {
      const myChart = new Chart(chartRef.current, {
        type: 'pie',
        data: chartData,
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [data, refreshChart]);

  return <canvas ref={chartRef} />;
};

export default PieChart;
