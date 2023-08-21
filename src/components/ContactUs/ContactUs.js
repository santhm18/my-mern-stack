import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendContactDetails } from '../../_actions/memoriespost';
import Spinner from "../Spinner/Spinner";
import "./ContactUs.css";
import Alert from 'react-bootstrap/Alert';
function ContactUs() {
    const dispatch = useDispatch();
    const [contactdetails, setContactDetails] = useState({
        email: '',
        username: '',
        subject: '',
        message: ''
    });
    const [show, setShow] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    function handleChange(e) {
        const { name, value } = e.target;
        setContactDetails(contactdetails => ({ ...contactdetails, [name]: value }));
    }


    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        if (contactdetails.email && contactdetails.username) {
            setSubmitted(true);
            dispatch(sendContactDetails(contactdetails,setIsLoading,setShow));
            // resetForm();
        } else {
            setIsLoading(false);
        }
    }

    function resetForm() {
        setContactDetails({ email: '', username: '', subject: '', message: '' })
    }

    if (show) {
        return (
        <div className="alert-notification">
              <Alert variant="success" onClose={() => setShow(false)} dismissible>
         <Alert.Heading>Thank you for getting in touch! </Alert.Heading>
                <p style={{
                fontSize: "14px",
                fontFamily :  "IBM Plex Sans"
                }}>
                We appreciate you contacting us. One of our colleagues will get back in touch with you soon!Have a great day!
                </p>
          </Alert>
        </div>
        );
      }

    return (
        <div className="contactUs">

  {isloading  ? (<Spinner/>) : ( <div className="container">
                <div className="sendUsMessageContainer">
                    <h1 className="margin0 SendMessageTitle mt-3 text-center">Send Us a Message </h1>
                    <form name="form" autoComplete="off" onSubmit={handleSubmit}>
                        <div className="form-group customFormGroup mt-3">
                            <input type="email" className={`form-control` + (submitted && !contactdetails.email ? ' is-invalid' : '')} placeholder="Your Email" name="email" value={contactdetails.email} onChange={handleChange} />
                            {submitted && !contactdetails.email && <div className="invalid-feedback">Email address is required</div>}
                        </div>
                        <div className="form-group  customFormGroup mt-3">
                            <input type="text" className={`form-control` + (submitted && !contactdetails.username ? ' is-invalid' : '')} placeholder="Your Name" name="username" value={contactdetails.username} onChange={handleChange} />
                            {submitted && !contactdetails.username && <div className="invalid-feedback">Username is required</div>}
                        </div>
                        <div className="form-group customFormGroup mt-3">
                            <input type="text" className="form-control" placeholder="Subject" name="subject" value={contactdetails.subject} onChange={handleChange} />
                        </div>
                        <div className="form-group customFormGroup mt-3">
                            <textarea className="form-control" rows="5" name="message" onChange={handleChange} value={contactdetails.message} placeholder="Message"></textarea>
                        </div>
                        <div className="sendMsgBtnBox">
                            <button className="btn btn-outline-primary sendMsgBtn mt-3">
                                SEND MESSAGE</button>
                        </div>
                    </form>
                </div>
            </div>)}
        </div>
    );
}

export default ContactUs;