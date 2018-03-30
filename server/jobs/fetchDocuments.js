const Documents = require('../repositories/Documents')
const MongoClient = require('mongodb').MongoClient

module.exports = async function() {
    const url = 'mongodb://localhost:27017'
    let client = await MongoClient.connect(url)
    let db = client.db('fatture')

    let years = [2016, 2017, 2018]
    let paid = []
    let unpaid = []
    for (var i = 0; i < years.length; i++) {
        let year = years[i]
        let currPaid = await Documents.getAll('fatture', year)
        paid = paid.concat(currPaid)
        let currUnpaid = await Documents.getAll('proforma', year)
        unpaid = unpaid.concat(currUnpaid)
    }

    unpaid = await Documents.getDetails(unpaid)

    // clients = clients.lista_clienti.map(c => {
    //     return {
    //         _id: c.id,
    //         name: c.nome
    //     }
    // })

    // await db.collection('clients').insertMany(clients)
}