import 'react-table/react-table.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import axios from 'axios'

import Page from './Page'

class Client extends Component {
    constructor() {
        super()

        this.state = {
            data: []
        }
    }

    componentWillMount() {
        axios.get("http://localhost:3300/invoices")
        .then(res => {
            console.log(res.data)
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
                            accessor: "codes"
                        },
                        {
                            Header: "Descrizione",
                            accessor: "descriptions"
                        },
                        {
                            Header: "Imponibile",
                            accessor: "amount_net"
                        },
                        {
                            Header: "Totale",
                            accessor: "amount_total"
                        },
                        {
                            Header: "Stato",
                            accessor: "status"
                        }
                    ]}
                />
            </Page>
        )
    }
}

export default Client
