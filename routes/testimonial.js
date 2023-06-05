import express from "express";
const router = express.Router();
import controller from "../controllers/testimonial.js";
import authorization from "../middelware/authorization.js";

router.get("/",  controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.post);
router.delete("/:id", controller.remove);

export default router;
