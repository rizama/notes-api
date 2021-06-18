const { Pool } = require('pg');
const { InvariantError } = require('../../exceptions/InvariantError');

const AuthenticationsService = {
    async addRefreshToken(token) {
        const query = {
            text: 'INSERT INTO authentications VALUES($1)',
            values: [token],
        };

        await Pool.query(query);
    },

    async verifyRefreshToken(token) {
        const query = {
            text: 'SELECT token FROM authentications WHERE token = $1',
            values: [token],
        };

        const result = await Pool.query(query);

        if (!result.rowCount) {
            throw new InvariantError('Refresh token tidak valid');
        }
    },

    async deleteRefreshToken(token) {
        await this.verifyRefreshToken(token);

        const query = {
            text: 'DELETE FROM authentications WHERE token = $1',
            values: [token],
        };

        await Pool.query(query);
    },
};

module.exports = AuthenticationsService;
