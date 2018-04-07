const Documents = require('../repositories/Documents')
const MongoClient = require('mongodb').MongoClient
const format = require('../utils/formatDocument')

module.exports = async function() {
    try {
        const url = 'mongodb://localhost:27017'
        let client = await MongoClient.connect(url)
        let db = client.db('fatture')

        let years = [2016, 2017, 2018]
        let paid = []
        let unpaid = []
        for (var i = 0; i < years.length; i++) {
            let year = years[i]
            console.log(`Fetching paid invoices for ${year}...`)
            let currPaid = await Documents.getAll('fatture', year)
            paid = paid.concat(currPaid)
            console.log(`Fetching unpaid invoices for ${year}...`)
            let currUnpaid = await Documents.getAll('proforma', year)
            unpaid = unpaid.concat(currUnpaid)
        }

        console.log("Fetching details of unpaid invoices...")
        unpaid = await Documents.getDetails(unpaid)

        let all = paid.concat(unpaid).map(i => format(i))
        await db.collection('invoices').update(all, { upsert: true, multi: true })
    } catch (e) {
        console.log(e)
    }
}