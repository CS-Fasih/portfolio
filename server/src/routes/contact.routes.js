const { Router } = require('express');
const { handleContact } = require('../controllers/contact.controller');
const { contactRateLimiter } = require('../middleware/rateLimiter');

const router = Router();

router.post('/', contactRateLimiter, handleContact);

module.exports = router;
