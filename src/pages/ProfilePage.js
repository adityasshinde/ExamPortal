// ProfilePage.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const userData = useSelector((state) => state.test.user);

  const examsAttempted = [
    { examName: 'Math Exam', objectiveScore: 85 },
    { examName: 'Science Exam', objectiveScore: 92 },
    // Add more exams as needed
  ];

  const examsCreated = [
    { examName: 'Math Exam', totalMarks: 100, totalQuestions: 10, totalTime: 60 },
    { examName: 'Science Exam', totalMarks: 100, totalQuestions: 10, totalTime: 60 },
    { examName: 'Science Exam', totalMarks: 100, totalQuestions: 10, totalTime: 60 },
    { examName: 'Science Exam', totalMarks: 100, totalQuestions: 10, totalTime: 60 },
    // Add more exams as needed
  ];

  const [viewAttempted, setViewAttempted] = useState(true);

  return (
    <div className="container mx-auto mt-8 p-8">
      <div className="bg-purple-400 p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <div className="mb-4">
          <p className="text-lg font-semibold">{userData.name}</p>
          <p className="text-black">{userData.email}</p>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Exams {viewAttempted ? 'Attempted' : 'Created'}</h3>
            <div className="space-x-4">
              <button
                className={`px-4 py-2 rounded-md focus:outline-none ${
                  viewAttempted ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
                onClick={() => setViewAttempted(true)}
              >
                Attempted
              </button>
              <button
                className={`px-4 py-2 rounded-md focus:outline-none ${
                  !viewAttempted ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
                onClick={() => setViewAttempted(false)}
              >
                Created
              </button>
            </div>
          </div>

          {viewAttempted ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {examsAttempted.map((exam, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 rounded-md shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-semibold">{exam.examName}</p>
                    <p>Objective Score: {exam.objectiveScore}</p>
                  </div>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    onClick={() => console.log(`View details of ${exam.examName}`)}
                  >
                    View Details
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {examsCreated.map((exam, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 rounded-md shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-semibold">{exam.examName}</p>
                    <p>Total Marks: {exam.totalMarks}</p>
                    <p>Total Questions: {exam.totalQuestions}</p>
                    <p>Total Time: {exam.totalTime} minutes</p>
                  </div>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    onClick={() => console.log(`View details of ${exam.examName}`)}
                  >
                    View Details
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
