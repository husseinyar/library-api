import express from "express";
import * as controller from "../controllers/libraryController";

const router = express.Router();

/**
 * @swagger
 * /v1/books:
 *   get:
 *     summary: Lista alla böcker
 *     description: Returnerar en lista med alla böcker i biblioteket samt antal tillgängliga kopior.
 *     responses:
 *       200:
 *         description: Lyckad hämtning av boklista
 */
router.get("/v1/books", controller.getBooks);

/**
 * @swagger
 * /v1/books/{bookId}:
 *   get:
 *     summary: Hämta en bok
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN eller ID för boken
 *     responses:
 *       200:
 *         description: Bokdetaljer
 *       404:
 *         description: Bok hittades ej
 */
router.get("/v1/books/:bookId", controller.getBook);

/**
 * @swagger
 * /v1/books/{bookId}/rent:
 *   post:
 *     summary: Låna en bok
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bok utlånad
 *       400:
 *         description: Saknar userId eller boken är redan utlånad
 */
router.post("/v1/books/:bookId/rent", controller.rent);

/**
 * @swagger
 * /v1/users/{userId}/books:
 *   get:
 *     summary: Lista en användares lånade böcker
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID för användaren vars lånade böcker ska listas
 *     responses:
 *       200:
 *         description: Lista med lånade böcker
 */
router.get("/v1/users/:userId/books", controller.getUserBooks);

/**
 * @swagger
 * /v1/rentals/{rentalId}/return:
 *   post:
 *     summary: Lämna tillbaka en bok
 *     parameters:
 *       - in: path
 *         name: rentalId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID för bokningen som ska återlämnas
 *     responses:
 *       200:
 *         description: Boken har återlämnats
 *       400:
 *         description: Misslyckad återlämning
 */
router.post("/v1/rentals/:rentalId/return", controller.returnBook);

export default router;