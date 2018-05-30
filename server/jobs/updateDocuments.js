require('dotenv').config()
const Documents = require('../repositories/Documents')
const MongoClient = require('mongodb').MongoClient
const format = require('../utils/formatDocument')

module.exports = async function() {
    try {
        let url = 'mongodb://localhost:27017'
        if (process.env.MONGO_USER && process.env.MONGO_PSW)
            url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PSW}@localhost:27017/fatture`

        const client = await MongoClient.connect(url)
        const db = client.db('fatture')

        let today = new Date()
        today.setDate(today.getDate() - 1)

        console.log("Fetching new unpaid invoices...")
        const newUnpaid = await Documents.getAll('proforma', today.getFullYear(), `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`) || []
        console.log(`   > found ${newUnpaid.length}`)

        console.log("Fetching new paid invoices...")
        const newPaid = await Documents.getAll('fatture', today.getFullYear(), `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`) || []
        console.log(`   > found ${newPaid.length}`)

        console.log("Fetching old unpaid invoices...")
        let currUnpaid = await db.collection('invoices').find({ paid: false }).toArray() || []
        console.log(`   > found ${currUnpaid.length}`)

        // format them correctly
        console.log("Fetching details for unpaid invoices...")
        currUnpaid = currUnpaid.map(u => { return { tipo: u.type, id: u._id, token: u.token } })
        let allUnpaid = await Documents.getDetails(currUnpaid.concat(newUnpaid))
        console.log(`   > found ${allUnpaid.length}`)

        let all = allUnpaid.concat(newPaid).map(i => format(i))

        all.forEach(async i => {
            await db.collection('invoices').update({ _id: i._id }, { '$set': i }, { upsert: true })
        })

        console.log("Done!")
    } catch (e) {
        console.log(e)
    }
}()