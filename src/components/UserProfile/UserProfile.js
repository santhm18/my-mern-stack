import React, { useState , useEffect } from "react";
import { userActions } from '../../_actions/profile';
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { useLocation, useNavigate} from 'react-router-dom';
import Spinner from "../Spinner/Spinner";
import  "../UserProfile/UserProfilePage.scss";
function UserProfilePage() {
    const [userprofile, setUserProfile] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber : '',
        confirmPassword : ''
    });
    const [isloading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user : currentUser } = useSelector((state) => state.authentication);
    console.log(currentUser['user']);
    const userUpdate = useSelector(state => state.userUpdate);
    console.log(userUpdate);
    const {loading, success, error} = userUpdate;

    useEffect(() => {
        if(!currentUser) {
            this.props.history.push("/");
        } else {
            setUserProfile(currentUser['user']);
        }
    },[currentUser])

    function handleChange(e) {
        const { name, value } = e.target;
        setUserProfile(userprofile => ({ ...userprofile, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // setSubmitted(true);
       
        if (userprofile.password === userprofile.confirmPassword) {
            setSubmitted(false);
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.updateProfile(userprofile, navigate, from,setIsLoading));
           
        } else {
            alert('Confirm password please enter');
            setIsLoading(false);
        }
    }
    
    return (
        
        <div className="userProfile-container">
            {isloading  ? (<Spinner/>) : (<div className="container">
          <div className="sendUsMessageContainer">
              <h1 className="margin0 SendMessageTitle mt-3 text-center">Edit Profile</h1>
              <form name="form" autoComplete="off" onSubmit={handleSubmit}>
                 {loading && success &&  <Alert variant="success">Updated sucessfully</Alert>  }
                  <div className="form-group  customFormGroup mt-3">
                      <input type="text" className="form-control" placeholder="Your Name" name="firstname" value={userprofile.firstname} onChange={handleChange} />
                  </div>
                  <div className="form-group  customFormGroup mt-3">
                      <input type="text" className="form-control" placeholder="Your Name" name="lastname" value={userprofile.lastname} onChange={handleChange} />
                  </div>
                  <div className="form-group customFormGroup mt-3">
                      <input type="email" className="form-control" placeholder="Your Email" name="email" value={userprofile.email} onChange={handleChange} />
                  </div>
                  <div className="form-group  customFormGroup mt-3">
                      <input type="text" className="form-control" placeholder="Phone Number" name="phoneNumber" value={userprofile.phoneNumber} onChange={handleChange} />
                  </div>
                  <div className="form-group customFormGroup mt-3">
                      <input type="password" className="form-control" placeholder="Your Password" name="password" value={userprofile.password} onChange={handleChange} />
                  </div>
                  <div className="form-group customFormGroup mt-3">
                      <input type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" value={userprofile.confirmPassword} onChange={handleChange} />
                  </div>
                 
                  <div className="updateBtnBox">
                      <button className="btn btn-outline-primary sendMsgBtn mt-3">
                          Update Profile</button>
                  </div>
              </form>
          </div>
      </div>)}
            
        </div>

    );
}
export default UserProfilePage;