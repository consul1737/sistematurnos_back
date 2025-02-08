import { Router } from "express";
import {
  getConsultorios,
  getConsultorioById,
  createConsultorio,
  updateConsultorio,
  deleteConsultorio,
  getConsultorioTratamiento,
  getConsultoriosConTratamientos,
} from "@consultorios/consultorioController";

const router = Router();

router.get("/", getConsultorios);
router.post("/", createConsultorio);
router.get("/tratamientos", getConsultoriosConTratamientos);
router.get("/consultorio_tratamientos/", getConsultorioTratamiento);
// router.get("/tratamientos/:id", getTratamientos);

router
  .route("/:id_consultorio")
  .get(getConsultorioById)
  .put(updateConsultorio)
  .delete(deleteConsultorio);

export default router;
