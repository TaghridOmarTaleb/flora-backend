import express from "express";
const router = express.Router();
import controller from "../controllers/plant.js";
import authorization from "../middelware/authorization.js";
import upload from "../middelware/multer.js";

router.get("/av",  controller.getAvailable);
router.get("/",  controller.getHidden);
router.get("/:id",  controller.getById);
router.get("/av/:id",  controller.getAvailableById);
router.put("/:id",  controller.put);
router.put("/soft/:id", controller.softDelete);
router.delete("/:id", controller.remove);
router.post("/",  controller.post);

export default router;
