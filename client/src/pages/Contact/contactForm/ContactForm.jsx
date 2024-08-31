import React, { useState } from 'react'
import './style.css';
import { message } from 'antd';
import { fetchData } from '../../../lib/fetchData';

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "",
        contact: "",
        message: "",
        email: ""
    });

    const handleMessageSubmit = async(e) => {
        e.preventDefault();
        if (loading) {
            message.open({
                type: "warning",
                content: "Please wait while we sending you message!!"
            })
        } else {
            if (userInfo?.name && userInfo?.contact && userInfo?.message && userInfo?.email) {

                const res = await fetchData(`/enquiry`, setLoading, "POST", userInfo);
                if (res?.success) {
                    message.success("Thanks for your message we'll contact you back soon.")
                } else {
                    message.success(res.message)
                }
                setUserInfo({
                    name: "",
                    contact: "",
                    message: "",
                    email: ""
                })
            } else {
                message.warning("Please fill all the fields");
            }
        }
    }

    const handleInput = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
    return (
        <div id="contact-us-form" className='flex-box justify-center align-center'>
            <div className="contact-us-form">
                <div className="contact-form flex-box justify-center flex-column">
                    <p>LEAVE A MESSAGE</p>
                    <h2>We love to hear from you</h2>
                    <form action="#" className="flex-box justify-center flex-column">
                        <input onChange={handleInput} type="text" name="name" value={userInfo?.name} className="contact-form-input-box" placeholder='Your Name' />
                        <input onChange={handleInput} type="email" name="email" value={userInfo?.email} className="contact-form-input-box" placeholder='E-mail' />
                        <input onChange={handleInput} type="number" name="contact" value={userInfo?.contact} className="contact-form-input-box" placeholder='Contact Number' />
                        <textarea onChange={handleInput} id="user-message" name="message" value={userInfo?.message} className="contact-form-input-box" placeholder='Message'></textarea>
                        <input onClick={handleMessageSubmit} class={`btn ${loading ? 'loading' : ''} bg-[--primary-color] text-[--secondary-color]`} type="submit" value={loading ? "Sending you message..." : "Submit"} id="message-submission" />
                    </form>
                </div>
            </div>
        </div>
    )
}