import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Overlay from '../component/ui/Overlay';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

const LoginPage = () => {
  // State for input values and errors
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading,setLoading]=useState(false);
  const [apierr,setApierr]=useState(false);
  const navigate=useNavigate();

  const [errors, setErrors] = useState({
    email: '',
    password: '',
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
  const handleGoogleSignin=()=>{
    signInWithPopup(auth,provider)
    .then((res)=>{
      console.log(res);
      setLoading(false);
      console.log('here')
      navigate('/services')
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
      setApierr(err.message);
    });
  }

  // Function to handle form submission
  const handleSignIn = () => {
    // Validate input fields
    const newErrors = {};

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    // Validate Password
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    // Set errors and prevent form submission if there are errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      //calling signin api
      
      signInWithEmailAndPassword(auth,formData.email,formData.password)
      .then((res)=>{
        console.log(res);
        setLoading(false);
        console.log('here')
        navigate('/services')
      })
      .catch((err)=>{
        console.log(err);
        setLoading(false);
        setApierr(err.message);
      });
    }
  };

  return (
    <section className="bg-blue-50">
            {loading && <Overlay message='Signing in, please wait....' />}

      <div className="w-full min-h-screen flex items-center justify-center my-auto px-8 mx-auto pt-6">
        <div className="relative flex flex-col w-50 break-words mb-6 shadow-lg rounded-lg bg-blue-200 border-0">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-3">
              <h6 className="text-blue-500 text-sm font-bold">Sign in with</h6>
            </div>
            <div className="btn-wrapper text-center">
              <button onClick={handleGoogleSignin} className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button">
                <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg" />Google
              </button>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div className="text-blueGray-400 text-center mb-3 font-bold">
              <small>Or sign in with credentials</small>
            </div>
            <form>
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
              <div className="text-center mt-6">
              {apierr && <p className="text-red-500 text-xs mt-1">{apierr}</p>}

                <button
                  onClick={handleSignIn}
                  className="bg-blue-800 hover:bg-blue-600 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                >
                  Sign In
                </button>
              </div>
            </form>
            <p className="mt-2 text-center text-sm text-gray-600 max-w">
              Or&nbsp;
              <Link to="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
                create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
