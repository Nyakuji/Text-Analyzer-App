import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface WordFrequencyChartProps {
  wordFrequency: { [key: string]: number };
}

const WordFrequencyChart: React.FC<WordFrequencyChartProps> = ({ wordFrequency }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<"bar"> | null>(null);

  useEffect(() => {
    if (wordFrequency && Object.keys(wordFrequency).length > 0) {
      const labels = Object.keys(wordFrequency);
      const data = Object.values(wordFrequency);

      const ctx = chartRef.current?.getContext('2d');

      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Word Frequency',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.5)', // Adjust color as needed
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }, [wordFrequency]);

  return <canvas ref={chartRef} />;
};

export default WordFrequencyChart;