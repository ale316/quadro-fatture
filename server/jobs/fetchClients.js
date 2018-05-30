require('dotenv').config()
const Clients = require('../repositories/Clients')
const MongoClient = require('mongodb').MongoClient

module.exports = async function() {
    let url = 'mongodb://localhost:27017'
    if (process.env.MONGO_USER && process.env.MONGO_PSW)
        url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PSW}@localhost:27017/fatture`

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