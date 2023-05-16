import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as chartjs } from 'chart.js/auto'

export default function DoughnutChart({ data }) {

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const getResult = async () => {

      const setData = {
        labels: ['January', 'February', 'March'],
        datasets: [
          {
            label: 'Top 3',
            data: [65, 59, 80],
            fill: false,
            backgroundColor: ['rgba(124,252,0)', 'rgba(0,191,255)', 'rgba(220,20,60)'],
            borderColor: 'rgba(255,255,255)',
            borderWidth: 1,
          },
        ],
      }

      setChartData(setData)

    };
    getResult();
  }, []);

  const options = {
    elements: {
      bar: {
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 2
      }
    }
  };

  return (
    <>
      {
        chartData.length !== 0 ?
          <Doughnut data={chartData} options={options}/>
          :
          null
      }
    </>
  )
}
