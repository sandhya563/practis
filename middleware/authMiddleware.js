const jwt = require("jsonwebtoken");
const ApiError = require("../helpers/apiError");

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization;

//         if (!token) {
//             throw new ApiError(401, "Token missing");
//         }

//         const decoded = jwt.verify(
//             token.replace("Bearer ", ""),
//             process.env.JWT_SECRET
//         );

//         req.user = decoded;

//         next();
//     } catch (error) {
//         next(error);
//     }
// };

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new ApiError(401, "Authorization token missing");
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        if (!token) {
            throw new ApiError(401, "Invalid token format");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authMiddleware;