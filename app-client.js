// app-client.js
import React, { Component } from 'react'
import { render } from 'react-dom'
import store from './stores/store'

import App from './components/App'

var app = document.getElementById('app')

render(<App />, app)