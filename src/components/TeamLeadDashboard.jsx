import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { assignTask } from '../utils/memberSlice';

function TeamLeadDashboard() {
  const members = useSelector((state) => state.members.list);
  const dispatch = useDispatch();

  const [filterStatus, setFilterStatus] = useState('All');
  const [sort, setSort] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Filter + sort
  const filteredMembers = members
    .filter((m) => filterStatus === 'All' || m.status === filterStatus)
    .sort((a, b) =>
      sort
        ? b.tasks.filter((t) => t.progress < 100).length -
          a.tasks.filter((t) => t.progress < 100).length
        : 0
    );

  // Assign task
  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedId || !taskTitle || !dueDate) return;

    dispatch(assignTask({ id: selectedId, title: taskTitle, dueDate }));
    setSelectedId('');
    setTaskTitle('');
    setDueDate('');
  };

  // Count status summary
  const statusCount = members.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Team Lead Dashboard</h2>

      {/* 🔢 Status Summary */}
      <div className="bg-white p-4 shadow rounded">
        <p className="font-semibold">Status Summary:</p>
        <p className="text-sm text-gray-700">
          {Object.entries(statusCount).map(([status, count]) => (
            <span key={status} className="mr-4">
              {count} {status}
            </span>
          ))}
        </p>
      </div>

      {/* 🔍 Filter & Sort */}
      <div className="flex gap-4 items-center">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option>All</option>
          <option>Working</option>
          <option>Break</option>
          <option>Meeting</option>
          <option>Offline</option>
        </select>
        <button
          onClick={() => setSort(!sort)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {sort ? 'Clear Sort' : 'Sort by Active Tasks'}
        </button>
      </div>

      {/* 👥 Member Cards */}
      <div className="grid gap-4  md:grid-cols-2">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white p-4 shadow rounded border-l-4 border-blue-500"
          >
            <p className="font-semibold">{member.name}</p>
            <p className="text-sm text-gray-600">Status: {member.status}</p>
            <p className="text-sm text-gray-600">
              Active Tasks: {member.tasks.filter((t) => t.progress < 100).length}
            </p>
          </div>
        ))}
      </div>

      {/* 📝 Assign Task Form */}
      <form
        onSubmit={handleAssign}
        className="bg-white p-4 shadow rounded w-[50%] space-y-4"
      >
        <h3 className="font-semibold text-lg">Assign New Task</h3>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Member</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
}

export default TeamLeadDashboard;
