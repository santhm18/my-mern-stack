import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { Routes, Route,useLocation} from "react-router-dom";
import LoginPage from "../components/LoginPage/LoginPage";
import RegisterPage from "../components/RegisterPage/RegisterPage";
import GetStarted from '../components/GetStarted/GetStarted';
import Home from '../components/Home/Home';
import Dashboard from '../components/DashBoard/DashBoard';
import ContactUs from '../components/ContactUs/ContactUs';
import BarChart from '../components/BarChart/BarChart';
import Header from '../components/Header/Header';
import  MemoriesEditForm from '../components/MemoriesEditForm/MemoriesEditForm';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import UserProfilePage from '../components/UserProfile/UserProfile';
function App() {
  const location = useLocation();
  console.log('pathname', location.pathname);
  return (
    <div className="App">
      {/* <Header/> */}
      {location.pathname !== '/' && location.pathname !== '/sign-in'  && <Header />}
      <div className="routes">
        <Routes>
            <Route exact path='/' element={<GetStarted/>} />
            <Route path="/sign-in" element={<LoginPage/>} />
            <Route path="/sign-up" element={<RegisterPage/>} />
            <Route exact path='/home' element={<Home/>} />
            <Route exact path='/dashboard' element={<Dashboard/>} />
            <Route exact path='/memory/:id/edit' element={<MemoriesEditForm/>} />
            <Route  path='/bar-chart' element={<BarChart/>} />
            <Route  path='/contact-us' element={<ContactUs/>} />
            <Route  path='/user-profile' element={<UserProfilePage/>} />
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </div>    
    </div>
  );
}
export default App;