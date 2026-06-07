const ContactMessage = require('../models/ContactMessage.model');
const { sendContactNotification } = require('../services/email.service');

/**
 * POST /api/contact
 * Stores a contact message in MongoDB and optionally sends email notification.
 */
async function handleContact(req, res) {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'Name, email, and message are required.',
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'Invalid email format.',
            });
        }

        const contactMsg = await ContactMessage.create({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
        });

        // Attempt email notification (non-blocking)
        sendContactNotification({ name, email, message }).catch((err) => {
            console.error(`[contact] Background email notification failed: ${err.message}`);
        });

        res.status(201).json({
            success: true,
            data: { id: contactMsg._id },
            message: 'Message sent successfully!',
        });
    } catch (err) {
        console.error(`[contact] Error: ${err.message}`);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Failed to send message. Please try again.',
        });
    }
}

module.exports = { handleContact };
