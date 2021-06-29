const Joi = require('joi');

const ExportNotesPayloadSchema = Joi.object({
    email: Joi.string().email({ tlds: true }).required(),
});

module.exports = ExportNotesPayloadSchema;
