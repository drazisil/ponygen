import express from "express";
import { apiHome, apiRawHome, apiRawMap, apiRawPony } from "./api";
const router = express.Router();

router.get("/api/raw/pony/:id", apiRawPony);
router.get("/api/raw", apiRawHome);
router.use("/api", apiHome);

// define the about route
router.get("/about", (req, res) => {
  res.send("About birds");
});

router.get("/:type/:id", apiRawMap);
router.get("/pony/:id", apiRawPony);

export default router;
