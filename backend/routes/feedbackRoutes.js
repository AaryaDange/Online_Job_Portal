import express from "express";
import { StatusCodes } from "http-status-codes";
import { createDbConnection } from "../src/config/dbconfig.js";
import { verifyToken } from "..//middleware/user.js";


const router = express.Router();
const conn = createDbConnection();



// post feedback
router.post("/feedback-post", (request, response) => {
    try {
        const { firstname, lastname, email, rating, comments } = request.body;

        const query = `
            INSERT INTO feedback (firstname, lastname, email, rating, comments)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [firstname, lastname, email, rating, comments];

        conn.query(query, values, (error, result) => {
            if (error) {
                if (error.errno === 3819) {
                    return response.status(StatusCodes.BAD_REQUEST).send({ message: "Please, Enter Valid Email" });
                } else {
                    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Error while submitting feedback" });
                }

            } else {
                return response.status(StatusCodes.OK).send({ message: "Feedback submitted successfully" });
            }
        });
    } catch (err) {
        console.error(err);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal server error" });
    }
});



// get feedback
router.get("/feedback-get", verifyToken, (request, response) => {
    if (request.user.role === 1) {
        const query = "SELECT * FROM feedback";
        conn.query(query, (error, result) => {
            if (error) {
                console.error("Database error:", error);
                return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Problem fetching feedback" });
            }
            return response.status(StatusCodes.OK).send(result);
        });
    } else {
        return response.status(StatusCodes.FORBIDDEN).send({ message: "Unauthorized User: Access denied" });
    }
});


export default router;