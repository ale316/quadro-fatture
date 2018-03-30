const api = require('../api')

class Documents {
    async getAll(type, year) {
        let allowed = ["fatture", "ricevute", "preventivi", "ordini", "ndc", "proforma", "rapporti", "ordforn", "ddt"]
        if (allowed.indexOf(type) < 0)
            throw `Type <${type}> not available.`

        let documents = []
        let isDone = false
        while (!isDone) {
            let res = await api.post(`/${type}/lista`, { anno: year })
            if (res.data.numero_pagine === res.data.pagina_corrente) isDone = true
            documents = documents.concat(res.data.lista_documenti)
        }

        return documents
    }

    async getDetails(documents) {
        let details = []
        for (let i = documents.length - 1; i >= 0; i--) {
            let doc = documents[i]
            let res = await api.post(`/${type}/dettagli`, { id: doc.id, token: doc.token })
            details.push(res.data.dettagli_documento)
        }
    }
}

module.exports = new Documents()