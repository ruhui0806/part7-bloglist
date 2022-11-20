import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
}) => {
    return (
        <form id="login-form" onSubmit={onSubmit}>
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
            <Button id="submit" type="submit">
                login
            </Button>
        </form>
    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}
export default LoginForm
