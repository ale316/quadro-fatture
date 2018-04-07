const Documents = require('../repositories/Documents')
const MongoClient = require('mongodb').MongoClient
const format = require('../utils/formatDocument')

module.exports = async function() {
    try {
        const url = 'mongodb://localhost:27017'
        const client = await MongoClient.connect(url)
        const db = client.db('fatture')

        let today = new Date()
        today.setDate(today.getDate() - 1)

        const newUnpaid = await Documents.getAll('proforma', today.getFullYear(), `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`) || []
        const currUnpaid = await db.collection('invoices').find({ paid: false }).toArray() || []

        let allUnpaid = await Documents.getDetails(currUnpaid.concat(newUnpaid))
        allUnpaid = allUnpaid.map(i => format(i))

        await db.collection('invoices').update(allUnpaid, { upsert: true, multi: true })
    } catch (e) {
        console.log(e)
    }
}