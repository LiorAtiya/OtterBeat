import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as chartjs } from 'chart.js/auto'

export default function DoughnutChart({ data }) {

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const getResult = async () => {

      const setData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Top 3',
            data: [65, 59, 80, 81, 56, 55, 40],
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

  return (
    <>
      {
        chartData.length !== 0 ?
          <Doughnut data={chartData} />
          :
          null
      }
    </>
  )
}
