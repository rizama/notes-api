const authenticationsService = require('../../services/postgres/AuthenticationsService');
const usersService = require('../../services/postgres/UserService');
const tokenManager = require('../../tokenize/TokenManager');
const validator = require('../../validator/authentications');
const { responseError } = require('../../utils');

const AuthenticationsHandler = {
    async postAuthenticationHandler(request, h) {
        try {
            validator.validatePostAuthenticationPayload(request.payload);
            const { username, password } = request.payload;
            const id = await usersService.verifyUserCredential(
                username,
                password
            );

            const accessToken = tokenManager.generateAccessToken({ id });
            const refreshToken = tokenManager.generateRefreshToken({ id });

            await authenticationsService.addRefreshToken(refreshToken);

            const response = h.response({
                status: 'success',
                message: 'Authentication berhasil ditambahkan',
                data: {
                    accessToken,
                    refreshToken,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            return responseError(error, h);
        }
    },

    async putAuthenticationHandler(request, h) {
        try {
            validator.validatePutAuthenticationPayload(request.payload);
            const { refreshToken } = request.payload;

            await authenticationsService.verifyRefreshToken(refreshToken);
            const { id } = tokenManager.verifyRefreshToken(refreshToken);

            const accessToken = tokenManager.generateAccessToken({ id });
            return {
                status: 'success',
                message: 'Access Token berhasil diperbarui',
                data: {
                    accessToken,
                },
            };
        } catch (error) {
            return responseError(error, h);
        }
    },

    async deleteAuthenticationHandler(request, h) {
        try {
            validator.validateDeleteAuthenticationPayload(request.payload);
            const { refreshToken } = request.payload;

            await authenticationsService.verifyRefreshToken(refreshToken);
            await authenticationsService.deleteRefreshToken(refreshToken);

            return {
                status: 'success',
                message: 'Refresh token berhasil dihapus',
            };
        } catch (error) {
            return responseError(error, h);
        }
    },
};

module.exports = AuthenticationsHandler;
