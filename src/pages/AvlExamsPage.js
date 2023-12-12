// AvlExamsPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAvlExams } from '../API/exams';
import Overlay from '../component/ui/Overlay';
import { setAvailableExam } from '../redux/examSlice';
import { setExam } from '../redux/testSlice';

const AvlExamsPage = () => {
  const [overlay,setOverlay]=useState(false);
  const AvailableExams = useSelector((state) => state.exam.availableExams);
  const dispatch=useDispatch();
  const fetchItems=async()=>{
    setOverlay(true);
    const data=await fetchAvlExams();
    dispatch(setAvailableExam(data));
    console.log(AvailableExams);
    setOverlay(false);
  }
  useEffect(() => {
    fetchItems();
  }, [])
  
  

  return (
    <div className="text-center mt-10">
      {overlay && <Overlay message="Fetching available exams, please wait..." />}
      <h2 className="text-2xl font-bold mb-4">Available Exams</h2>
      { AvailableExams.length>0 ?
      <div className="flex flex-col items-center">
      {AvailableExams.map((exam, index) => (
        <div
          key={index}
          className="border border-gray-300 my-4 w-2/5 rounded-md shadow-md p-4"
        >
          <h3 className="text-lg font-semibold mb-2">{exam.basicInfo.examName}</h3>
          <div className="flex flex-col">
          <p>Total Questions: {exam.basicInfo.totalQuestions}</p>
            <p>Total Marks: {exam.basicInfo.totalMarks}</p>
            <p>Total Time: {exam.basicInfo.totalTime} minutes</p>
          </div>
          <Link to='/test' onClick={()=>{dispatch(setExam(exam))}}>
          <button className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
            Start Exam
          </button>
          </Link>
        </div>
      ))}
    </div>:
    <p>No exams available</p>

      }
    </div>
  );
};

export default AvlExamsPage;
