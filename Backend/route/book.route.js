import express from "express";
import { getBook, addBook } from "../controller/book.controller.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", getBook);
router.post("/", isAdmin, addBook);

export default router;