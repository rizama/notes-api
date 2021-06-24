/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const ClientError = require('../exceptions/ClientError');

const mapDBToModel = ({ id, title, body, tags, created_at, updated_at, username }) => ({
    id,
    title,
    body,
    tags,
    createdAt: created_at,
    updatedAt: updated_at,
    username
});

const responseError = (error, h) => {
    if (error instanceof ClientError) {
        const response = h.response({
            status: 'fail',
            message: error.message,
        });
        response.code(error.statusCode);
        return response;
    }

    // Server ERROR!
    const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
    });
    response.code(500);
    console.error(error);
    return response;
};

module.exports = { mapDBToModel, responseError };
