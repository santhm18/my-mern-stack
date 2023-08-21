import React, { useState } from "react";
import { Types } from '../../_constants/actionTypes';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { userActions } from '../../_actions/profile';
import "./SideNavBar.css";
function SideNavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.authentication);
    const active = { backgroundColor: '#EFF5FF' }
    const inactive = {};
    const [selected, setSelected] = useState(1);
    
  
    const handleClick = (divNum) => () => {
        setSelected(divNum);
        dispatch(sendSelectedRoute(divNum)); 
    };

    function sendSelectedRoute(routeNum) {
        return {
          type: Types.NAVIGATE_PATH,
          routeNum
        }
      }

    function logOut() {
        const { navigateTo } = location.state || { navigateTo: { pathname: "/sign-in" } };
        dispatch(userActions.logout({ token: currentUser.token }, navigate, navigateTo));
        setSelected(1);
        dispatch(sendSelectedRoute(1)); 
    }

    return (
        // <div className="sideBarWidth px-0 bg-white d-flex sticky-top">
        //     <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start text-white">

        //         <ul className="custom-nav-pills nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start" id="menu">
        //             <li className="nav-item sideMenulinks" style={selected === 1 ? active : inactive} onClick={handleClick(1)}>
                    
        //                 <button className="nav-link px-sm-0 px-2">
        //                     <i className="fs-5 bi-speedometer2"></i><span className="ms-1 d-none d-sm-inline sideLinks">Dashboard</span> </button>
        //             </li>
        //             <li className="nav-item sideMenulinks" style={selected === 2 ? active : inactive} onClick={handleClick(2)}>
                    
        //                 <button className="nav-link px-sm-0 px-2">
        //                     <i className="fs-5 bi-speedometer2"></i><span className="ms-1 d-none d-sm-inline sideLinks">Bar Chart</span> </button>
        //             </li>
        //             {/* <li className="sideMenulinks" style={selected === 3 ? active : inactive} onClick={handleClick(3)}>
               
        //                 <button className="nav-link px-sm-0 px-2">
        //                     <i className="fs-5 bi-grid"></i><span className="ms-1 d-none d-sm-inline sideLinks">About</span></button>
                          
        //             </li> */}
        //             <li className="sideMenulinks" style={selected === 4 ? active : inactive} onClick={handleClick(4)}>
        //                 {/* <Link to="/contact-us"> */}
        //                 <button className="nav-link px-sm-0 px-2">
        //                     <i className="fs-5 bi-people"></i><span className="ms-1 d-none d-sm-inline sideLinks">User Profile</span> </button>
        //                     {/* </Link> */}
        //             </li>
        //             <li className="sideMenulinks" style={selected === 5 ? active : inactive} onClick={handleClick(5)}>
        //                 {/* <Link to="/contact-us"> */}
        //                 <button className="nav-link px-sm-0 px-2">
        //                     <i className="fs-5 bi-people"></i><span className="ms-1 d-none d-sm-inline sideLinks">Contact Us</span> </button>
        //                     {/* </Link> */}
        //             </li>
        //             <li className="sideMenulinks"onClick={handleClick(1)}>
        //                 {/* <Link to="/contact-us"> */}
        //                 <button className="nav-link px-sm-0 px-2" onClick={logOut}>
        //                     <i className="fs-5 bi-people"></i><span className="ms-1 d-none d-sm-inline sideLinks">Log Out</span> </button>
        //                     {/* </Link> */}
        //             </li>
        //         </ul>
        //         {/* <div className="dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
        //             <a  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        //                 <img src="https://github.com/mdo.png" alt="hugenerd" width="28" height="28" className="rounded-circle" />
        //                 <span className="d-none d-sm-inline mx-1">Joe</span>
        //             </a>
        //             <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        //                 <li><a className="dropdown-item">Profile</a></li>
        //                 <li>
        //                     <hr className="dropdown-divider" />
        //                 </li>
        //                 <li><a className="dropdown-item"  onClick={logOut}>Sign out</a></li>
        //             </ul>
        //         </div> */}
        //     </div>
        // </div>

        <div className="custom-offcanvas offcanvas offcanvas-start w-25"  id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
    <div className="offcanvas-header">
        <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div className="offcanvas-body px-0">
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
            <li className="nav-item" style={selected === 1 ? active : inactive} onClick={handleClick(1)}>
                <a  className="nav-link text-truncate">
                    <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </a>
            </li>
            <li style={selected === 2 ? active : inactive} onClick={handleClick(2)}>
                <a href="#submenu1" data-bs-toggle="collapse" className="nav-link text-truncate">
                    <i className="fs-5 bi-speedometer2"></i><span className="ms-1 d-none d-sm-inline">Bar Chart</span> </a>
            </li>
            <li style={selected === 3 ? active : inactive} onClick={handleClick(3)}>
                <a href="#" className="nav-link text-truncate">
                    <i className="fs-5 bi-table"></i><span className="ms-1 d-none d-sm-inline">User Profile</span></a>
            </li>
            {/* <li className="dropdown">
                <a href="#" className="nav-link dropdown-toggle  text-truncate" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fs-5 bi-bootstrap"></i><span className="ms-1 d-none d-sm-inline">Bootstrap</span>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdown">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li>
                        <hr className="dropdown-divider"></hr>
                    </li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </li> */}
            <li style={selected === 4 ? active : inactive} onClick={handleClick(4)}>
                <a href="#" className="nav-link text-truncate">
                    <i className="fs-5 bi-grid"></i><span className="ms-1 d-none d-sm-inline">Contact Us</span></a>
            </li>
            <li style={selected === 5 ? active : inactive} onClick={handleClick(5)}>
                <a href="#" className="nav-link text-truncate" onClick={logOut}>
                    <i className="fs-5 bi-people"></i><span className="ms-1 d-none d-sm-inline">Log Out</span> </a>
            </li>
        </ul>
    </div>
</div>
    );
}

export default SideNavBar;