import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion, resetState } from '../../redux/examSlice';
import Overlay from '../ui/Overlay';
import { saveExam } from '../../API/exams';

const QuestionForm = () => {
  const QUESTIONS = useSelector((state) => state.exam.Questions);
  const basicInfo = useSelector((state) => state.exam.basicInfo);
  const user = useSelector((state) => state.test.user);
  const [overlay,setOverlay]=useState(false);
  
  
  const [questionData, setQuestionData] = useState({
    statement: '',
    type: '',
    marks: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  });

  const [errors, setErrors] = useState({
    statement: '',
    type: '',
    marks: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    exceed: '',
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    let marks = 0, ques = 0;
    QUESTIONS?.map((question) => {
      marks += Number(question.marks);
      ques += 1;
    });
    if (Number(basicInfo.totalQuestions)===ques && Number(basicInfo.totalMarks)=== marks) {
      setIsSubmitDisabled(false);
    }

  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the corresponding error when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleOptionChange = (index, value) => {
    setQuestionData((prevData) => {
      const newOptions = [...prevData.options];
      newOptions[index] = value;
      return {
        ...prevData,
        options: newOptions,
      };
    });
  };
  const handleSubmitExam=async()=>{
    setOverlay(true);
    await saveExam({createdBy:user.uid,basicInfo,QUESTIONS});
    dispatch(resetState());
    setOverlay(false);
  }

  const handleAddQuestion = () => {
    // Validate input fields
    const newErrors = {};

    if (!questionData.statement.trim()) {
      newErrors.statement = 'Statement is required';
    }

    if (!questionData.type.trim()) {
      newErrors.type = 'Type is required';
    }

    if (isNaN(questionData.marks) || questionData.marks <= 0) {
      newErrors.marks = 'Enter a valid number of marks';
    }

    if (questionData.type === 'mcq') {
      if (questionData.options.some((option) => !option.trim())) {
        newErrors.options = 'All options are required';
      }

      if (!questionData.correctAnswer.trim()) {
        newErrors.correctAnswer = 'Correct Answer is required for MCQ';
      }
    }

    let marks = 0, ques = 0;
    QUESTIONS?.map((question) => {
      marks += Number(question.marks);
      ques += 1;
    });
    marks += Number(questionData.marks);
    ques += 1;
    if (basicInfo.totalQuestions < ques) {
      newErrors.exceed = 'No.of questions exceeded';
    }
    if (basicInfo.totalMarks < marks) {
      newErrors.exceed = 'No.of marks exceeded';
    }
    // Set errors and prevent adding question if there are errors
    if (Object.values(newErrors).some((error) => error.trim() !== '')) {
      setErrors(newErrors);
    } else {
      // Dispatch the action if there are no errors
      dispatch(addQuestion(questionData));
      setQuestionData({
        statement: '',
        type: '',
        marks: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      });
    }
  };

  return (
    <div className="mb-8 mt-10">
      {overlay && <Overlay message="Submitting response, please wait...." />}
      <h2 className="text-2xl font-bold mb-4">Add Questions for {basicInfo?.examName}</h2>
      {/* Render added questions as editable cards */}
      {QUESTIONS.length > 0 && (
        <div className="mt-8">
          {QUESTIONS.map((question, index) => (
            <div key={index} className="border p-4 mb-4 bg-white  border border-gray-400 rounded-md border-dotted border-gray-300">
              <h3 className="text-xl font-bold mb-2">Question {index + 1}</h3>
              <p>{question.statement}</p>
              {question.type === 'mcq' && (
                <div>
                  <h4 className="font-bold mt-2">Options:</h4>
                  <ul>
                    {question.options.map((option, optionIndex) => (
                      <li key={optionIndex}>{`${optionIndex + 1}) ${option}`}</li>
                    ))}
                  </ul>
                  <p>Correct Answer: {question.correctAnswer}</p>
                </div>
              )}
              {question.type === 'yes_no' && <p>Correct Answer: {question.correctAnswer}</p>}
              <p className="font-bold">Marks: {question.marks}</p>
            </div>
          ))}
        </div>
      )}
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Statement</label>
          <input
            type="text"
            name="statement"
            value={questionData.statement}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Type</label>
          <select
            name="type"
            value={questionData.type}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="">Select Type</option>
            <option value="mcq">MCQ</option>
            <option value="descriptive">Descriptive</option>
            <option value="yes_no">Yes/No</option>
          </select>
        </div>

        <div className="mb-4">
          {questionData.type === 'yes_no' && (
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-600">Correct Answer</label>
              <select
                name="correctAnswer"
                value={questionData.correctAnswer}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              >
                <option value="">Select Correct Answer</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          )}
        </div>
        <div className="mb-4">
          {questionData.type === 'mcq' && (
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-600">Options</label>
              {questionData.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="mt-1 p-2  border rounded-md mb-2"
                  required
                />
              ))}
              <label className="block text-sm font-medium text-gray-600">Correct Answer</label>
              <select
                name="correctAnswer"
                value={questionData.correctAnswer}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              >
                <option value="">Select Correct Answer</option>
                {questionData.options.map((option, index) => (
                  <option key={index} value={String(index)}>
                    {`Option ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Marks</label>
          <input
            type='number'
            name="marks"
            value={questionData.marks}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Display error messages for each input */}
        <div className="text-red-500 text-sm mb-4">
          <p>{errors.statement}</p>
          <p>{errors.type}</p>
          <p>{errors.marks}</p>
          {errors.options?.map((optionError, index) => (
            <p key={index}>{optionError}</p>
          ))}
          <p>{errors.correctAnswer}</p>
          <p>{errors.exceed}</p>
        </div>
        </form>
        <button
          type="button"
          onClick={handleAddQuestion}
          className="text-blue-500 mr-4 border-blue-500 border px-4 py-2 rounded-md hover:text-white hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300"
        >
          + Add New Question
        </button>
        <button
          type="submit"
          disabled={isSubmitDisabled}
          onClick={handleSubmitExam}
          className={`text-white bg-blue-500 border px-4 py-2 rounded-md hover:text-white hover:bg-blue-400 focus:outline-none ${isSubmitDisabled ? 'disabled:bg-gray-400 disabled:cursor-not-allowed' : ''
            } focus:ring focus:border-blue-300`}
        >
          Submit
        </button>
    </div>
  );
};

export default QuestionForm;
