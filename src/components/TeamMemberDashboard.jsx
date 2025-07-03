import { useSelector, useDispatch } from 'react-redux';
import { updateStatus, updateTaskProgress } from '../utils/memberSlice';

function TeamMemberDashboard() {
  const { list } = useSelector((state) => state.members);
  const { currentUser } = useSelector((state) => state.role);
  const dispatch = useDispatch();

  const member = list.find((m) => m.name === currentUser);

  const statuses = ['Working', 'Break', 'Meeting', 'Offline'];

  if (!member) return <p className="p-4">User not found in member list.</p>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Welcome, {member.name}</h2>

      <div className="flex gap-3 flex-wrap">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => dispatch(updateStatus({ id: member.id, status }))}
            className={`px-4 py-2 rounded ${
              member.status === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

   
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Your Tasks</h3>
        {member.tasks.length === 0 ? (
          <p>No tasks assigned.</p>
        ) : (
          member.tasks.map((task, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow space-y-2"
            >
              <p className="font-semibold">{task.title}</p>
              <p className="text-sm text-gray-600">Due: {task.dueDate}</p>

          
              <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
                <div
                  className={`h-full ${
                    task.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${task.progress}%` }}
                />
              </div>

              <p className="text-sm">Progress: {task.progress}%</p>

         
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    dispatch(
                      updateTaskProgress({
                        memberId: member.id,
                        taskIndex: index,
                        change: -10,
                      })
                    )
                  }
                  disabled={task.progress <= 0}
                  className="px-2 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                >
                  -10%
                </button>
                <button
                  onClick={() =>
                    dispatch(
                      updateTaskProgress({
                        memberId: member.id,
                        taskIndex: index,
                        change: 10,
                      })
                    )
                  }
                  disabled={task.progress >= 100}
                  className="px-2 py-1 bg-green-500 text-white rounded disabled:opacity-50"
                >
                  +10%
                </button>
              </div>

              {task.progress === 100 && (
                <p className="text-green-600 font-semibold">✅ Completed</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TeamMemberDashboard;
