const { Router } = require('express');
const { getRepos, handleWebhook } = require('../controllers/github.controller');
const { verifyWebhookSignature } = require('../middleware/webhookVerify');

const router = Router();

router.get('/repos', getRepos);
router.post('/webhook', verifyWebhookSignature, handleWebhook);

module.exports = router;
