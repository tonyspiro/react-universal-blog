// app-client.js
import React, { Component } from 'react'
import { render } from 'react-dom'

import AppClient from './components/AppClient'

var app = document.getElementById('app')
render(<AppClient />, app)