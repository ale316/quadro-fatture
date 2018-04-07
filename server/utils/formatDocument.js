module.exports = function(invoice) {
    return {
        _id: invoice.id,
        token: invoice.token,
        client_id: invoice.id_cliente,
        client_name: invoice.nome,
        date: new Date(invoice.data),
        amount_net: parseFloat(invoice.importo_netto),
        amount_total: parseFloat(invoice.importo_totale),
        type: invoice.tipo,
        paid: invoice.tipo === "fatture", // if it's "fatture" it's been paid
        link_doc: invoice.link_doc,
        items: invoice.lista_articoli && invoice.lista_articoli.length > 0 ? invoice.lista_articoli.map(a => {
            return { _id: a.id, code: a.codice, description: a.descrizione }
        }) : []
    }
}