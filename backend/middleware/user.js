// middleware/auth.js


import jwt from "jsonwebtoken";

const JWT_SECRET = "amoldhjdfiszc@45226";

export function verifyToken(request, response, next) {
    const token = request.cookies.token;
    if (!token) return response.status(401).send({ message: "Access denied. No token." });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        request.user = decoded;
        next();
    } catch (err) {
        response.status(400).send({ message: "Invalid token." });
    }
}




