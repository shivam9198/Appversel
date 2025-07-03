import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

function StatusPieChart() {
  const members = useSelector((state) => state.members.list);

  // Count status
  const statusCount = members.reduce((acc, m) => {
    acc[m.status] = (acc[m.status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        label: 'Status',
        data: Object.values(statusCount),
        backgroundColor: ['#60a5fa', '#facc15', '#f87171', '#94a3b8'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-white  shadow rounded p-4">
      <h3 className="text-lg font-semibold mb-2">Team Status Chart</h3>
      <Pie data={data} />
    </div>
  );
}

export default StatusPieChart;
