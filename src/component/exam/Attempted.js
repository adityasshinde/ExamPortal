// Attempted.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Overlay from '../ui/Overlay';
import { useDispatch, useSelector } from 'react-redux';
import { saveResponse } from '../../API/test';
import { flushTest, setScore } from '../../redux/testSlice';

const Attempted = (props) => {
    const [overlay,setOverlay]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const test=useSelector(state=>state.test);
    const submitTest=async()=>{
        setOverlay(true);
        console.log(test.attempted);
        const response={
            Questions:test.exam.QUESTIONS,
            Answers:test.attempted,
            uid:test.user.uid,
        }
       const score= await saveResponse(response);
        dispatch(flushTest());
        dispatch(setScore(score));
        setOverlay(false);
        navigate('/exam/result');
    }
    const displayQuestions = () => {
        const questionElements = [];

        for (let i = 1; i <= props.total; i++) {
            questionElements.push(
                <div
                    key={i}
                    className={`p-2 rounded-md ${i <= props.size ? 'bg-green-500 text-white' : 'bg-white'
                        } border border-gray-300 cursor-pointer hover:bg-gray-100`}
                >
                    {i}
                </div>
            );
        }

        return questionElements;
    };


    const [questions, setQuestion] = useState([]);
    useEffect(() => {
        for (let i = 1; i <= props.total; i++) {
            questions.push({
                number: i,
                attempted: i <= props.size
            });
        }
        setQuestion(questions);
    }, [questions]);

    // Calculate the number of rows in the grid
    const numRows = Math.ceil(props.total / 5); // Assuming 5 columns

    // Calculate the height based on the number of rows
    const height = numRows * 48; // Assuming each row has a height of 48px

    return (
        <div
            className="text-center border border-gray-300 justify-between shadow-md rounded-md p-4"
            style={{ height: '70vh', width: '30vw' }}
        >
            {overlay && <Overlay message='Submitting the test, please wait...' />}
            <h2 className="text-2xl font-bold mb-4">Questions</h2>
            <hr />
            <div className="grid grid-cols-5 mt-4 gap-6">
                {displayQuestions()}
            </div>
            <button
                type='submit'
                onClick={submitTest}
                className="text-white bg-red-400 border mt-4 px-4 py-2 rounded-md hover:text-white hover:bg-red-500 focus:outline-none disabled:bg-gray-400 focus:ring focus:border-blue-300"
            >End Test
            </button>
        </div>
    );
};

export default Attempted;
