const express = require('express');
const router  = express.Router();
const Landingpagectrl  = require('../controllers/HomeCtrl')

router.get('/landingpage' , Landingpagectrl.getalldata)
router.post('/search_for_coach' , Landingpagectrl.search_for_coach)
router.post('/searchindetailforcoach' , Landingpagectrl.searchindetailforcoach)

module.exports = router;