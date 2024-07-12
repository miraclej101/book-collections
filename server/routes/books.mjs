/**
 * @swagger
 * components:
 *   schemas:
 *     Books:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - category
 *         - release_year
 *         - user_id
 *         - created_at
 *         - updated_at
 *       properties:
 *         book_id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         description:
 *           type: string
 *           description: The description of the book
 *         category:
 *           type: string
 *           description: The category of the book
 *         publisher:
 *           type: string
 *           description: The publisher of the book
 *         release_year:
 *           type: integer
 *           description: The released year of the book
 *         user_id:
 *           type: integer
 *           description: The user id who owns the book
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the book was added
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date the book was updated
 *       example:
 *         book_id: 1
 *         title: Introduction to Python
 *         author: David Baez-Lopez,David Alfredo Baez Villegas
 *         description: Programming with Python for beginners
 *         category: IT
 *         publisher: Chapman and Hall/CRC
 *         release_year: 2024
 *         user_id: 1
 *         created_at: 2024-06-30 23:07:50.249+02
 *         updated_at: 2024-06-30 23:07:50.249+02
 */
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books/create:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              example:
 *                  title: Introduction to Python
 *                  author: David Baez-Lopez,David Alfredo Baez Villegas
 *                  description: Programming with Python for beginners
 *                  category: IT
 *                  publisher: Chapman and Hall/CRC
 *                  release_year: 2024
 *                  user_id: 1
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *              application/json:
 *                  schema:
 *                     example:
 *                        message: Book created successfully
 *       400:
 *         description: Required fields are missing.
 *         content:
 *              application/json:
 *                  schema:
 *                     example:
 *                        message: Required fields are missing.
 *       404:
 *         description: Not found
 *         content:
 *              application/json:
 *                  schema:
 *                     example:
 *                        message: Not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *              application/json:
 *                  schema:
 *                     example:
 *                        message: Internal Server Error
 * /books/{user_id}:
 *   get:
 *     summary: Get all books of a user
 *     tags: [Books]
 *     parameters:
 *      - in: path
 *        name: user_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user id who owns the books
 *     responses:
 *      200:
 *          description: The list of the books of the user
 *          content:
 *              application/json:
 *                  schema:
 *                     type: object
 *                     properties: 
 *                         data:
 *                             type: array
 *                             items:
 *                              $ref: '#/components/schemas/Books'
 *      500:
 *          description: Internal Server Error
 *          content:
 *              application/json:
 *                  schema:
 *                     example:
 *                        message: Internal Server Error
 * /books/update:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             example:
 *              user_id: 1
 *              book_id: 1
 *              title: Introduction to Python
 *              author: David Baez-Lopez,David Alfredo Baez Villegas
 *              description: Programming with Python for beginners
 *              category: IT
 *              publisher: Chapman and Hall/CRC
 *              release_year: 2024
 *     responses:
 *      200:
 *         description: Book updated successfully
 *         content:
 *              application/json:
 *                  schema:
 *                     example:
 *                        message: Book updated successfully
 *      400:
 *         description: User id and book id are required.
 *         content:
 *              application/json:
 *                  schema:
 *                     example:
 *                        message: User id and book id are required.
 *      404:
 *         description: Not found
 *         content:
 *              application/json:
 *                  schema:
 *                     example:
 *                        message: Not found
 *      500:
 *         description: Internal Server Error
 *         content:
 *              application/json:
 *                  schema:
 *                     example:
 *                        message: Internal Server Error
 * /books/delete:
 *    delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *           schema:
 *             example:
 *              user_id: 1
 *              book_id: 1
 *     responses:
 *      200:
 *        description: Book deleted successfully
 *        content:
 *            application/json:
 *              schema:
 *                example:
 *                  message: Book deleted successfully
 *      400:
 *        description: User id and book id are required.
 *        content:
 *            application/json:
 *              schema:
 *                example:
 *                  message: User id and book id are required.
 *      404:
 *        description: Not found
 *        content:
 *            application/json:
 *              schema:
 *                example:
 *                  message: Not found
 *      500:
 *        description: Internal Server Error
 *        content:
 *            application/json:
 *              schema:
 *                example:
 *                  message: Internal Server Error
 */

import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { protect } from "../middlewares/protect.mjs";

const booksRouter = Router();

booksRouter.use(protect);

booksRouter.post("/create", async (req, res) => {
  const {
    title,
    author,
    description,
    category,
    publisher,
    release_year,
    user_id,
  } = req.body;

  // Validate if all required fields are provided
  if (!title || !author || !category || !release_year || !user_id) {
    return res.status(400).json({
      message: "Required fields are missing.",
    });
  }

  const created_at = new Date();
  const updated_at = new Date();
  let result;
  try {
    result = await connectionPool.query(
      `INSERT INTO books (title, author, description, category, publisher, release_year, user_id, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      [
        title,
        author,
        description,
        category,
        publisher,
        release_year,
        user_id,
        created_at,
        updated_at,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    return res.status(201).json({
      message: "Book created successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

booksRouter.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const books = await connectionPool.query(
      `SELECT * FROM books WHERE user_id = $1;`,
      [user_id]
    );

    return res.status(200).json({
      data: books.rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

booksRouter.put("/update", async (req, res) => {
  const {
    user_id,
    book_id,
    title,
    author,
    description,
    category,
    publisher,
    release_year,
  } = req.body;

  if (!user_id || !book_id) {
    return res.status(400).json({
      message: "User id and book id are required.",
    });
  }

  let result;
  try {
    result = await connectionPool.query(
      `UPDATE books 
            SET title = CASE WHEN $1 != '' THEN $1 ELSE title END,
                author = CASE WHEN $2 != '' THEN $2 ELSE author END,
                description = CASE WHEN $3 != '' THEN $3 ELSE description END,
                category = CASE WHEN $4 != '' THEN $4 ELSE category END,
                publisher = CASE WHEN $5 != '' THEN $5 ELSE publisher END,
                release_year = COALESCE($6, release_year),
                updated_at = $7
            WHERE user_id = $8 AND book_id = $9;`,
      [
        title,
        author,
        description,
        category,
        publisher,
        release_year,
        new Date(),
        user_id,
        book_id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    return res.status(200).json({
      message: "Book updated successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

booksRouter.delete("/delete", async (req, res) => {
  const { user_id, book_id } = req.body;

  if (!user_id || !book_id) {
    return res.status(400).json({
      message: "User id and book id are required.",
    });
  }

  let result;
  try {
    result = await connectionPool.query(
      `DELETE FROM books WHERE user_id = $1 AND book_id = $2;`,
      [user_id, book_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    return res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default booksRouter;
