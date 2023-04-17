import React, { useState, useCallback } from 'react';

// components
import InputField from "../components/_common/InputField";
import Button from "../components/_common/Button";
import Logo from "../components/_common/Logo";

// third party
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// store
import { store } from "../redux/store";

// actions
import { ActionTypes } from "../actions/_types";
import { handleLogin } from '../actions/login';

const Login = ({ login, signup }) => {
    const [data, setData] = useState({
        username: signup.username || '',
        password: '',
    });
    const { loading, error } = login;

    const handleForm = (field, value) => {
        setData({
            ...data,
            [field]: value,
        });
        if (error.fields) {
            store.dispatch({
                type: ActionTypes.UPDATE_LOGIN_STATE,
                payload: {
                    error: {}
                }
            });
        }
    }

    const handleSubmit = useCallback(async () => {
        await handleLogin(data);
    }, [data]);

    const validations = error.fields || {};

    return (
        <div className="section-container login-container">
            <div className="login-block">
                <div className="stock-img">
                    <Logo showText={false} inverted={true} />
                    <img src="/stock/login2.png" alt="" />
                </div>
                <div className="form-container">
                    <div className="header">Login</div>
                    <InputField 
                        label="Username"
                        value={data.username}
                        onChange={(e) => handleForm('username', e.target.value)}
                        validationMessage={validations.username || ''}
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
                        Login
                    </Button>
                    <div className="sign-up">Don't have an account? <Link to="/signup">Sign Up</Link></div>
                </div>
            </div>
        </div>
    );
}
export default connect((store) => ({
	login: store.login,
	signup: store.signup,
}))(Login);
