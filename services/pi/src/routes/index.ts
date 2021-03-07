import express from 'express'
import { apiHome, apiRawBreed, apiRawHome, apiRawPony } from './api'
const router = express.Router()

router.get('/api/raw/pony/:id', apiRawPony)
router.get('/api/raw', apiRawHome)
router.use('/api', apiHome)

// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

router.get("/breed/:id", apiRawBreed);
router.get("/pony/:id", apiRawPony);

export default router
