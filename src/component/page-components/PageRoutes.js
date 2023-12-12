import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from '../../pages/LandingPage';
import ServicesPage from '../../pages/ServicesPage';
import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignupPage';
import CreateExamPage from '../../pages/CreateExamPage';
import AvlExamsPage from '../../pages/AvlExamsPage';
import ExamPage from '../../pages/ExamPage';
import ProfilePage from '../../pages/ProfilePage';
import { LogoutAction, checkAuthLoader } from '../auth/helper';
import ResultPage from '../../pages/ResultPage';


const router = createBrowserRouter([
    {
        path: '/',
        id: 'root',
        element: <Layout />,
        children: [
            { index: true, element: <LandingPage /> },
            {
                path:'services',
                element:<ServicesPage/>,
                loader:checkAuthLoader
            },
            {
                path:'create-exam',
                element:<CreateExamPage/>,
                loader:checkAuthLoader
            },
            {
                path:'exams',
                element:<AvlExamsPage/>
            },   
            {
                path:'user/profile',
                element:<ProfilePage/>,
                loader:checkAuthLoader
            },        
            {
                path:'exam/result',
                element:<ResultPage/>,
                loader:checkAuthLoader
            },        
        ]
    },
    {
        path:'/auth',
        id:'auth',
        children:[
            {
                path:'login',
                element:<LoginPage/>
            },
            {
                path:'signup',
                element:<SignupPage/>
            },
        ]
    },
    {
        path:'/test',
        element:<ExamPage/>,
        loader:checkAuthLoader
    },
    {
        path:'logout',
        action:LogoutAction
    },
])

const PageRoutes = () => {
    return <RouterProvider router={router} />
}

export default PageRoutes;