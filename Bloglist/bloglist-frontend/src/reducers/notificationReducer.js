export const setMessage = (data) => {
    return { type: 'SET_MESSAGE', payload: data }
}

export const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.payload
        default:
            return state
    }
}
