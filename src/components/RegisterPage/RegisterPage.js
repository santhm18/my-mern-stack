import React from "react";
import { Link } from 'react-router-dom';
import { userActions } from '../../_actions/profile';
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import useValidateForm from '../../customValidations/useValidateForm';
import  "../RegisterPage/RegisterPage.css";

function RegisterPage()  {
    const navigate = useNavigate();
     // Custom hooks for vaidation of fields
    const formRegister = async () =>{
        console.log("Callback function when form is submitted!");
        console.log("Form Values ", values);
        const { navigateTo } = location.state || { navigateTo: { pathname: "/sign-in" }};
       dispatch(userActions.register(values, navigate, navigateTo)); // dispatch the user  to be registered with payload of user
    }
   
    // Destructuring useValidateForm(formRegister) function/method to extract properties/methods from it and bind/return them to variables present here
    const {handleChange, values,errors,handleSubmit } = useValidateForm(formRegister);
    const location= useLocation();
   
    const dispatch = useDispatch();
        return (
         <div className="authWrapper">
            <div className="authInner">
            <h4 className="signTitle">Register account</h4>
                <form name="form" onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group marginBottom15">
                        <label className="form-group marginBottom5">First name</label>
                        <input type="text" className="form-control" placeholder="First name" name="firstname"
                        onChange={handleChange}/>
                           {errors.firstname &&  <div className="invalid">{errors.firstname}</div>}

                    </div>
                    <div className="form-group marginBottom15">
                        <label className="form-group marginBottom5">Last name</label>
                        <input type="text" className="form-control" placeholder="Last name"  name="lastname" 
                         onChange={handleChange}/>
                           {errors.lastname &&  <div className="invalid">{errors.lastname}</div>}
                    </div>
                    <div className="form-group marginBottom15">
                        <label className="form-group marginBottom5">Phone Number</label>
                        <input type="text" className="form-control" placeholder="Phone Number"  name="phoneNumber" 
                         onChange={handleChange}/>
                           {errors.phoneNumber &&  <div className="invalid">{errors.phoneNumber}</div>}
                    </div>
                    <div className="form-group marginBottom15">
                        <label className="form-group marginBottom5">Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" name="email" 
                        onChange={handleChange}/>
                         {errors.email &&  <div className="invalid">{errors.email}</div>}
                    </div>
                    <div className="form-group marginBottom15">
                        <label className="form-group marginBottom5">Password</label>
                        <input type="password" className="form-control" placeholder="Enter password"  name="password"
                         onChange={handleChange}/>
                         {errors.password &&  <div className="invalid">{errors.password}</div>}
                         
                    </div>
                    <p className="text-left loginRegisterBtn">
                        <span>Already registered</span>&nbsp;&nbsp;&nbsp;
                    <Link to="/sign-in" className="btn btn-link loginLink" >Login</Link>
                    </p>
                    <button type="submit" className="btn btn-outline-primary RegisterBtn">Register</button>
                </form>
            </div>
        </div>  
        );
    }
    export default RegisterPage;