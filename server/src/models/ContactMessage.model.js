const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },
        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000,
        },
    },
    {
        strict: true,
        timestamps: true,
    }
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
