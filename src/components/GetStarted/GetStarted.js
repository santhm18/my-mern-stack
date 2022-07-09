import React from "react";
import {Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import  "./GetStarted.css";
function GetStarted(){
        const isloggedIn = useSelector(state => state.authentication);
        console.log(isloggedIn);
        return (
            <div className="container paddingTop">
            <div className="centerAlign">
               <h1 className="title">MERN stack app</h1>
               <Link className="btn btn-primary getStarted" to={"/sign-in"}>Get Started</Link>
            </div>
             </div>
        );
}

export default GetStarted;