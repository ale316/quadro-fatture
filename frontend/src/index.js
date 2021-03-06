import React from 'react'
import ReactDOM from 'react-dom'

import './styles/index.css'
import Client from './Client'
import Clients from './Clients'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path='/' component={Clients}/>
            <Route exact path='/cliente/:client_id' component={Client}/>
        </Switch>
    </Router>
), document.getElementById('root'))

registerServiceWorker()
