const handler = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/authentications',
        handler: handler.postAuthenticationHandler,
    },
    {
        method: 'PUT',
        path: '/authentications',
        handler: handler.putAuthenticationHandler,
    },
    {
        method: 'DELETE',
        path: '/authentications',
        handler: handler.deleteAuthenticationHandler,
    },
];

module.exports = routes;
