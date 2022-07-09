import React, { useState, useEffect } from "react";
import { userActions } from '../../_actions/profile';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import "./LoginPage.css";
function LoginPage() {
    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState({
        email: '',
        password: '',
    })
    const [submitted, setSubmitted] = useState(false);
    const isRegistered = useSelector(state => state.registration.registered);
    const errorMsg = useSelector(state => state.authentication.message);
    const [showElement, setShowElement] = React.useState(true);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        setTimeout(function () {
            setShowElement(false);
        }, 5000);
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setLoggedUser(loggedUser => ({ ...loggedUser, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (loggedUser.email && loggedUser.password) {
            const { from } = location.state || { from: { pathname: "/home" } };
            dispatch(userActions.login(loggedUser, navigate, from));
        } 
    }
    return (
        <div className="authWrapper">

            {errorMsg &&
                <div className="successDialog">
                    <div className="alert alert-danger" role="alert">
                    {errorMsg}
                    </div>
                </div>}
            
            {showElement && typeof isRegistered !== "undefined" && isRegistered &&
                <div className="successDialog">
                    <div className="alert alert-success" role="alert">
                        User has been successfully registered. Please login!!
                    </div>
                </div>}
            <div className="authInner">
                <h4 className="signTitle">Sign in to your account</h4>
                <form name="form" onSubmit={handleSubmit} autoComplete="off">
                    <div className="marginBottom15">
                        <label className="emailAddress">Email address</label>
                        <input type="email" className={'form-control loginFields' + (submitted && !loggedUser.email ? ' is-invalid' : '')} placeholder="Enter email" name="email"
                            value={loggedUser.email} onChange={handleChange} />
                        {submitted && !loggedUser.email && <div className="invalid-feedback">Email address is required</div>}
                    </div>
                    <div className="marginBottom15">
                        <label className="password">Password</label>
                        <input type="password" className={'form-control loginFields' + (submitted && !loggedUser.password ? ' is-invalid' : '')} placeholder="Enter password" name="password"
                            value={loggedUser.password} onChange={handleChange} />
                        {submitted && !loggedUser.password && <div className="invalid-feedback">Password is required</div>}
                    </div>
                    {/* <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div> */}
                    <div className="form-actions">
                        <span className="notRegisteredLink">Not Registered <Link to="/sign-up">Sign Up</Link></span>
                        <button className="btn btn-outline-primary loginBtn">
                        Sign In</button>
                        </div>
                </form>
            </div>
        </div>

    );
}

export default LoginPage;