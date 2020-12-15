import React from 'react';
import './Login.css'

const Login = () => {
    return (
        <>
            <div className="text-center login-div">
                <div className="login-form">
                    <form className="form-signin">
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label htmlFor="username" className="sr-only">Email address</label>
                        <input type="text" name="username" id="username" className="form-control my-2" placeholder="username" required autofocus />
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" name="password" id="inputPassword" className="form-control my-2" placeholder="Password" required/>
                        <button className="btn btn-lg btn-primary btn-block my-2" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;