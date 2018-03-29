require('dotenv').config()
const axios = require('axios')

module.exports = axios.create({
    baseURL: 'https://api.fattureincloud.it/v1',
    transformRequest: [function (data, headers) {
        if (!data) data = {}
        data["api_uid"] = process.env.API_UID
        data["api_key"] = process.env.API_KEY
        return JSON.stringify(data)
    }]
})