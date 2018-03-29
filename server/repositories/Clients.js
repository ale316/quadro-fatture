const api = require('../api')

class Clients {
    async getAll() {
        let res = await api.post('clienti/lista')
        return res.data
    }
}

module.exports = new Clients()
