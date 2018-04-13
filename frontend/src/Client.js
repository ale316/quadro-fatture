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
            data: []
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:3300/invoices/${this.props.match.params.client_id}`)
        .then(res => {
            let sorted = sortBy(res.data, i => i.paid)
            let data = sorted.map(s => {
                return {
                    codes: s.items && s.items.length > 0 ? s.items.map(i => i.code).join(', ') : '-',
                    descriptions: s.items && s.items.length > 0 ? s.items.map(i => i.description).join('\n') : '-',
                    amount_net: `${s.amount_net.toFixed(2)}€`,
                    amount_total: `${s.amount_total.toFixed(2)}€`,
                    status: s.paid ? "Saldato" : "Da Pagare"
                }
            })

            this.setState({
                data: data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <Page title="Quadro fatture per">
                <ReactTable
                    data={this.state.data}
                    noDataText="Nessun Risultato"
                    showPagination={false}
                    columns={[
                        {
                            Header: "Tipo",
                            accessor: "codes",
                            maxWidth: 100
                        },
                        {
                            Header: "Descrizione",
                            accessor: "descriptions"
                        },
                        {
                            Header: "Imponibile",
                            accessor: "amount_net",
                            maxWidth: 100
                        },
                        {
                            Header: "Totale",
                            accessor: "amount_total",
                            maxWidth: 100
                        },
                        {
                            Header: "Stato",
                            accessor: "status",
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
