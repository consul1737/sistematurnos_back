import { Router } from "express";
import {
  getTratamientos,
  getTratamientoById,
  createTratamiento,
  updateTratamiento,
  deleteTratamiento,
  getTratamientosPorConsultorio,
} from "@tratamientos/tratamientosController";

const router = Router();

router.get("/", getTratamientos);
router.post("/", createTratamiento);

router.get(
  "/tratamientosconsul/:id_consultorio",
  getTratamientosPorConsultorio
);

router
  .route("/:id_tratamiento")
  .get(getTratamientoById)
  .put(updateTratamiento)
  .delete(deleteTratamiento);

export default router;
