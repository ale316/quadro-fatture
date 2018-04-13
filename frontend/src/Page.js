import './styles/App.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Page extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">{this.props.title}</h1>
                </header>
                <div className={this.props.className}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

Page.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
    className: PropTypes.string
}

export default Page
