import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const containerStyle = {
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #3498db, #a8d8ff)',
        padding: '0 1rem', 
      };
  return (
    <div style={containerStyle}>
       <div className="max-w-sm p-6 bg-white h-80vh border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto my-auto text-center">
      <a href="#" className='cursor-pointer'>
        <h5 className="mb-2 text-2xl text-left font-bold tracking-tight text-gray-900 dark:text-white">Get Started with ExamPortal</h5>
      </a>
      <p className="mb-3 font-normal text-left text-gray-700 dark:text-gray-400">Here are the most sophasticated technology service for creating, managing and participating in exams.</p>
      <Link to='services' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Proceed
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        </Link>
    </div>
    </div>
  );
};

export default LandingPage;
