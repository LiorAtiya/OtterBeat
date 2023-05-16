import React, { useState, useEffect } from 'react'
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
            backgroundColor: ['rgba(124,252,0)', 'rgba(0,191,255)', 'rgba(220,20,60)'],
            borderColor: 'rgba(255,255,255)',
            borderWidth: 2,
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
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        }
      },
      y: {
        ticks: {
          color: 'white',
        }
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
