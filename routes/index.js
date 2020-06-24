const express = require('express')
const router = express.Router()

/**
 * @description: login landing page
 * @method：GET /
 */
router.get('/',(req,res)=>{
  res.render('login',({
    layout:'login'
  }))
})

/**
 * @description: Dashboard page
 * @method：GET /dashboard
 */
router.get('/dashboard',(req,res)=>{
  res.render('dashboard')
})

module.exports = router