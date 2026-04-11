/**
 * Global error handling middleware.
 * Catches unhandled errors and returns a consistent JSON response.
 */
function errorHandler(err, req, res, _next) {
    console.error(`[error] ${err.stack || err.message}`);

    const statusCode = err.statusCode || 500;
    const message =
        process.env.NODE_ENV === 'production'
            ? 'An internal server error occurred.'
            : err.message;

    res.status(statusCode).json({
        success: false,
        data: null,
        message,
    });
}

module.exports = { errorHandler };
