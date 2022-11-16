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
