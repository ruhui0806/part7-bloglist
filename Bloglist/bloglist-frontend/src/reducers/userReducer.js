import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
    name: 'users',
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
export const { setUser, logOut } = userSlice.actions

export const loginUser = ({ username, password }) => {
    return async (dispatch) => {
        const user = await loginService.login({
            username,
            password,
        })
        dispatch(setUser(user))
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
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
export default userSlice.reducer
