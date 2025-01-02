import express from 'express';
import AdminPacientes from '../controllers/pacientes';

const router = express.Router();

// Ruta para crear un nuevo paciente
router.post('/Adminpacientes', AdminPacientes.CrearPaciente);

// Ruta para obtener la lista de pacientes
router.get('/Adminpacientes', AdminPacientes.ObtenerPacientes);
// Ruta para eliminar un paciente 
router.delete('/AdminPacientes/:id_paciente', AdminPacientes.DeletePacientes);

module.exports = router;
