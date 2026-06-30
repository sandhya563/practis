const Joi = require("joi");
const ApiError = require("../helpers/apiError");

const options = {
    abortEarly: false,
    allowUnknown: false
};

const todoSchema = {
    id: Joi.string().uuid().optional(),

    title: Joi.string().trim().min(2).max(255).optional(),

    description: Joi.string().allow("", null).optional(),

    completed: Joi.boolean().optional(),

    dueDate: Joi.date().optional(),

    userId: Joi.string().uuid().optional()
};

const createRequiredFields = [
    "title",
    "userId"
];

const updateRequiredFields = ["id"];

class TodoValidator {
    async createValidator(req, res, next) {
        try {
            const requestData = {
                ...req.body,
                ...req.params,
                ...req.query
            };

            const createObject = { ...todoSchema };

            createRequiredFields.forEach(field => {
                createObject[field] =
                    createObject[field].required();
            });

            const schema = Joi.object(createObject);

            const { error, value } =
                schema.validate(requestData, options);

            if (error) {
                const message = error.details
                    .map(d => d.message)
                    .join(", ");

                throw new ApiError(400, message);
            }

            req.body = value;
            next();
        } catch (err) {
            next(err);
        }
    }

    async updateValidator(req, res, next) {
        try {
            const requestData = {
                ...req.body,
                ...req.params,
                ...req.query
            };

            const updateObject = { ...todoSchema };

            updateRequiredFields.forEach(field => {
                updateObject[field] =
                    updateObject[field].required();
            });

            const schema = Joi.object(updateObject);

            const { error, value } =
                schema.validate(requestData, options);

            if (error) {
                const message = error.details
                    .map(d => d.message)
                    .join(", ");

                throw new ApiError(400, message);
            }

            req.body = value;
            next();
        } catch (err) {
            next(err);
        }
    }

    async getByIdValidator(req, res, next) {
        try {
            const schema = Joi.object({
                id: Joi.string().uuid().required()
            });

            const { error } = schema.validate(
                { ...req.params },
                options
            );

            if (error) {
                const message = error.details
                    .map(d => d.message)
                    .join(", ");

                throw new ApiError(400, message);
            }

            next();
        } catch (err) {
            next(err);
        }
    }

    async deleteValidator(req, res, next) {
        try {
            const schema = Joi.object({
                id: Joi.string().uuid().required()
            });

            const { error } = schema.validate(
                { ...req.params },
                options
            );

            if (error) {
                const message = error.details
                    .map(d => d.message)
                    .join(", ");

                throw new ApiError(400, message);
            }

            next();
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new TodoValidator();