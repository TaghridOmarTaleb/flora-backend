import express from "express";
const router = express.Router();
import controller from "../controllers/content.js";
import authorization from "../middelware/authorization.js";
import upload from "../middelware/multer.js";

router.put("/:id", authorization, upload.single("image"), controller.put);
router.delete("/:id", authorization, controller.remove);
router.post("/", authorization, upload.single("image"), controller.post);

export default router;
