const moment = require('moment')

module.exports = function(invoice) {
    return {
        _id: invoice.id,
        token: invoice.token,
        client_id: invoice.id_cliente,
        client_name: invoice.nome,
        date: moment(invoice.data, 'DD/MM/YYYY').toISOString(),
        amount_net: parseFloat(invoice.importo_netto),
        amount_total: parseFloat(invoice.importo_totale),
        type: invoice.tipo,
        paid: invoice.tipo === "fatture", // if it's "fatture" it's been paid
        link_doc: invoice.link_doc,
        items: invoice.lista_articoli && invoice.lista_articoli.length > 0 ? invoice.lista_articoli.map(a => {
            let description = a.descrizione
            if (description.toLowerCase().indexOf('buste paga') > -1) {
                description = description.split(':').pop().trim()
                description = `Buste paga: ${description}`
            }
            return { code: a.codice, description: description }
        }) : []
    }
}