import express from 'express'
import { apiHome } from './api'
const router = express.Router()

router.use('/api', apiHome)

// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

export default router
