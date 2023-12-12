// ResultPage.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ResultPage = (props) => {
    const score = useSelector(state => state.test.score);
    return (
        <div className='flex flex-col justify-center'>
            <div className="flex justify-center mt-20 mb-8">
                <div className="text-center p-16 bg-green-300 rounded shadow-md">
                    <h1 className="text-4xl font-bold mb-10">Result of Objective portion</h1>
                    <p className="text-blue-500 text-5xl font-bold mt-8">{score}%</p>
                </div>
            </div>
            <Link to='/exams' className='text-blue-500 underline text-center'>
                Explore Exams
            </Link>
        </div>
    );
};

export default ResultPage;
