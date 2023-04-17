import React from 'react';

const InputField = ({
    label,
    value,
    classes='',
    validationMessage='',
    inputRef,
    customStyles={},
    ...rest
}) => {
    return (
        <div className={"input-field-container " + (classes)} style={customStyles}>
            <div className="meta-info">{label}</div>
            <input
				autoComplete="off"
				className="at-input"
                value={value}
                ref={inputRef}
                {...rest}
			/>
            <div className="validation-message">{validationMessage}</div>
        </div>
    );
}
export default InputField;
