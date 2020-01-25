const express = require('express')
const app = express()
const cors=require('cors')
const port = 3025;
const configureDB = require('./config/database')
const router = require('./config/routes')
configureDB()

app.use(express.json())
app.use(cors())

// ROute Handlers || Request Handlers
app.get('/', (req,res) => {
    res.send('Welcome to the page')
})

app.use('/',router)

app.listen(port, () => {
    console.log('listening to the port,',port)
})
