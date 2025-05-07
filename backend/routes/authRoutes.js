import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { StatusCodes } from "http-status-codes";
import { createDbConnection } from "../src/config/dbconfig.js";
// import { verifyToken } from "..//middleware/user.js";


const router = express.Router();
const conn = createDbConnection();

// SECRET key for JWT (ideally from env vars)
const JWT_SECRET = "amoldhjdfiszc@45226"; // Replace with a secure key in production






// Signup route
router.post("/signup", async (request, response) => {
    try {
        const data = request.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const query = `
            INSERT INTO usertable (id, firstname, lastname, email, role, password)
            VALUES (${data.id}, "${data.firstname}", "${data.lastname}", "${data.email}", ${data.role}, "${hashedPassword}")
        `;


        conn.query(query, (error, result) => {
            if (error) {
                if (error.errno === 1062) {
                    return response.status(400).send({ message: "Email already exists" });
                } else if(error.errno === 3819){
                    return response.status(400).send({ message: "Please, Enter Valid Email" });
                }
                console.error(error);
                return response.status(500).send({ message: "Database error" });
            }

            // // Use insertedId from MySQL to get auto-generated ID
            // const id = result.insertId;

            // Generate JWT
            const token = jwt.sign({ 
                id : data.id, 
                email : data.email, 
                role : data.role
            }, JWT_SECRET, { expiresIn: "1d" });

            // Set cookie
            response.cookie("token", token, {
                httpOnly: true,
                secure: false, // set to true in production with HTTPS
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
            });

            response.status(200).send({ message: "User registered successfully" });
        });
    } catch (err) {
        console.error(err);
        response.status(500).send({ message: "Internal server error" });
    }
});





// signin user

router.post("/signin", async (request, res) => {
    const { email, password } = request.body;
    const query = "SELECT * FROM usertable WHERE email = ?";
    
    conn.query(query, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(400).send({ message: "User not found" });
        
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).send({ message: "Login successful" });
    });
});





//  log out
router.get("/logout", (request, res)  => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "logged out"
    });
});





export default router;