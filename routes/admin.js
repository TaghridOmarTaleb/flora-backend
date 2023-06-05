import express from "express";
const router = express.Router();
import controller from "../controllers/admin.js";
import authorization from '../middelware/authorization.js'

router.get("/", authorization, controller.getAll);
router.get("/me", authorization, controller.get);
router.get("/:id", authorization, controller.getById);
router.post("/login",  controller.login);
router.delete("/:id", authorization, controller.remove);
router.post("/", authorization, controller.post);

export default router;
