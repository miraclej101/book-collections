/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - firstname
 *         - lastname
 *         - created_at
 *         - updated_at
 *         - last_logged_in
 *       properties:
 *         user_id:
 *           type: integer
 *           description: The auto-generated id of a user
 *         username:
 *           type: string
 *           description: The identified username of a user
 *         password:
 *           type: string
 *           description: a password with at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character
 *         firstname:
 *           type: string
 *           description: The first name of a user
 *         lastname:
 *           type: string
 *           description: The last name of a user
 *         created_at:
 *          type: string
 *          format: date-time
 *          description: The date and time when the user was created
 *         updated_at:
 *          type: string
 *          format: date-time
 *          description: The date and time when the user was updated
 *         last_logged_in:
 *          type: string
 *          format: date-time
 *          description: The date and time when the user last logged in
 *       example:
 *         user_id: 1
 *         username: mj101
 *         password: Miage2024%
 *         firstname: Malasri
 *         lastname: JANUMPORN
 *         created_at: 2024-06-30 20:06:46.32+02
 *         updated_at: 2024-06-30 20:06:46.32+02
 *         last_logged_in: 2024-07-01 00:50:43.042+02
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API
 * /user/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *              username: mj101
 *              password: Miage2024%
 *              firstname: Malasri
 *              lastname: JANUMPORN
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 * /user/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *              username: mj101
 *              password: Miage2024%
 *     responses:
 *       200:
 *         description: Login successfully
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Internal Server Error
 */

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

  try {
    const result = await connectionPool.query(
      `INSERT INTO users (username, password, firstname, lastname, created_at, updated_at, last_logged_in) 
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [
        username,
        hashpassword,
        firstname,
        lastname,
        created_at,
        updated_at,
        last_logged_in,
      ]
    );
    if (result.rowCount === 0) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
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

    if (user.rowCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.rows[0].user_id,
        username: user.rows[0].username,
        firstname: user.rows[0].firstname,
        lastname: user.rows[0].lastname,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "900000",
      }
    );

    await connectionPool.query(
      `UPDATE users SET last_logged_in = $1 WHERE user_id = $2;`,
      [new Date(), user.rows[0].user_id]
    );

    return res.status(200).json({
      message: "Login successfully",
      token,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default userRouter;
