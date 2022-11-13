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

// //
// import { createSlice } from '@reduxjs/toolkit'

// const blogSlice = createSlice({
//     name: 'blogReducer',
//     initialState: [],
//     reducers: {
//         setBlogs(state, action) {
//             return action.payload
//         },
//         appendBlog(state, action) {
//             state.push(action.payload)
//         },

//     },
// })

// export const { setBlogs, appendBlog } = blogSlice.actions
// export default blogSlice.reducer

// import blogService from '../services/blogs'
// export const initializeBlogs = () => {
//     return async (dispatch) => {
//         const blogs = await blogService.getAll()
//         dispatch(setBlogs(blogs))
//     }
// }
///////////

import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        addLike(state, action) {
            const changedBlog = action.payload
            return state.map((n) => (n.id !== changedBlog.id ? n : changedBlog))
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        deleteBlog(state, action) {
            const id = action.payload
            return state.filter((n) => n.id !== id)
        },
    },
})

export const { addLike, appendBlog, setBlogs, deleteBlog } = blogSlice.actions

// With Redux Thunk it is possible to implement action creators,
// which return a function instead of an object.
// The function receives Redux store's dispatch and getState methods as parameters.
export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const addNew = (blogObject) => {
    return async (dispatch) => {
        const newBlog = await blogService.createNew(blogObject)
        dispatch(appendBlog(newBlog))
    }
}

export const moreLike = (id) => {
    return async (dispatch) => {
        const blogToLike = await blogService.findOne(id)
        const updatedObj = { ...blogToLike, likes: blogToLike.likes + 1 }
        await blogService.update(updatedObj)
        dispatch(addLike(updatedObj))
    }
}

export const removeBlog = (id) => {
    return async (dispatch) => {
        const updateBlogs = await blogService.remove(id)
        console.log('updateBlogs: ', updateBlogs)
        dispatch(deleteBlog(id))
    }
}

export default blogSlice.reducer
