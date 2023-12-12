import { useEffect } from 'react';
import './App.css';
import PageRoutes from './component/page-components/PageRoutes';
import { auth } from './firebase';
import { fetchAvlExams } from './API/exams';
import { useDispatch } from 'react-redux';
import { setAvailableExam } from './redux/examSlice';
import { setUser } from './redux/testSlice';

function App() {
  const dispatch=useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(user=>{
      if(user){
      localStorage.setItem('token',user.accessToken);
      const USER={
        name:user.displayName,
        email:user.email,
        uid:user.uid
      }
      dispatch(setUser(USER));
      }
    });
  
  }, [])
  
  return <PageRoutes/>
}

export default App;
