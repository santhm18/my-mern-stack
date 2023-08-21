import React from "react";
import Dashboard from '../DashBoard/DashBoard';
import ContactUs from '../ContactUs/ContactUs';
import About from '../About/About';
import BarChart from '../BarChart/BarChart';
import { useSelector } from 'react-redux';
import SideNavBar from '../SideNavBar/SideNavBar';
import "./Home.css";
import UserProfilePage from "../UserProfile/UserProfile";
function Home() {
    const showHideRoute = useSelector(state => state.navigatationpath);
    // console.log(showHideRoute.selectedRoute);
    return (
        <div className="homePage">
            <div className="container-fluid overflow-hidden ">
                <div className="row fullHeight overflow-hidden">
                    <SideNavBar />

                    <div className="container-fluid">
                        <div className="row">
                        <div className="col">
                        {/* <Dashboard/> */}
                                {/* {showHideRoute.selectedRoute !== 2 &&   <Dashboard/>} */}
                                {(typeof showHideRoute.selectedRoute === 'undefined' || (showHideRoute.selectedRoute !== 2 && showHideRoute.selectedRoute !== 3 && showHideRoute.selectedRoute !== 4)) &&  <Dashboard/>}
                                {showHideRoute.selectedRoute === 2 &&   <BarChart/>}
                                {showHideRoute.selectedRoute === 3 &&   <UserProfilePage/>}
                                {showHideRoute.selectedRoute === 4 && <ContactUs />}
                            </div>
                            {/* <div className="col min-vh-100 p-4">
                            {(showHideRoute.selectedRoute === 1 || showHideRoute === 1) && <Dashboard />}
                                {/* {((typeof showHideRoute.selectedRoute === 'undefined') || (showHideRoute.selectedRoute === 1)) && <Dashboard />} 
                                {showHideRoute.selectedRoute === 2 && <BarChart />}
                                {showHideRoute.selectedRoute === 3 && <UserProfilePage />}
                                {showHideRoute.selectedRoute === 4 && <ContactUs />}
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;