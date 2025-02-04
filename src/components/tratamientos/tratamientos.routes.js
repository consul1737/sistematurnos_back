import { Router } from "express";
import { getTratamientos, getTratamientoById, createTratamiento, updateTratamiento, deleteTratamiento } from "@tratamientos/tratamientosController";

const router = Router();

router.get("/", getTratamientos);
router.post("/", createTratamiento);

router.route("/:id_tratamiento")
    .get(getTratamientoById)
    .put(updateTratamiento)
    .delete(deleteTratamiento);

export default router;