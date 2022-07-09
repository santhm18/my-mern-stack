import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendContactDetails } from '../../_actions/memoriespost';
import "./ContactUs.css";
function ContactUs() {
    const dispatch = useDispatch();
    const [contactdetails, setContactDetails] = useState({
        email: '',
        username: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setContactDetails(contactdetails => ({ ...contactdetails, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (contactdetails.email && contactdetails.username) {
            setSubmitted(false);
            dispatch(sendContactDetails(contactdetails));
            resetForm();
        }
    }

    function resetForm() {
        setContactDetails({ email: '', username: '', subject: '', message: '' })
    }

    return (
        <div className="contactUs">
            <div className="container">
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
            </div>
        </div>
    );
}

export default ContactUs;