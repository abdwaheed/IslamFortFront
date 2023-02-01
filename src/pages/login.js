import React, { useEffect, useState } from 'react'
import logoSm  from '../assets/images/logo-sm.png'
import { Link, useNavigate } from "react-router-dom";
import {useSignIn} from 'react-auth-kit'
import { useValidation } from 'react-simple-form-validator';
import {useIsAuthenticated} from 'react-auth-kit';

function Login() {

    const navigate = useNavigate();

    const isAuthenticated = useIsAuthenticated();

    useEffect(()=>{
        if(isAuthenticated())
            navigate("/recieptList");

    },[])
    const signIn = useSignIn();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
        fieldsRules: {
          email: { email: true , required: true },
          password: { required: true }
        },
        state: { email, password }
    });

    const loginUser = async (e)=>{

        // Check the form rules are validated
        // so we can go ahead with the service call
        e.preventDefault();
            try{
                const response = await fetch("/login",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email,
                        password
                    })
                });
                const result = await response.json();

                if(!result?.success){
                    alert("Invalid Credentials provided");
                }else{
                    localStorage.setItem('token',result?.message?.token);
                    signIn({
                        token: result?.message?.token,
                        expiresIn: 120,
                        tokenType: "Bearer",
                        authState: {token: result?.message?.token}
                    });
                    navigate(
                        '/recieptList',
                        // {
                        //   state: {
                        //   token:  result?.message?.token
                        //   }
                        // }
                      );
                }

            }
            catch(e){
                console.log(e);
            }

    }


return (

<>
{
    !isAuthenticated() &&
    <>
<div className="accountbg"></div>
        <div className="wrapper-page">

            <div className="card">
                <div className="card-body">

                    <h3 className="text-center mt-0 m-b-15">
                        <a href="/#" className="logo logo-admin">
                          <img src={logoSm} height="90" alt="logo"/>
                          </a>
                    </h3>

                    <div className="p-3">
                        <form className="form-horizontal m-t-20" onSubmit={loginUser}>

                            <div className="form-group row">
                                <div className="col-12">
                                    <input className="form-control" name="email" onChange={(e)=>setEmail(e.target.value)}
                                    type="text" required="" placeholder="Email"
                                    value={email}/>
                                    <p className="error-text" style={{color: "red" , fontWeight:"bold" }}>
                                        {isFieldInError('email') && getErrorsInField('email').join('\n')}
                                    </p>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-12">
                                    <input className="form-control" name="password" onChange={(e)=>setPassword(e.target.value)}
                                    type="password" required="" placeholder="Password" value={password}/>
                                    <p className="error-text" style={{color: "red" , fontWeight:"bold" }}>
                                        {isFieldInError('Password') && getErrorsInField('Password').join('\n')}
                                    </p>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-12">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" for="customCheck1">Remember me</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group text-center row m-t-20">
                                <div className="col-12">
                                    <button className="btn btn-warning text-white  btn-block waves-effect waves-light"
                                     type="submit" disabled={!isFormValid}>Log In</button>
                                </div>
                            </div>

                            <div className="form-group m-t-10 mb-0 row">
                                <div className="col-sm-7 m-t-20">

                                    <a href="/#" className="text-muted">
                                      <i className="mdi mdi-lock"></i> <small>Forgot your password ?</small>
                                      </a>
                                </div>
                                <div className="col-sm-5 m-t-20">
                                <Link to="/" className='text-muted' value="Already"><small>Create an account ?</small></Link>

                                    {/* <a href="/#" className="text-muted"><i className="mdi mdi-account-circle"></i> <small>Create an account ?</small></a> */}
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
        </>
}
        </>
  )
}

export default Login