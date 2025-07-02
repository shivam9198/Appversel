import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMembers } from './utils/memberSlice'; // ✅ Make sure path is correct
import Header from './components/Header';
import { useSelector } from 'react-redux';
import TeamLeadDashboard from './components/TeamLeadDashboard';
import TeamMemberDashboard from './components/TeamMemberDashboard';
import {setUser} from './utils/roleSlice'

function App() {
  const dispatch = useDispatch();
  const { currentRole } = useSelector((state) => state.role);

  useEffect(() => {
  dispatch(fetchMembers()).then((res) => {
    const firstUser = res.payload?.[0];
    if (firstUser) {
      dispatch(setUser(firstUser.name)); // ✅ Set currentUser to a real user
    }
  });
}, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* 🎯 Conditional Role-based Rendering */}
      {currentRole === 'lead' ? (
        <TeamLeadDashboard />
      ) : (
        <TeamMemberDashboard />
      )}
    </div>
  );
}

export default App;
