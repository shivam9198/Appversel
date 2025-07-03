import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMembers } from './utils/memberSlice';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import TeamLeadDashboard from './components/TeamLeadDashboard';
import TeamMemberDashboard from './components/TeamMemberDashboard';
import {setUser} from './utils/roleSlice'

function App() {
   const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const { currentRole } = useSelector((state) => state.role);

  useEffect(() => {
  dispatch(fetchMembers()).then((res) => {
    const firstUser = res.payload?.[0];
    if (firstUser) {
      dispatch(setUser(firstUser.name)); 
    }
  });
}, [])

  return (
     <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all duration-300">
  
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {currentRole === 'lead' ? (
        <TeamLeadDashboard />
      ) : (
        <TeamMemberDashboard />
      )}
    </div>
    </div>
  );
}

export default App;
