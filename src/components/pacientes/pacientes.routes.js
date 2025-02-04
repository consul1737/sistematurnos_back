import { Router } from 'express';
import AdminPacientes from '@pacientes/pacientesController';

const router = Router();

// Ruta para crear un nuevo paciente
router.post('/', AdminPacientes.CrearPaciente);

// Ruta para obtener la lista de pacientes
router.get('/', AdminPacientes.ObtenerPacientes);
// Ruta para eliminar un paciente 
router.route('/:id_paciente')
    .delete(AdminPacientes.DeletePacientes);

module.exports = router;
