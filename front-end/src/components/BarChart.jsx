import React, { useState,useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as chartjs } from 'chart.js/auto'

export default function BarChart({ data }) {

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const getResult = async () => {

      const setData = {
        labels: data?.map(song => song.title),
        datasets: [
          {
            label: 'Number',
            data: [65, 59, 80],
            fill: false,
            backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(75,192,75,0.2)', 'rgba(192,75,75,0.2)'],
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      }

      setChartData(setData)

    };
    getResult();
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false // This will remove the label
      }
    }
  };

  return (
    <>
      {
        chartData.length !== 0 ?
          <Bar data={chartData} options={options} />
          :
          null
      }
    </>
  )
}
