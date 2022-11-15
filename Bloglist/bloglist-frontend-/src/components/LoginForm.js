import React from "react"
import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit, username, password, handleUsernameChange,
    handlePasswordChange }) => {

    return (
        <form id='login-form' onSubmit={onSubmit}>
            <div>
                username
                <input
                    id="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                password
                <input
                    id="password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={handlePasswordChange}
                />
            </div>
            <button id="submit" type="submit">login</button>
        </form>
    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}
export default LoginForm

