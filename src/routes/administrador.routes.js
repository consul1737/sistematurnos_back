import express from 'express';
import administrador from '../controllers/turnos';

const router = express.Router();

// Rutas relacionadas con turnos
router.post('/turnos', administrador.crearTurno);
router.get('/turnos/:id_turno', administrador.readTurno);
router.put('/turnos/:id_turno', administrador.updateTurno);
router.delete('/turnos/:id_turno', administrador.deleteTurno);
router.get('/turnos', administrador.getTurnos);

// Rutas adicionales
router.get('/consultorios', administrador.getConsultorios);
router.get('/tratamientos', administrador.getTratamientos);
router.get('/pacientes', administrador.getPacientes);
router.get('/Calendarturnos', administrador.getCalendarTurnos);

// Notificaciones
// router.post('/enviar-notificaciones', administrador.enviarNotificaciones);

module.exports = router;
