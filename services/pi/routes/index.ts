import express from 'express'
import { apiHome, apiRawHome, apiRawPony } from './api'
const router = express.Router()

router.get('/api/raw/pony/:id', apiRawPony)
router.get('/api/raw', apiRawHome)
router.use('/api', apiHome)

// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

export default router
