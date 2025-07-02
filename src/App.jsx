import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from './utils/memberSlice';
import Header from './components/Header';

function App() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.members);
  const { currentRole } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Current Role: {currentRole}</h2>
        {loading ? (
          <p>Loading members...</p>
        ) : (
          list.map((member) => (
            <div key={member.id} className="bg-white shadow p-3 mb-2 rounded">
              {member.name} - {member.status}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
