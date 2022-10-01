import React, { useEffect, useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bg_pic from '../images/40.jpg'
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import {useNavigate} from 'react-router-dom';


const Login = () => {

   const {setAuth, auth} = useAuth();
    
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [syserror, setSysError] = useState('');
    const nav = useNavigate();
    const errRef = useRef();
    const refresh = useRefreshToken();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response =  await axios.post('/signin', 
            JSON.stringify({ email, password: pwd}));
    
            console.log(response)
            if(response?.data?.success){
               const accessToken = response.data.data;
               await setAuth({accessToken, email, pwd})
                console.log(auth);
                nav('/');
               
                }
            if(response?.data?.meta?.statusCode === 400){
                setErrMsg(response?.data?.message)
            }
            } catch(err){
                if(err?.response){
                    setErrMsg('No Server Response')
                }
                else if(err?.response?.status === 400){
                    setErrMsg('Inorrect User')
                }
        }
     }


    return(
        <div className="flex">
            <div style={{ backgroundImage: `url(${bg_pic})`,backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '50%', height: '100vh'}} className="bg-image"></div>
            <div className="formpage flex items-center">
          
            <form action="http://localhost:3001/signin" onSubmit={handleSubmit} className="signform" method="post" >
               
                    <section>
                    <p ref={errRef} className={syserror ? "errmsg" :
                    "hide"} aria-live="assertive">{<FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />} {syserror}</p>
                    </section>

                   <h1 className=" form-header f2 b mb-5">Sign In</h1>
                   <div>
                        <label className="b form-label">Email Address</label>
                        <input 
                        className={errMsg ? "form-error" :
                        "form-input"}
                        name="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} type="email" />

                        <section>
                        <p ref={errRef} className={errMsg ? "errmsg" :
                        "hide"} aria-live="assertive">{<FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />} {errMsg}</p>
                        </section>
                    </div>

                   <div>
                    <div className="flex justify-between items-center input-ref">
                        <label className="mb-1 b form-label">Password</label>
                        <a href="" className="font-bold text-xs  ">Forgot Password?</a>
                    </div>
                       <input className="form-input" 
                        name="Password" 
                        type="password"  
                        onChange={(e) => setPwd(e.target.value)}/>
                   </div>

                    <div className="flex items-center form-checkbox">
                        <input className="mr-2 checkbox" type="checkbox" />
                        <span className="tag">Remember me</span>
                   </div>
                   <input className ='mt-4 mb-4 form-submit'  type="submit" value="Sign in" />

                   <div className="flex justify-center">
                    <p className="text-gray-400">Dont have an account?</p>
                    <a href="http://localhost:3000/register" className="ml-2 font-bold underline">Sign Up</a>
                   </div>
               </form>
            </div>
        </div>

    );
}

export default Login;