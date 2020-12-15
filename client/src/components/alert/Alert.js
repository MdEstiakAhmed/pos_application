import React from 'react';

const Alert = (props) => {
    const {message, status} = props;
    let alertType = status ? 'alert-success' : 'alert-danger'
    return (
        <div className={`alert ${alertType} my-2`} role="alert">
            {message}
        </div>
    );
};

export default Alert;