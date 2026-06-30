const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const userValidator = require("../validators/user.validator");


// Public
router.post("/signup", userValidator.createValidator, userController.signup);
router.post("/login", userValidator.loginValidator, userController.login);

// Protected
router.get("/", authMiddleware, userController.getAllUsers);

router.get(
    "/paginatedRecords",
    authMiddleware,
    userController.getUsersWithPagination
);

router.get(
    "/:id",
    authMiddleware,
    userValidator.getByIdValidator,
    userController.getUserById
);

router.patch(
    "/:id",
    authMiddleware,
    userValidator.updateValidator,
    userController.updateUser
);

router.delete(
    "/:id",
    authMiddleware,
    userValidator.deleteValidator,
    userController.deleteUser
);

module.exports = router;