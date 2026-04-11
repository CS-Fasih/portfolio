const nodemailer = require('nodemailer');

let transporter = null;

/**
 * Initialize Nodemailer transporter.
 * Gracefully skips if SMTP env vars are not set.
 */
function initEmailService() {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
        console.warn('[email] SMTP not configured. Email notifications disabled.');
        return;
    }

    transporter = nodemailer.createTransport({
        host,
        port: parseInt(port, 10) || 587,
        secure: false,
        auth: { user, pass },
    });

    console.log('[email] Nodemailer transporter initialized.');
}

/**
 * Send a notification email for a new contact message.
 * @param {Object} contactData - { name, email, message }
 * @returns {boolean} true if sent, false if skipped/failed
 */
async function sendContactNotification(contactData) {
    if (!transporter) {
        console.warn('[email] No transporter. Skipping email notification.');
        return false;
    }

    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
            subject: `Portfolio Contact: ${contactData.name}`,
            text: `Name: ${contactData.name}\nEmail: ${contactData.email}\n\nMessage:\n${contactData.message}`,
        });

        console.log('[email] Contact notification sent.');
        return true;
    } catch (err) {
        console.error(`[email] Send error: ${err.message}`);
        return false;
    }
}

module.exports = { initEmailService, sendContactNotification };
