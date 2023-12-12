import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const handleLoguout = async () => {
        signOut(auth).then(val => {
            localStorage.removeItem('token');
            navigate('/');
        });
    }
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to='/' className='flex'>
                    <GoHome size='1.5rem' color='white' />
                    <div className="inline ml-2 text-white font-bold text-lg">ExamPortal</div>

                </Link>
                <div>
                    <Link to='/user/profile'>
                        <button className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Profile
                        </button>
                    </Link>
                    {token && <Link onClick={handleLoguout}>
                        <button className="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Logout
                        </button>
                    </Link>}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
