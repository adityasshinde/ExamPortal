import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Overlay from '../component/ui/Overlay';

const SignupPage = () => {
  // State for input values and errors
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cnfpassword: '',
  });
  const [loading,setLoading]=useState(false);
  const [apierr,setApierr]=useState(false);
  const navigate=useNavigate();

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    cnfpassword: '',
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    // Clear the corresponding error when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: '',
    }));
  };

  // Function to handle form submission
  const handleSignUp = () => {
    // Validate input fields
    const newErrors = {};

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    // Validate Password
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Validate Confirm Password
    if (formData.password !== formData.cnfpassword) {
      newErrors.cnfpassword = 'Passwords do not match';
    }

    // Set errors and prevent form submission if there are errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      //calling signup api
      createUserWithEmailAndPassword(auth,formData.email,formData.password)
      .then((res)=>{
        console.log(res);
        setLoading(false);
        const user=res.user;
        updateProfile(user,{
          displayName:formData.name
        });
        navigate('/services')

      })
      .catch((err)=>{
        console.log(err);
        setLoading(false);
        setApierr(err.message);
      }) ;
    }
  };

  return (
    <section className="bg-blue-50">
      {loading && <Overlay message='Signing up, please wait....' />}
      <div className="w-full min-h-screen flex items-center justify-center my-auto px-8 mx-auto pt-6">
        <div className="relative flex flex-col w-50 break-words mb-6 shadow-lg rounded-lg bg-blue-200 border-0">
          <div className="text-center my-3">
            <h6 className="text-blue-500 text-lg font-bold">Sign up with</h6>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <div className="relative w-full mt-5 mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Name"
                />
                {/* Display error if there is any */}
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
                {/* Display error if there is any */}
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
                {/* Display error if there is any */}
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="cnfpassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="cnfpassword"
                  value={formData.cnfpassword}
                  onChange={handleInputChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Confirm Password"
                />
                {/* Display error if there is any */}
                <p className="text-red-500 text-xs mt-1">{errors.cnfpassword}</p>
              </div>
              <div className="text-center mt-6">
                {apierr && <p className="text-red-500 text-xs mt-1">{apierr}</p>}
                <button
                  onClick={handleSignUp}
                  className="bg-blue-800 hover:bg-blue-600 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="mt-2 text-center text-sm text-gray-600 max-w">
              Or&nbsp;
              <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
