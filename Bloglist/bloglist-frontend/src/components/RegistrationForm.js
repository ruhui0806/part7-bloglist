import React from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import PropTypes from 'prop-types';

const Button = styled.button`
    background: blue;
    color: white;
    border-radius: 3px;
    border: 2px solid blue;
    margin: 0 1em;
    padding: 0.25em 1em;
`;

const RegistrationForm = ({
    onSubmit,
    newName,
    handleNewNameChange,
    newUserName,
    newPassword,
    handleNewUserNameChange,
    handleNewPasswordChange,
    registerVisible,
    setRegisterVisible,
    message,
    style,
}) => {
    return (
        <div>
            <h2>Register for free</h2>
            <div style={{ display: registerVisible ? 'none' : '' }}>
                <Button
                    id="click-to-register"
                    onClick={() => setRegisterVisible(true)}
                >
                    Register
                </Button>
            </div>
            <Notification message={message} style={style} />
            <div style={{ display: registerVisible ? '' : 'none' }}>
                <form id="register-form" onSubmit={onSubmit}>
                    <div className="row g-3 align-items-center my-4">
                        <div className="col-auto">
                            <label className="col-form-label">
                                New Username
                            </label>
                        </div>

                        <div className="col-auto">
                            <input
                                id="newUserName"
                                className="form-control"
                                type="text"
                                value={newUserName}
                                name="newUserName"
                                onChange={handleNewUserNameChange}
                            />
                        </div>
                    </div>
                    <div className="row g-3 align-items-center my-4">
                        <div className="col-auto">
                            <label className="col-form-label">New Name</label>
                        </div>

                        <div className="col-auto">
                            <input
                                id="newName"
                                className="form-control"
                                type="text"
                                value={newName}
                                name="newName"
                                onChange={handleNewNameChange}
                            />
                        </div>
                    </div>

                    <div className="row g-3 align-items-center mb-4">
                        <div className="col-auto">
                            <label className="col-form-label">
                                New Password
                            </label>
                        </div>
                        <div className="col-auto">
                            <input
                                id="newPassword"
                                className="form-control"
                                type="newPassword"
                                value={newPassword}
                                name="newPassword"
                                onChange={handleNewPasswordChange}
                            />
                        </div>
                    </div>
                    <Button
                        id="register"
                        type="submit"
                        className="btn btn-secondary"
                    >
                        Register
                    </Button>
                    <Button
                        onClick={() => setRegisterVisible(false)}
                        className="btn btn-primary"
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        </div>
    );
};
RegistrationForm.propTypes = {
    newUserName: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired,
};

export default RegistrationForm;
