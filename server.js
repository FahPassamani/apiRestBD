require('dotenv').config()

const express = require ('express');
const cors = require ('cors');
const path = require ('path');
//const { Pool } = require ('pg')
const app = express ()
const apiRouter = require('./routes/apiRouter')

/*const pool = new Pool({
    connectionString: process.env.POSTGRES_URI
})*/

app.use(cors())
app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use('/app', express.static (path.join (__dirname, '/public')))
app.use('/api', apiRouter)

let port = process.env.PORT || 3000;
app.listen (port)
