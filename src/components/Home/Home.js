import React from "react";
import Dashboard from '../DashBoard/DashBoard';
import ContactUs from '../ContactUs/ContactUs';
import About from '../About/About';
import { useSelector } from 'react-redux';
import SideNavBar from '../SideNavBar/SideNavBar';
import "./Home.css";
function Home() {
    const showHideRoute = useSelector(state => state.navigatationpath);
    console.log(showHideRoute.selectedRoute);
    return (
        <div className="homePage">
        <div className="container-fluid overflow-hidden ">
            <div className="row fullHeight overflow-hidden">
                <SideNavBar />
                <div className="col d-flex flex-column h-sm-100">
                    <main className="row overflow-auto right-content">
                        <div className="row">
                            <div className="col">
                                {((typeof showHideRoute.selectedRoute === 'undefined') || (showHideRoute.selectedRoute === 1)) &&  <Dashboard/>}
                                {showHideRoute.selectedRoute === 2 &&   <About/>}
                                {showHideRoute.selectedRoute === 4 &&   <ContactUs/>}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Home;