import express from 'express'
const router = express.Router()

// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

export default router
