import React from 'react';

// third party
import { connect } from "react-redux";

// actions
import { changeTheme } from "../../actions/actions";

const Logo = ({ theme, showText=true, inverted=false }) => {
    return (
        <div className="logo-container" onClick={changeTheme}>
            <img className="logo" src={`/icons/pulsar-logo-${inverted ? 'inverted' : theme.color}.png`} alt="" />
            {
                showText &&
                <div className="title">PULSAR</div>
            }
        </div>
    )
}
export default connect((store) => ({
	theme: store.theme,
}))(Logo);
