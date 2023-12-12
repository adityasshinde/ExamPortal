import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { SlPeople } from "react-icons/sl";
import { Link } from 'react-router-dom';


const ServicesPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="grid gap-14 md:grid-cols-2 md:gap-10">
                <Link to='/create-exam'>
                <div className="rounded-xl bg-white p-6 text-center shadow-xl w-70 h-60 mx-auto hover:bg-blue-200 hover:shadow-md cursor-pointer">
                    <div className="mx-auto flex h-12 w-12 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
                    <IoIosAddCircleOutline size='3rem' color='white' />
                    </div>
                    <h1 className="text-darken mb-3 text-xl font-medium lg:px-14">CREATE</h1>
                    <p className="px-4 text-gray-500">Create and customize exam.</p>
                </div>
                </Link>

                <Link to='/exams'>
                <div className="rounded-xl bg-white p-3 text-center shadow-xl w-70 h-60 mx-auto cursor-pointer hover:bg-blue-200 hover:shadow-md">
                    <div className="mx-auto flex h-12 w-12 -translate-y-10 transform items-center justify-center rounded-full shadow-lg bg-sky-500 shadow-sky-500/40">
                    <SlPeople size='2rem' color='white' /> 
                    </div>
                    <h1 className="text-darken mb-3 pt-3 text-xl font-medium lg:h-14 lg:px-14">PARTICIPATE</h1>
                    <p className="px-4 text-gray-500">Participate in the available exams.</p>
                </div>
                </Link>
            </div>
        </div>
    );
};

export default ServicesPage;
