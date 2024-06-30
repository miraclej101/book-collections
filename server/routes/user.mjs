import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { registerValidation } from "../middlewares/validation_register.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const userRouter = Router();

userRouter.post("/register", [registerValidation], async (req, res) => {
    const { username, password, firstname, lastname } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const created_at = new Date();
    const updated_at = new Date();
    const last_logged_in = new Date();

    try{
        const result = await connectionPool.query(
            `INSERT INTO users (username, password, firstname, lastname, created_at, updated_at, last_logged_in) 
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [username, hashpassword, firstname, lastname, created_at, updated_at, last_logged_in]
        );
        if(result.rowCount === 0) {
            return res.status(400).json({
                "message": "Bad request"
            });
        }

        return res.status(201).json({
            "message": "User created successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            "message": "Internal Server Error"
        });
    }

});

userRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await connectionPool.query(
            `SELECT * FROM users WHERE username = $1;`,
            [username]
        );
        
        if(user.rowCount === 0) {
            return res.status(404).json({
                "message": "User not found"
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
        if(!isValidPassword) {
            return res.status(401).json({
                "message": "Invalid password or password"
            });
        }
        
        const token = jwt.sign({
            id: user.rows[0].user_id,
            username: user.rows[0].username,
            firstname: user.rows[0].firstname,
            lastname: user.rows[0].lastname
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "900000"
        });

        return res.status(200).json({
            "message" : "Login successfully",
            token
        });

    } catch (err) {     
        console.log(err);

        return res.status(500).json({
            "message": "Internal Server Error"
        });
    }
});

export default userRouter;