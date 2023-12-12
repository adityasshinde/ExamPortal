// props.question?Component.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addResponse } from '../../redux/testSlice';

const AnswerForm = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [err, setErr] = useState(undefined);
  const dispatch=useDispatch();
  const handleChange = (e) => {
    setErr(false);
    setSelectedAnswer(e.target.value);
  };
  const handleNext=()=>{
    if(selectedAnswer===''){
      setErr("Answer the question before proceeding")
      return;
    }
    const response={
      statement:props.question?.statement,
      answer:selectedAnswer
    }
    dispatch(addResponse(response));
    props.nextQuestion();
  }

  const renderAnswerInput = () => {
    if (props.question?.type === 'descriptive') {
      return <textarea onChange={handleChange} rows="4" cols="50" className='p-2 w-full' placeholder="Type your answer here..." />;
    } else if (props.question?.type === 'mcq') {
      return (
        <div>
          {props.question?.options.map((option, index) => (
            <div key={index} className="mb-2">
              <input
                type="radio"
                id={`option${index}`}
                name="mcqOptions"
                value={option}
                checked={selectedAnswer === option}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
          ))}
        </div>
      );
    } else if (props.question?.type === 'yes_no') {
      return (
        <div className='flex flex-col'>
          <label>
            <input
              type="radio"
              name="yesNoOptions"
              value="yes"
              checked={selectedAnswer === 'yes'}
              onChange={handleChange}
              className='mb-4'
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="yesNoOptions"
              value="no"
              checked={selectedAnswer === 'no'}
              onChange={handleChange}
              className="mb-2"
            />
            No
          </label>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col mr-8 ml-8 justify-center gap-4">
      {/* Card 1: props.question? Number and Statement */}
      <div className="border border-gray-300 rounded-md shadow-md p-4">
        <h2 className="text-2xl font-bold mb-4">Q. {props.number}</h2>
        <p className="mb-4">{props.question?.statement}</p>
      </div>

      {/* Card 2: Options/Textarea */}
      <div className="border border-gray-300 rounded-md shadow-md p-4">
        {renderAnswerInput()}
      </div>

      {/* Card 3: Buttons */}
      <div className="border border-gray-300 rounded-md shadow-md p-4 flex flex-row justify-center items-center">
        <button
          onClick={() => setSelectedAnswer('')}
          className="bg-gray-500 text-white p-2 mx-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
        >
          Clear Response
        </button>
        {/* <button
          onClick={() => console.log('Previous clicked')} // Replace with actual function
          className="bg-blue-500 text-white p-2 mx-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Previous
        </button> */}
        <button
          onClick={handleNext} // Replace with actual function
          className="bg-blue-500 text-white p-2 mx-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Next
        </button>
      </div>
      {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
    </div>
  );
};

export default AnswerForm;
