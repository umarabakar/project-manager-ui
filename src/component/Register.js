import React, { useEffect, useRef } from "react";
import { useState } from "react";
import bg_pic from '../images/40.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_\s]{3,24}$/;
    const PHONE_REGEX = /^[0-9]{0-10}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [PhoneFocus, setPhoneFocus] = useState(false);

    const [email, setEmail] = useState('');

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        if(!success){
            userRef.current.focus();
        }

    }, [])
    
    useEffect(() => {
        const result = USER_REGEX.test(name);
        console.log(result);
        setValidName(result);

    }, [name])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result)
        setValidPwd(result);

    }, [pwd])

    useEffect(() => {
        const result = PHONE_REGEX.test(phone);
        setValidPwd(result);

    }, [phone])

   const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);

        const v1 = PWD_REGEX.test(pwd);
        const v2 = USER_REGEX.test(name);

        if(!v1 || !v2){
          setErrMsg("Invalid Entry")
       }else{
        try{
            const response =  await axios.post('/register', 
            JSON.stringify({ name, mobile_number: phone, email, password: pwd}));
            console.log(response?.data?.success)
    
            if(response?.data?.success){
                setSuccess(true);
              }else{
                  if(response?.meta.statusCode === 400){
                      setErrMsg(response?.message)
                  }
              }
            } catch(err){
                if(err?.response){
                    setErrMsg(err?.response?.message)
                }
                else if(err?.response?.status === 400){
                    setErrMsg('Empty Field')
                }
           }
       }
     }
    return(
       
        <div className="flex">
            <div style={{ backgroundImage: `url(${bg_pic})`,backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '50%', height: '100vh'}} className="bg-image"></div>
            {
                success ? (
                    <section className="text-wrapper">
                      <div className="shadow wrapper">
                            <h1 className="text-2xl mt20">Registration Successful!!</h1>
                            <FontAwesomeIcon icon="fa-solid fa-circle-check" className="text-green-700" size="2x"/>
                            <p className="text-xl underline"> <a href="http://localhost:3000/login">Sign In</a> </p>
                        </div>
                    </section>     
                )
                :(
                    <div className="formpage flex items-center">
                    <form onSubmit={handleSubmit} className="signform">    
                        <section>
                            <p ref={errRef} className={errMsg ? "errmsg" :
                            "hide"} aria-live="assertive">{<FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />} {errMsg}</p>
                        </section>
                        <h1 className=" form-header f2 b mb-5">Register</h1>
                        <div className="flex">
                            <div className="mr-3">
                                <label htmlFor="name" className="b register-label">Name</label>
                                <input 
                                    className="register-input"
                                    id="name"
                                    name="name"
                                    value={name} 
                                    ref={userRef}
                                    autoComplete="off" 
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby = "uidnote"
                                    onFocus={() => setNameFocus(true)}
                                    onBlur={() => setNameFocus(false)}
                                    onChange={(e) => setName(e.target.value)} type="text" />
                                <p id="uidnote" className={!validName && name && nameFocus ?  'instruction' : "hide" }>
                                    <FontAwesomeIcon icon="fa-solid fa-info-circle" className="mr-2" />
                                    4 to 24 characters.<br/>
                                    Must begin with a letter<br/>
                                    Letters, numbers, underscores allowed. 
                                </p>
                            </div>
                            <div>
                                <label className="b form-label">Mobile Number</label>
                                <input className="register-input" required name="mobile_number" value={phone} 
                                onChange={(e) => setPhone(e.target.value)} type="text" />
                            </div>
                        </div>
                        <div>
                            <label className="b form-label">Email Address</label>
                            <input 
                            className={errMsg ? "form-error" :
                            "form-input"}
                            name="email"
                            required
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} type="email" />
                        </div>
                        <div>
                            <div className="flex justify-between items-center input-ref">
                                <label className="mb-1 b form-label">Password</label>
                                <a href="" className="font-bold text-xs ">Forgot Password?</a>
                            </div>
                                <input className="form-input"  
                                name="password"
                                type="password"
                                value={pwd} 
                                autoComplete="off" 
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby = "pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                onChange={(e) => setPwd(e.target.value)}/>
                                <p id="pwdnote" className={!validPwd && pwd && pwdFocus ?  'instructions' : "hide" }>
                                    <FontAwesomeIcon icon="fa-solid fa-info-circle" className="mr-2" />
                                    8 to 24 characters.<br/>
                                    Must include uppercase and lowercase letters, a number and a special character<br/>
                                </p>
                        </div>
                        <button 
                        className ='mt-4 mb-4 flex justify-center items-center form-submit'  
                        type="submit" 
                        id ="formsubmit">{ submit ? (<div className="flex"><FontAwesomeIcon icon="fa-solid fa-spinner" 
                        className="text-white mr-2 mt-1 fa-spin" /> <p>Loading</p></div>) : "Sign Up"} </button>
                        <div className="flex justify-center">
                            <p className="text-gray-400">Already have an account?</p>
                            <a href="http://localhost:3000/login" className="ml-2 font-bold underline">Sign in</a>
                        </div>
                    </form>
                </div>
                )
            } 
        </div>
    );
}

export default Register;