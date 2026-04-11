const mongoose = require('mongoose');

const repoCacheSchema = new mongoose.Schema(
    {
        repoName: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        repoUrl: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        topics: {
            type: [String],
            default: [],
        },
        readme: {
            type: String,
            default: '',
        },
        lastSynced: {
            type: Date,
            default: Date.now,
        },
    },
    {
        strict: true,
        timestamps: true,
    }
);

module.exports = mongoose.model('RepoCache', repoCacheSchema);
