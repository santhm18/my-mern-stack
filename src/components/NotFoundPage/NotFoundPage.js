import React from "react";
import { Link } from 'react-router-dom';
import "./NotFoundPage.scss";
function NotFoundPage() {

    return (
        <div className="NotFoundPage">
            <div className="notFoundPageBody">
                <div className="notFoundPageContent text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                    <p className="lead">
                        The page you’re looking for doesn’t exist.
                    </p>
                    <Link to="/home"> <button className="btn btn-primary">Go Home</button></Link>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;