const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const session = require('express-session')

const db = require('../database/dbConfig.js')
const Users = require('../users/users-model.js')

const authRouter = require('../auth/auth-router')
// const restricted = require('../auth/restricted-middleware')
const protected = require('../auth/protected')

const server = express();

const sessionConfig = {
    name: 'cartman',
    secret: 'lol its a secret',
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 1,
        secure: false
    },
    resave: false,
    saveUninitialized: true
}

server.use(session(sessionConfig))
server.use(helmet())
server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.send("You're Trash!")
})

server.use('/api/auth', authRouter)

// server.post('/api/register', (req, res) => {
//     let user = req.body

//     const hash = bcrypt.hashSync(user.password, 10)

//     user.password = hash


//     Users.add(user)
//         .then(saved => {
//             res.status(201).json(saved)
//         })
//         .catch(error => {
//             res.status(500).json(error)
//         })
// })

// server.post('/api/login', (req, res) => {
//     let { username, password } = req.body;

//     Users.findBy({ username })
//         .first()
//         .then(user => {
//             if( user && bcrypt.compareSync(password, user.password )) {
//                 res.status(200).json({ message: `Welcome ${user.username}`})
//             } else {
//                 res.status(401).json({ message: 'Invalid Credentials' })
//             }
//         })
//         .catch(error => {
//             res.status(500).json(error)
//         })
// })

server.get('/api/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.send('error logging out')
            } else {
                res.send('good bye')
            }
        })
    }
})


server.get('/api/users', protected, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.json(users)
        })
        .catch(err => res.send(err))
})  




module.exports = server