import React, { useEffect, useState } from 'react';
import AnswerForm from '../component/exam/AnswerForm';
import Attempted from '../component/exam/Attempted';
import { useDispatch, useSelector } from 'react-redux';
import { flushTest, setScore, setTimer } from '../redux/testSlice';
import { useNavigate } from 'react-router-dom';
import Overlay from '../component/ui/Overlay';
import { saveResponse } from '../API/test';

const ExamPage = () => {
    const exam = useSelector((state) => state.test.exam);
    const time = useSelector((state) => state.test.remainingTime);
    const attempted = useSelector((state) => state.test.attempted);
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(0);
    const [overlay,setOverlay]=useState(false);
    const navigate=useNavigate();

    // Function to handle timer updates
    const updateTimer = async() => {
        // Check if the timer has already reached zero
        if (time.min === 0 && time.sec === 0) {
            setOverlay(true);
            const response={
              Questions:exam.QUESTIONS,
              Answers:attempted,
              uid:test.user.uid,
          }
          const score=await saveResponse(response);
          dispatch(flushTest());
          dispatch(setScore(score));
            setOverlay(false);
            navigate('/exam/result');
            return; // Skip further updates
        }

        // Dispatch action to update the remaining time in the Redux store
        dispatch(setTimer({ min: time.min, sec: time.sec - 1 }));
    };

    // useEffect to initialize the timer when the component mounts
    useEffect(() => {
        dispatch(setTimer({ min: 45, sec: 0 }));

        // Clean up function
        return () => {
            // Additional cleanup logic if needed
        };
    }, [dispatch]);

    // Use a separate useEffect for timer updates
    useEffect(() => {
        const timerInterval = setInterval(updateTimer, 1000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(timerInterval);
    }, [time, updateTimer]);
    const handleNext=()=>{
      if(current===exam.QUESTIONS.length-1){
          return;
      }
      setCurrent(current + 1);
    }

    return (
        <div className="px-10 w-full mt-10 flex mx-auto justify-evenly">
          {overlay && <Overlay message="Time up, submitting the test...." />}
            <div>
                <h2 className="text-2xl font-bold mb-4">Maths Practice Test</h2>
                <AnswerForm nextQuestion={handleNext} number={current+1} question={exam?.QUESTIONS[current]} />
            </div>
            <div>
                <p className="font-bold mb-4">{`Time Remaining= ${time.min}:${time.sec}`}</p>
                <Attempted total={exam?.QUESTIONS.length} size={attempted.length} />
            </div>
        </div>
    );
};

export default ExamPage;
