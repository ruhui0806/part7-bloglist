import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Notification from './Notification'
const Button = styled.button`
    background: palevioletred;
    color: white;
    border-radius: 3px;
    border: 2px solid palevioletred;
    margin: 0 1em;
    padding: 0.25em 1em;
`
const LoginForm = ({
    onSubmit,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    loginVisible,
    setLoginVisible,
    message,
    style,
}) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <div style={{ display: loginVisible ? 'none' : '' }}>
                <Button
                    id="click-to-login"
                    onClick={() => setLoginVisible(true)}
                >
                    Click to login
                </Button>
            </div>
            <Notification message={message} style={style} />
            <div style={{ display: loginVisible ? '' : 'none' }}>
                <form id="login-form" onSubmit={onSubmit}>
                    <div className="row g-3 align-items-center my-4">
                        <div className="col-auto">
                            <label className="col-form-label">Username</label>
                        </div>

                        <div className="col-auto">
                            <input
                                id="username"
                                className="form-control"
                                type="text"
                                value={username}
                                name="Username"
                                onChange={handleUsernameChange}
                            />
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mb-4">
                        <div className="col-auto">
                            <label className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                            <input
                                id="password"
                                className="form-control"
                                type="password"
                                value={password}
                                name="Password"
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>
                    <Button
                        id="submit"
                        type="submit"
                        className="btn btn-secondary"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={() => setLoginVisible(false)}
                        className="btn btn-primary"
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        </div>
    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}
export default LoginForm
