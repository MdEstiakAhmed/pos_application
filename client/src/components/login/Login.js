import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Alert from '../alert/Alert'
import {UserContext} from '../../App';
import './Login.css'

const Login = () => {
    const {state, dispatch} = useContext(UserContext);
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();
    const [alert, setAlert] = useState({success: false, error: false, message: ''});
    const [loader, setLoader] = useState(false);

    const onSubmit = data => {
        setAlert({success: false, error: false, message: ''});
        setLoader(true);
        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data => {
            if(data.status){
                setAlert({success: true, error: false, message: data.message})
                localStorage.setItem('jwt', JSON.stringify(data.token));
                delete data.data.password;
                localStorage.setItem('user', JSON.stringify(data.data));
                dispatch({type: "USER", payload: data.data});
                setLoader(false);
                history.push('/');
            }
            else{
                setLoader(false);
                setAlert({success: false, error: true, message: data.message});
            }
        })
        .catch(error => {
            setLoader(false);
            setAlert({success: false, error: true, message: error.message});
        })
    }

    return (
        <>
            <div className="text-center login-div">
                <div className="login-form">
                    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label htmlFor="username" className="sr-only">Email address</label>
                        <input type="text" name="username" id="username" className="form-control my-2" ref={register} placeholder="username" required autoFocus />
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" name="password" id="inputPassword" className="form-control my-2" ref={register} placeholder="Password" required/>
                        {
                            loader ?
                            <button className="btn btn-lg btn-primary btn-block my-2" type="submit">loading...</button> :
                            <button className="btn btn-lg btn-primary btn-block my-2" type="submit">Sign in</button> 
                        }
                        {
                            alert.success ?
                            <Alert message={alert.message} status={true}/> :
                            alert.error ?
                            <Alert message={alert.message} status={false}/> :
                            null
                        }
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;