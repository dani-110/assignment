import axios from '../../config'

const getData = async (url) => {
    return await axios.get(url)
}

const postData = async (url, data, token) => {
    console.log(url, data, token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    return await axios.post(url, data)
        .then((response) => {
            return response
        }).catch((e) => {
            return e.response
        })
}

const putData = async (url, data) => {
    await axios.put(url, { data })
        .then((response) => {
            return response
        }, (error) => {
            return error
        })
}

export default {
    _getApi: getData,
    _postApi: postData,
    _putApi: putData
}