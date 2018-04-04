import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/App.css'

class Page extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">{this.props.title}</h1>
                </header>
                {this.props.children}
            </div>
        )
    }
}

Page.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
}

export default Page
