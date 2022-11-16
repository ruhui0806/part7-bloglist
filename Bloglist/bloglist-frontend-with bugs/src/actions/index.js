export const setBlogs = (data) => {
    return { type: 'SET_BLOGS', payload: data }
}

export const appendBlog = (data) => {
    return { type: 'ADD_BLOG', payload: data }
}

//this file is not yet in use. The action creators are defined in its reducer's file respectively
