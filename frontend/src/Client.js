import './styles/Client.css'
import 'react-table/react-table.css'

import axios from 'axios'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import React, { Component } from 'react'
import { sortBy } from 'lodash'

import Page from './Page'

class Client extends Component {
    constructor() {
        super()

        this.state = {
            data: [],
            client: {}
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:3300/invoices/${this.props.match.params.client_id}`)
        .then(res => {
            console.log(res.data)
            let client
            let sorted = sortBy(res.data, i => i.paid)
            if (sorted && sorted.length > 0) {
                client = { client_name: sorted[0].client_name }

                this.setState({
                    data: sorted,
                    client
                })
            }


        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <Page
                className="Client"
                title={`Quadro fatture per ${this.state.client.client_name}`}
            >
                <ReactTable
                    data={this.state.data}
                    noDataText="Nessun Risultato"
                    showPagination={false}
                    columns={[
                        {
                            Header: "Data",
                            id: "data",
                            accessor: s => (new Date(s.date)).toLocaleDateString("it-IT"),
                            maxWidth: 100
                        },
                        {
                            Header: "Tipo",
                            id: "tipo",
                            accessor: s => s.items && s.items.length > 0 ? s.items.map(i => i.code).join(', ') : '-',
                            maxWidth: 120
                        },
                        {
                            Header: "Descrizione",
                            id: "descrizione",
                            accessor: s => s.items && s.items.length > 0 ? s.items.map((i, n) => <p key={n}>{i.description}</p>) : '-'
                        },
                        {
                            Header: "Imponibile",
                            id: "imponibile",
                            accessor: s => `${s.amount_net.toFixed(2)}€`,
                            maxWidth: 100
                        },
                        {
                            Header: "Totale",
                            id: "totale",
                            accessor: s => `${s.amount_total.toFixed(2)}€`,
                            maxWidth: 100
                        },
                        {
                            Header: "Stato",
                            id: "stato",
                            accessor: s => s.paid ? "Saldato" : "Da Pagare",
                            maxWidth: 100
                        }
                    ]}
                />
            </Page>
        )
    }
}

Client.propTypes = {
    match: PropTypes.object.isRequired,
}

export default Client
