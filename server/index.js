const express = require('express')
const path = require('path')

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
    rollbar.info('html file served successfully.')
})

const port = process.env.PORT || 4545

app.listen(port, () => {
    console.log(`Listening to you on port ${port}`)
})

// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '922a1357ef4144d2bc07edfb6abe0a72',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')