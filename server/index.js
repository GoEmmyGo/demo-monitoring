const express = require('express')
const path = require('path')

const app = express()

// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '922a1357ef4144d2bc07edfb6abe0a72',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
    rollbar.info('html file served successfully.')
})

app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, '../styles.css'))
    rollbar.info('css file served successfully.')
})

const port = process.env.PORT || 4545

app.use(rollbar.errorHandler())

app.listen(port, () => {
    console.log(`Listening to you on port ${port}`)
})

let students = [emmaline, colin, chris, james, lucas, abby, casey]

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('Student added successfully', {author: 'Emmaline', type: 'manual entry'})

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error('student already exists')
        res.status(400).send('that student already exists')
    }

    res.status(200).send(students)
})

app.use(express.json())
