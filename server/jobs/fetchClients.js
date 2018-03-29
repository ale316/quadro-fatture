const Clients = require('../repositories/Clients')
const MongoClient = require('mongodb').MongoClient

module.exports = async function() {
    const url = 'mongodb://localhost:27017'
    let client = await MongoClient.connect(url)
    let db = client.db('fatture')

    let clients = await Clients.getAll()
    clients = clients.lista_clienti.map(c => {
        return {
            _id: c.id,
            name: c.nome
        }
    })

    await db.collection('clients').insertMany(clients)
}