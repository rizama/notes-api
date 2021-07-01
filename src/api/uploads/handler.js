const { responseError } = require('../../utils');

class UploadsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
    }

    async postUploadImageHandler(request, h) {
        try {
            const { data } = request.payload;
            this._validator.validateImageHeaders(data.hapi.headers);

            const filename = await this._service.writeFile(data, data.hapi);

            // local
            // const response = h.response({
            //     status: 'success',
            //     data: {
            //         fileLocation: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
            //     },
            // });
            const response = h.response({
                status: 'success',
                data: {
                    fileLocation: filename,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            return responseError(error, h);
        }
    }
}

module.exports = UploadsHandler;