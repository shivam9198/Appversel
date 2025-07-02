import { useDispatch, useSelector } from 'react-redux';
import { switchRole } from '../utils/roleSlice';

function Header() {
  const { currentRole, currentUser } = useSelector((state) => state.role);
  const dispatch = useDispatch();

  const handleSwitch = () => {
    dispatch(switchRole());
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white shadow-md">
      <h1 className="text-xl font-bold">Team Pulse Dashboard</h1>
      <div className="flex items-center gap-4">
        <p className="text-sm">
          Role: <span className="font-semibold capitalize">{currentRole}</span>
        </p>
        <button
          onClick={handleSwitch}
          className="px-4 py-1 bg-blue-600 hover:bg-blue-500 rounded"
        >
          Switch to {currentRole === 'lead' ? 'Member' : 'Lead'}
        </button>
      </div>
    </div>
  );
}
export default Header;
