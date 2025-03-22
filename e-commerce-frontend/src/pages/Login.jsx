import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { useNavigate } from "react-router-dom";

const Login = ({token, setToken}) => {
  const [signup,setsignup] = useState(true);
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [name,setname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
     // toast.success("Login successful! Redirecting...");
      navigate("/");
    }
  }, [token,navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if(signup){
        const response = await axios.post(backendUrl+`/api/user/register`,{
          name,
          email,
          password
        });
        if(response.data.success)
        {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token); // Store in localStorage
      } else {
        throw new Error("Invalid credentials");
      }  
        
      }
    else
    {
      const response = await axios.post(backendUrl+`/api/user/login`,{
        email,
        password
      });
      if(response.data.success)
      {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token); // Store in localStorage
    } else {
      throw new Error("Invalid credentials");
    }  
    }


    } catch (error) {
      console.error("Invalid credentials, please try again.");
    }
  }

  const nameHandler = (e) => {
    setname(e.target.value);
  }

  const emailHandler = (e) => {
    setemail(e.target.value);
  }

  const passwordHandler = (e) => {
    setpassword(e.target.value);
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='bg-black w-1/2 sm:w-1/3 text-white my-25 rounded-2xl py-7'>
      <form onSubmit={submitHandler} className='flex flex-col justify-center items-center gap-3' >
        {
          signup &&
          <>
          <label htmlFor="fname">Name</label>
        <input onChange={nameHandler} className='bg-white text-black' type="text" name="" id="fname" />
        </>
        }
        <label htmlFor="email">E-Mail</label>
        <input onChange={emailHandler} className='bg-white text-black' type="text" name="" id="email" />
        <label htmlFor="pass">Password</label>
        <input onChange={passwordHandler} className='bg-white text-black m-3' type="password" name="" id="pass" />
        {
          signup &&
          
            <button type='submit' className='cursor-pointer bg-white text-black rounded-xs w-1/4'>
            Signup
            </button>
          
        }
        {
          !signup &&
          
            <button type='submit' className='cursor-pointer bg-white text-black rounded-xs w-1/4'>
            Login
            </button>
          
        }
        <div onClick={()=>{setsignup(!signup)}} className='ml-auto mr-12 cursor-pointer'>
        {
          signup &&
          <p>Login</p>
        }
        {
          !signup &&
          <p>Signup</p>
        }
        </div>
      </form>
      </div>
    </div>
  )
}

export default Login
