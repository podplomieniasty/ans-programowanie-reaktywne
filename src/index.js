import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Counter from './components/counter'

const el = <h1>Mój nagłówek</h1>
ReactDOM.render(
    <Counter />, 
    document.getElementById('root')
)