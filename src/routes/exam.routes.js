const router = require('express').Router();
const examctrl = require('../controllers/exam.controller');
const { protect, adminOnly } = require('../middleware/auth.middleware');

router.post('/',          protect, adminOnly, examctrl.createCenter  )

module.exports = router;