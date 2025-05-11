import express from "express";
import { StatusCodes } from "http-status-codes";
import { createDbConnection } from "../src/config/dbconfig.js";
import { verifyToken } from "..//middleware/user.js";

const router = express.Router();
const conn = createDbConnection();



//  All users

router.get("/allUsers", (request, response, next) => {
    const pageSize = 10;
    const page = parseInt(request.query.pageNumber) || 1;
    const offset = pageSize * (page - 1);

    try {
        conn.query("SELECT COUNT(*) AS count FROM usertable", (err, countResult) => {
            if (err) return next(err);

            const count = countResult[0].count;
            const pages = Math.ceil(count / pageSize);

            const query = `
                SELECT id, firstname, lastname, email, role
                FROM usertable
                ORDER BY role DESC
                LIMIT ? OFFSET ?
            `;
            conn.query(query, [pageSize, offset], (err, users) => {
                if (err) return next(err);

                response.status(StatusCodes.OK).json({
                    success: true,
                    users,
                    page,
                    pages,
                    count
                });
            });
        });
    } catch (error) {
        return next(error);
    }
});



//  Get user by ID
router.get("/user/:id", verifyToken, (request, response) => {
    const id = parseInt(request.params.id);
    const query = "SELECT id, firstname, lastname, email, role FROM usertable WHERE id = ?";
    conn.query(query, [id], (err, result) => {
        if (err) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Database error" });
        if (result.length === 0) return response.status(StatusCodes.NOT_FOUND).send({ message: "User not found" });
        response.status(StatusCodes.OK).send(result[0]);
    });
});


//  Delete user by ID — only if role === 1
router.delete("/user/:id", verifyToken, (request, response) => {
    if (request.user.role !== 1) {
        return response.status(StatusCodes.FORBIDDEN).send({ message: "Access denied" });
    }

    const id = parseInt(request.params.id);
    const query = "DELETE FROM usertable WHERE id = ?";
    conn.query(query, [id], (err) => {
        if (err) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Delete failed" });
        response.status(StatusCodes.OK).send({ message: "User deleted" });
    });
});

//  Update user by ID — only if role === 1
router.put("/user/:id", verifyToken, (request, response) => {
    if (request.user.role !== 1) {
        return response.status(StatusCodes.FORBIDDEN).send({ message: "Access denied" });
    }

    const id = parseInt(request.params.id);
    const { firstname, lastname, email, role } = request.body;
    const query = `
        UPDATE usertable 
        SET firstname = ?, lastname = ?, email = ?, role = ?
        WHERE id = ?
    `;
    conn.query(query, [firstname, lastname, email, role, id], (err) => {
        if (err) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Update failed" });
        response.status(StatusCodes.OK).send({ message: "User updated successfully" });
    });
});


export default router;