import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { createDbConnection } from "../src/config/dbconfig.js";


const router = express.Router();
const conn = createDbConnection();

// SECRET key for JWT (ideally from env vars)
const JWT_SECRET = "amoldhjdfiszc@45226";






// Signup route
router.post("/signup", async (request, response) => {
    try {
        const { id, firstname, lastname, email, role, password } = request.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO usertable (id, firstname, lastname, email, role, password)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const values = [id, firstname, lastname, email, role, hashedPassword];

        conn.query(query, values, (error, result) => {
            if (error) {
                if (error.errno === 1062) {
                    return response.status(StatusCodes.BAD_REQUEST).send({ message: "Email already exists" });
                } else if(error.errno === 3819){
                    return response.status(StatusCodes.BAD_REQUEST).send({ message: "Please, Enter Valid Email" });
                }
                console.error(error);
                return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Database error" });
            }

            

            // Generate JWT
            const token = jwt.sign({ id, email, role }, JWT_SECRET, { expiresIn: "1d" });


            // Set cookie
            response.cookie("token", token, {
                httpOnly: true,
                secure: false,      // remove
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
            });

            response.status(StatusCodes.OK).send({ message: "User registered successfully" });
        });
    } catch (err) {
        console.error(err);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal server error" });
    }
});





// signin user

router.post("/signin", async (request, response) => {
    const { email, password } = request.body;
    const query = "SELECT * FROM usertable WHERE email = ?";
    
    conn.query(query, [email], async (err, results) => {
        if (err || results.length === 0) return response.status(StatusCodes.BAD_REQUEST).send({ message: "User not found" });
        
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return response.status(StatusCodes.UNAUTHORIZED).send({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

        response.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        response.status(StatusCodes.OK).send({ message: "Login successful" });
    });
});





// log out
router.get("/logout", (request, response)  => {
    response.clearCookie('token');
    response.status(StatusCodes.OK).json({
        success: true,
        message: "logged out"
    });
});





export default router;