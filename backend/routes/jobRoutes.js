import express from "express";
import { StatusCodes } from "http-status-codes";
import { createDbConnection } from "../src/config/dbconfig.js";
import { verifyToken } from "..//middleware/user.js";


const router = express.Router();
const conn = createDbConnection();



// post job route
router.post("/job-post", (request, response) => {
    try {
        const { id, role, skills, details } = request.body;

        const query = `
            INSERT INTO job_data (id, role, skills, details)
            VALUES (?, ?, ?, ?)
        `;

        const values = [id, role, skills, details];

        conn.query(query, values, (error, result) => {
            if (error) {
                if (error.errno === 1062) {
                    return response.status(StatusCodes.BAD_REQUEST).send({ message: "Job already Posted" });
                } else {
                    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Error While inserting data" });
                }
            } else {
                return response.status(StatusCodes.OK).send({ message: "Job Added Succesfully" });
            }
        });
    } catch (err) {
        console.error(err);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal server error" });
    }
});


// All Job Details
router.get("/job-get", (request, response) => {
    try {
        const query = "SELECT * FROM job_Data";

        conn.query(query, (error, result) => {
            if (error) {
                return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Problem fetching jobs" });
            } else {
                return response.status(StatusCodes.OK).send(result);
            }
        });
    } catch (err) {
        console.error(err);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal server error" });
    }
});



// edit Job Details when Authorized 
router.put("/job-edit/:id", verifyToken, (request, response) => {
    if (request.user.role === 1 || request.user.role === 0) {
        try {
            const id = parseInt(request.params.id);
            const data = request.body;
            const query = `UPDATE job_Data SET role = ?, skills = ?, details = ? WHERE id = ?`;
            conn.query(query, [data.role, data.skills, data.details, id], (error, result) => {
                if (error) {
                    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Problem while updating", error });
                } else {
                    return response.status(StatusCodes.OK).send({ message: "Job updated successfully" });
                }
            });
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Problem", error });
        }
    } else {
        return response.status(StatusCodes.FORBIDDEN).send({ message: "Unauthorized User" });
    }
});




// Delete job when Authorized 
router.delete("/job-delete/:id", verifyToken, (request, response) => {
    if (request.user.role === 1 || request.user.role === 0) {
        try {
            const id = parseInt(request.params.id);
            const query = `DELETE FROM job_Data WHERE id = ?`;
            conn.query(query, [id], (error, result) => {
                if (error) {
                    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Problem while deleting", error });
                } else {
                    return response.status(StatusCodes.OK).send({ message: "Job deleted successfully" });
                }
            });
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Problem", error });
        }
    } else {
        return response.status(StatusCodes.FORBIDDEN).send({ message: "Unauthorized User" });
    }
});





export default router;