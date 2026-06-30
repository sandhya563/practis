const Joi = require("joi");
const ApiError = require("../helpers/apiError");

const options = {
  abortEarly: false,
  allowUnknown: false,
};

const userSchema = {
  id: Joi.string().uuid().optional(),

  firstName: Joi.string().trim().min(2).max(50).optional(),

  lastName: Joi.string().trim().min(2).max(50).optional(),

  username: Joi.string().trim().min(3).max(30).optional(),

  email: Joi.string().trim().email().optional(),

  password: Joi.string().min(6).optional(),

  phone: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .optional()
    .messages({
      "string.pattern.base": "Invalid Indian mobile number",
    }),
  profileImage: Joi.string().optional(),

  isActive: Joi.boolean().optional(),
};

const createRequiredFields = [
  "firstName",
  "lastName",
  "username",
  "email",
  "password",
];

const updateRequiredFields = ["id"];

class UserValidator {
  async createValidator(req, res, next) {
    try {
      const requestData = {
        ...req.body,
        ...req.params,
        ...req.query,
      };

      const createObject = { ...userSchema };

      createRequiredFields.forEach((field) => {
        createObject[field] = createObject[field].required();
      });

      const schema = Joi.object(createObject);

      const { error, value } = schema.validate(requestData, options);

      if (error) {
        const message = error.details.map((d) => d.message).join(", ");

        throw new ApiError(400, message);
      }

      req.body = value;
      next();
    } catch (err) {
      next(err);
    }
  }
  loginValidator(req, res, next) {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });

      const { error, value } = schema.validate(req.body, options);

      if (error) {
        const message = error.details.map((d) => d.message).join(", ");
        throw new ApiError(400, message);
      }

      req.body = value;
      next();
    } catch (err) {
      next(err);
    }
  }
  getAllValidator(req, res, next) {
    try {
      const schema = Joi.object({
        search: Joi.string().optional(),
      });

      const { error, value } = schema.validate(req.query);

      if (error) {
        throw new ApiError(400, error.details[0].message);
      }

      req.query = value;
      next();
    } catch (error) {
      next(error);
    }
  }

  async updateValidator(req, res, next) {
    try {
      const requestData = {
        ...req.body,
        ...req.params,
        ...req.query,
      };

      const updateObject = { ...userSchema };

      updateRequiredFields.forEach((field) => {
        updateObject[field] = updateObject[field].required();
      });

      const schema = Joi.object(updateObject);

      const { error, value } = schema.validate(requestData, options);

      if (error) {
        const message = error.details.map((d) => d.message).join(", ");

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
        id: Joi.string().uuid().required(),
      });

      const { error } = schema.validate({ ...req.params }, options);

      if (error) {
        const message = error.details.map((d) => d.message).join(", ");

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
        id: Joi.string().uuid().required(),
      });

      const { error } = schema.validate({ ...req.params }, options);

      if (error) {
        const message = error.details.map((d) => d.message).join(", ");

        throw new ApiError(400, message);
      }

      next();
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new UserValidator();
