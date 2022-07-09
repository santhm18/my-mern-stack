import React, { useState, useEffect } from "react";
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import "./DashBoard.css";
import MemoriesForm from '../MemoriesForm/MemoriesForm';
import MemoriesPosts from '../MemoriesPosts/MemoriesPosts';
import { getMemories } from '../../_actions/memoriespost';
function Dashboard() {
    const [currentId, setCurrentId] = useState(0);
    // const [showLoading, setShowLoading] = useState(true);
    const isUserLogged = useSelector(state => state.authentication);
    const { user: currentUser } = useSelector((state) => state.authentication);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMemories());
    }, [currentId, dispatch]);
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };
    if (currentUser) {
        const decodedJwt = parseJwt(currentUser.token);
        if (decodedJwt.exp * 1000 < Date.now()) {
            sessionStorage.clear();
            return <Navigate to="/sign-in" />;
        }
    }

    if (typeof isUserLogged['loggedIn'] !== "undefined" && isUserLogged['loggedIn']) {
        return (
            <div className="dashboard">
                <div className="ms-3 mt-3">
                <h1 className="margin0">Welcome {currentUser.user.firstname}&nbsp;{currentUser.user.lastname}</h1>
                <p className="displayLastLogin">Last Login: {moment.utc(currentUser.user.lastLogin).local().format('DD MMM YYYY')}</p>
                </div>

                <div className="createButton">
                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#memoryFormModal">
                        <i className="bi bi-plus-circle"></i>&nbsp;Create Memory
                    </button>
                </div>
                <MemoriesForm currentId={currentId} setCurrentId={setCurrentId} />
                <MemoriesPosts />
            </div>
        );
    } else {
        return (
            <div className="text-center">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
}

export default Dashboard;