import { Router } from "express";
import administrador from "@turnos/turnosController";

const router = Router();

// Rutas relacionadas con turnos
router.get("/", administrador.getTurnos);
router.post("/", administrador.crearTurno);
router.get("/calendario", administrador.getCalendarTurnos);

router
  .route("/:id_turno")
  .get(administrador.readTurno)
  .put(administrador.updateTurno)
  .delete(administrador.deleteTurno);

// Rutas adicionales
// router.get('/consultorios', administrador.getConsultorios);
// router.get('/tratamientos', administrador.getTratamientos);
//router.get('/pacientes', administrador.getPacientes);

// Notificaciones
// router.post('/enviar-notificaciones', administrador.enviarNotificaciones);

module.exports = router;
