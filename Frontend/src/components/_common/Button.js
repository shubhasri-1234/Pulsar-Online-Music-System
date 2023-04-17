import React from 'react';

const Button = ({
    children,
    handleOnClick,
    loading=false,
    disabled=false,
    type='',
    classes='',
    customStyles={},
}) => {
    return (
        <div 
            className={"button-container " + (loading ? 'loading ' : '') + (disabled ? 'disabled ' : '') + (classes ? `${classes} ` : "") + (type)} 
            onClick={handleOnClick}
            style={customStyles}
        >
            {children}
        </div>
    );
}
export default Button;
