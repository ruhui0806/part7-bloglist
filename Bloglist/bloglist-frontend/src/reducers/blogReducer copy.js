// export const setBlogs = (data) => {
//     return { type: 'SET_BLOGS', payload: data }
// }

// export const appendBlog = (data) => {
//     return { type: 'ADD_BLOG', payload: data }
// }

// export const updateLikeBlogs = (data) => {
//     return { type: 'ADD_BLOG', payload: data }
// }

// const blogReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_BLOGS':
//             return action.payload
//         case 'ADD_BLOG':
//             return state.concat(action.payload)
//         case 'ADD_LIKE': {
//             const id = action.payload
//             const toLikeBlog = state.find((n) => n.id === id)
//             const changedBlog = { ...toLikeBlog, likes: toLikeBlog.likes + 1 }
//             return state.map((n) => (n.id !== changedBlog.id ? n : changedBlog))
//         }
//         default:
//             return state
//     }
// }
// export default blogReducer

////
import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
    name: 'blogReducer',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
    },
})

export const { setBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer

import blogService from '../services/blogs'
export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}
