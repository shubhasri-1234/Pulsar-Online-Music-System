import React, { useState, useCallback } from 'react';

// components
import InputField from "../components/_common/InputField";
import Button from "../components/_common/Button";
import Logo from "../components/_common/Logo";

// third party
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// store
import { store } from "../redux/store";

// actions
import { ActionTypes } from "../actions/_types";
import { handleSignup } from "../actions/signup";

const Signup = ({ signup }) => {
    const [data, setData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
    });
    const { loading, error } = signup;

    const handleForm = (field, value) => {
        setData({
            ...data,
            [field]: value,
        });
        if (error.fields) {
            store.dispatch({
                type: ActionTypes.UPDATE_SIGNUP_STATE,
                payload: {
                    error: {}
                }
            });
        }
    }

    const handleSubmit = useCallback(async () => {
        await handleSignup(data);
    }, [data]);

    const validations = error.fields || {};

    return (
        <div className="section-container signup-container">
            <div className="signup-block">
                <div className="form-container">
                    <div className="header">Sign Up</div>
                    <InputField 
                        label="Full Name"
                        value={data.fullname}
                        onChange={(e) => handleForm('fullname', e.target.value)}
                        validationMessage={validations.fullname || ''}
                    />
                    <InputField 
                        label="Username"
                        value={data.username}
                        onChange={(e) => handleForm('username', e.target.value)}
                        validationMessage={validations.username || ''}
                    />
                    <InputField 
                        label="Email"
                        value={data.email}
                        onChange={(e) => handleForm('email', e.target.value)}
                        validationMessage={validations.email || ''}
                    />
                    <InputField 
                        label="Password"
                        type="password"
                        value={data.password}
                        onChange={(e) => handleForm('password', e.target.value)}
                        validationMessage={validations.password || ''}
                    />
                    <Button
                        handleOnClick={handleSubmit}
                        loading={loading}
                    >
                        Sign Up
                    </Button>
                    <div className="sign-up">Already have an account? <Link to="/login">Login</Link></div>
                </div>
                <div className="stock-img">
                    <Logo showText={false} inverted={true} />
                    <img src="/stock/signup2.png" alt="" />
                </div>
            </div>
        </div>
    );
}
export default connect((store) => ({
	signup: store.signup,
}))(Signup);
