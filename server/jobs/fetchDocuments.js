const Documents = require('../repositories/Documents')
const MongoClient = require('mongodb').MongoClient

let format = function(invoice) {
    return {
        _id: invoice.id,
        token: invoice.token,
        client_id: invoice.id_cliente,
        date: new Date(invoice.data),
        amount_net: parseFloat(invoice.importo_netto),
        amount_total: parseFloat(invoice.importo_totale),
        type: invoice.tipo,
        paid: invoice.tipo === "fatture", // if it's "fatture" it's been paid
        link_doc: invoice.link_doc,
        items: invoice.lista_articoli ? invoice.lista_articoli.map(a => { return { _id: a.id, description: a.descrizione } }) : []
    }
}

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
    console.log(unpaid)

    let all = paid.concat(unpaid).map(i => format(i))

    // await db.collection('invoices').update(all, { upsert: true, multi: true })
}()