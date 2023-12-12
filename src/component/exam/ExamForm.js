import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBasicInfo } from '../../redux/examSlice';

const ExamForm = () => {
  const [formData, setFormData] = useState({
    examName: '',
    totalQuestions: '',
    totalTime: '',
    totalMarks: '',
  });

  const [errors, setErrors] = useState({
    examName: '',
    totalQuestions: '',
    totalTime: '',
    totalMarks: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the corresponding error when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    const newErrors = {};

    if (!formData.examName.trim()) {
      newErrors.examName = 'Name of Exam is required';
    }

    if (isNaN(formData.totalQuestions) || formData.totalQuestions <= 0) {
      newErrors.totalQuestions = 'Enter a valid number of questions';
    }

    if (isNaN(formData.totalTime) || formData.totalTime <= 0) {
      newErrors.totalTime = 'Enter a valid total time';
    }

    if (isNaN(formData.totalMarks) || formData.totalMarks <= 0) {
      newErrors.totalMarks = 'Enter a valid total marks';
    }

    // Set errors and prevent form submission if there are errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Dispatch the action if there are no errors
      dispatch(updateBasicInfo(formData));
    }      console.log(formData);

  };

  return (
    <div className="w-2/5 mx-auto p-8 items-center">
      <h1 className='block text-3xl mb-10 text-center font-bold text-gray-600'>Basic Info</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name of Exam</label>
          <input
            type="text"
            name="examName"
            value={formData.examName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Total Questions</label>
          <input
            type="number"
            name="totalQuestions"
            value={formData.totalQuestions}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Total Time (in minutes)</label>
          <input
            type="number"
            name="totalTime"
            value={formData.totalTime}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Total Marks</label>
          <input
            type="number"
            name="totalMarks"
            value={formData.totalMarks}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Display error messages for each input */}
        <div className="text-red-500 text-sm mb-4">
          {errors.examName && <p>{errors.examName}</p>}
          {errors.totalQuestions && <p>{errors.totalQuestions}</p>}
          {errors.totalTime && <p>{errors.totalTime}</p>}
          {errors.totalMarks && <p>{errors.totalMarks}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 w-20 mt-4 mx-auto text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Proceed
        </button>
      </form>
    </div>
  );
};

export default ExamForm;
