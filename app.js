import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(cors())

server.use((req, res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*')
    res.setHeader(
        'Access-Controll-Allow-Origin-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader('Access-Controll-Allow-Origin-Methods', 'GET,POST,PUT,DELETE')
    next()
})

server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is running',
    })
})

import { commentsRoutes, userRoutes } from './routes/'
server.use('/comments', commentsRoutes)
server.use('/user', userRoutes)

server.listen(process.env.SERVER_PORT)

export default server
