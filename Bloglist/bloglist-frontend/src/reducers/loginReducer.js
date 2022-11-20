import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        logOut(state, action) {
            return null
        },
    },
})
export const { setUser, logOut } = loginSlice.actions

export const loginUser = (credentials) => {
    return async (dispatch) => {
        const user = await loginService.login(credentials)
        if (user) {
            dispatch(setUser(user))
            blogService.setToken(user.token)
            console.log('bleep bloop 1')
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            console.log('bleep bloop 2')
        }
    }
}

export const loggedUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            console.log('loggedUserJSON: ', loggedUserJSON)
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }
}
export default loginSlice.reducer
