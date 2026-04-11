const { Router } = require('express');
const { handleChat } = require('../controllers/chat.controller');
const { chatRateLimiter } = require('../middleware/rateLimiter');

const router = Router();

router.post('/', chatRateLimiter, handleChat);

module.exports = router;
