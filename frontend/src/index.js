import React from 'react'
import ReactDOM from 'react-dom'

import './styles/index.css'
import Client from './Client'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Client />, document.getElementById('root'))
registerServiceWorker()
