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
            <h2>log in to application</h2>
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
                    <div>
                        Username
                        <input
                            id="username"
                            type="text"
                            value={username}
                            name="Username"
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div>
                        Password
                        <input
                            id="password"
                            type="password"
                            value={password}
                            name="Password"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <Button
                        id="submit"
                        type="submit"
                        className="btn btn-primary"
                    >
                        Login
                    </Button>
                </form>
                <Button onClick={() => setLoginVisible(false)}>Cancel</Button>
            </div>
        </div>
    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}
export default LoginForm
