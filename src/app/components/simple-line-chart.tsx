import { Line } from "react-chartjs-2";

interface LineChartProps {
    labels: string[];
    values: number[];
    title: string;
}

export const SimpleLineChart = ({ labels, values }: LineChartProps) => {

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: values,
        borderColor: '#2563eb',
        backgroundColor: '#2563eb',
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (context: any) => { // eslint-disable-line  @typescript-eslint/no-explicit-any
            return context.label;
          },
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: '#f0f0f0',
        },
        title: {
          display: true,
          text: 'Temperature'
        },
      }
    }
  };

  return <Line data={chartData} options={chartOptions} />;

}