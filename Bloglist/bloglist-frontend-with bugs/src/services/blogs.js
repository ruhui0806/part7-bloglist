import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
    config = {
        headers: { Authorization: token },
    }
}

const getAll = () => {
    const request = axios.get(baseUrl, config)
    return request.then((response) => response.data)
}

const createNew = async (newObject) => {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (newObject) => {
    const response = await axios.put(
        `${baseUrl}/${newObject.id}`,
        newObject,
        config
    )
    return response.data
}

const findOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { getAll, createNew, setToken, update, remove, findOne }
