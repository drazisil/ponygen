import express from "express";
import { apiHome, apiRawMap, apiRawPony } from "./api";
const router = express.Router();

router.get("/pony/:id", apiRawPony);
router.get("/:type/:id", apiRawMap);

router.use("/", apiHome);

export default router;
