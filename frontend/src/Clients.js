import './styles/Clients.css'
import 'react-table/react-table.css'

import axios from 'axios'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { sortBy } from 'lodash'
import { Link } from "react-router-dom"

import Page from './Page'

class Clients extends Component {
    constructor() {
        super()

        this.state = {
            clients: [],
            shown: []
        }

        this.handleNameChange = this.handleNameChange.bind(this)
    }

    componentWillMount() {
        axios.get(`http://localhost:3300/clients`)
        .then(res => {
            let sorted = sortBy(res.data, c => c.name)
            if (sorted && sorted.length > 0) {
                this.setState({
                    clients: sorted,
                    shown: sorted
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleNameChange(e) {
        let key = e.target.value.toLowerCase()
        this.setState({
            shown: this.state.clients.filter(c => c.name.toLowerCase().indexOf(key) > -1)
        })
    }

    render() {
        return (
            <Page
                className="Clients"
                title={`Lista clienti`}
            >
                <div>
                    <input type="text" placeholder="Cerca per nome cliente..." onChange={this.handleNameChange} />
                    <ul>
                        {this.state.shown.map((c, i) => <li key={i}><Link to={`/cliente/${c._id}`}>{c.name}</Link></li>)}
                    </ul>
                </div>
            </Page>
        )
    }
}

export default Clients
