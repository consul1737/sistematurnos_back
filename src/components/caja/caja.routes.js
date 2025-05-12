// src/routes/caja.routes.js
import { Router } from "express";
import { getVistaCaja } from "../caja/cajaControllers";
 // asegurate que esté bien resuelto el alias

const router = Router();

router.get("/", getVistaCaja); // Esto responde a /caja/ desde el archivo principal

export default router;
