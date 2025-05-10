import { StatusCodes } from "http-status-codes";

import jwt from "jsonwebtoken";

const JWT_SECRET = "amoldhjdfiszc@45226";

export function verifyToken(request, response, next) {
    const token = request.cookies.token;  // Token from cookies

    if (!token) {
        return response.status(StatusCodes.BAD_REQUEST).send({ message: "Access denied. Authorized entry only." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        request.user = decoded;
        next();
    } catch (err) {
        response.status(StatusCodes.BAD_REQUEST).send({ message: "Invalid token." });
    }
}
