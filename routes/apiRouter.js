const express = require ('express')
let apiRouter = express.Router()

const knex = require('knex')({
    client: 'pg',
    debug: true,
    connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    }
   });

const endpoint = '/'

apiRouter.get(endpoint + 'clientes', (req, res) => {
    knex.select('*').from('cliente')
    .then( clientes => res.status(200).json(clientes) )
    .catch(err => {
    res.status(500).json({
    message: 'Erro ao recuperar clientes - ' + err.message })
    })
});

apiRouter.get(endpoint + 'clientes/:id', (req, res) => {
    const id = req.params.id;
    knex.select('*').from('cliente').where({id: id})
    .then ( clientes => res.status(200).json(clientes))
    .catch(err => {
        res.status(500).json({
        message: 'Erro ao recuperar cliente - ' + err.message })
        })
});

apiRouter.post(endpoint + 'clientes', (req, res) => {
    knex ('cliente')
    .insert({
    nome: req.body.nome,
    tel: req.body.tel,
    email: req.body.email
}, ['id', 'nome', 'tel', 'email'])
.then((clientes) => { 
        res.status(201).json({
            cliente: clientes[0],
            message: `Cliente inserido com sucesso`
        })
    })
})

apiRouter.put(endpoint + 'clientes/:id', (req, res) => {
    let id = req.params.id;
    knex ('cliente')
    .update({
        tel: req.body.tel,
        email: req.body.email
    }, ['id', 'nome', 'tel', 'email'])
    .then((clientes) => {
            res.status(201).json({
                cliente: clientes[0],
                message: `Cliente atualizado com sucesso`
            })
        })
})

apiRouter.delete(endpoint + 'clientes/:id', (req, res) => {
    const id = req.params.id;
    knex.delete()
    .from('cliente').where({id: id})
    .then ( clientes => res.status(204).json(clientes))
    .catch(err => {
        res.status(500).json({
        message: 'Erro ao conectar ao DB - ' + err.message })
        })
});

module.exports = apiRouter