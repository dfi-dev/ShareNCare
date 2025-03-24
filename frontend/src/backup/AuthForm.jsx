import React, { useState } from "react";
import "../styles/AuthForm.css";
import {
    FaAt,
    FaUser,
    FaEnvelope,
    FaLock,
    FaPhone,
    FaMapMarkerAlt,
    FaVenusMars,
    FaTint,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LoginSignup = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [signupStep, setSignupStep] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [passwords, setPasswords] = useState({
        loginPassword: "",
        signupPassword: "",
    });
    const [showPasswords, setShowPasswords] = useState({ login: false, signup: false });
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        dob: "",
        gender: "",
        address: "",
        bloodGroup: "",
    });

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setSignupStep(signupStep + 1);
            setIsAnimating(false);
        }, 500);
    };

    const handleBack = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setSignupStep(signupStep - 1);
            setIsAnimating(false);
        }, 500);
    };

    return (
        <div className="form">
            <div className="text-center">
                <input
                    type="checkbox"
                    className="checkbox"
                    id="reg-log"
                    checked={isChecked}
                    onChange={() => {
                        setIsChecked(!isChecked);
                        setSignupStep(1);
                    }}
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap">
                    <div className={`card-3d-wrapper ${isChecked ? "flipped" : ""}`}>
                        <div className="card-front">
                            <div className="center-wrap">
                                <h4 className="heading">Log In</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group py-1">
                                        <input
                                            type="email"
                                            className="form-style"
                                            required
                                            name="email"
                                            placeholder="Username | Email | Phone"
                                            autoComplete="off"
                                            onChange={handleChange}
                                        />
                                        <FaAt className="input-icon text-red-600" />
                                    </div>
                                    <div className="form-group py-1">
                                        <input
                                            type={showPasswords.login ? "text" : "password"}
                                            className="form-style"
                                            name="loginPassword"
                                            placeholder="Your Password"
                                            autoComplete="off"
                                            value={passwords.loginPassword}
                                            onChange={handlePasswordChange}
                                        />
                                        <span
                                            className="input-icon"
                                            onClick={passwords.loginPassword.length > 0 ? () => togglePasswordVisibility("login") : null}
                                        >
                      {passwords.loginPassword.length > 0 ? (
                          showPasswords.login ? <FaEyeSlash /> : <FaEye />
                      ) : (
                          <FaLock />
                      )}
                    </span>
                                    </div>
                                    <button type="submit" className="btn">Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="card-back">
                            <div className="center-wrap">
                                <h4 className="heading">Sign Up</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group py-1">
                                        <input type="text" className="form-style" name="fullName" placeholder="Full Name" onChange={handleChange} autoComplete="off" />
                                        <FaUser className="input-icon" />
                                    </div>
                                    <div className="form-group py-1">
                                        <input type="text" className="form-style" name="username" placeholder="Username" onChange={handleChange} autoComplete="off" />
                                        <FaAt className="input-icon" />
                                    </div>
                                    <div className="form-group py-1">
                                        <input type="email" className="form-style" name="email" placeholder="Email" onChange={handleChange} autoComplete="off" />
                                        <FaEnvelope className="input-icon" />
                                    </div>
                                    <div className="form-group py-1">
                                        <input type="tel" className="form-style" name="phone" placeholder="Phone Number" onChange={handleChange} autoComplete="off" />
                                        <FaPhone className="input-icon" />
                                    </div>
                                    <div className="form-group py-1">
                                        <input type="text" className="form-style" name="address" placeholder="Address" onChange={handleChange} autoComplete="off" />
                                        <FaMapMarkerAlt className="input-icon" />
                                    </div>
                                    <div className="form-group py-1">
                                        <select className="form-style" name="gender" onChange={handleChange}>
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <FaVenusMars className="input-icon" />
                                    </div>
                                    <button type="submit" className="btn">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;