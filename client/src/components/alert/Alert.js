import React from 'react';

const Alert = (props) => {
    const {message, status} = props;
    let alertType = status ? 'alert-success' : 'alert-danger'
    return (
        <div className={`alert ${alertType} alert-dismissible fade show my-2`} role="alert">
            <strong>{message}</strong>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};

export default Alert;