import React from 'react'
import ExamForm from '../component/exam/ExamForm';
import QuestionForm from '../component/exam/QuestionForm';
import { useSelector } from 'react-redux';

const CreateExamPage = () => {
  const step = useSelector(state => state.exam.basicInfo)
  return <div className='min-h-screen flex  justify-center bg-blue-100'>
    {step ?
      <QuestionForm />
      :
      <ExamForm />
    }
  </div>
}

export default CreateExamPage;