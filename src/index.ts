import express from 'express'
import routeHome from './routes'
const app = express()

app.use('/', routeHome)

app.use(express.static('public'))

export default app
