import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api'

function fetch(model, query) {
    return new Promise((resolve, reject) => {
        const url = `/${model}`
        axios.get(url, { params: query }).then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export {
    axios,
    fetch
}