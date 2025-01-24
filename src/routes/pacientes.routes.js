import express from 'express';
import AdminPacientes from '../controllers/pacientes';

const router = express.Router();

// Ruta para obtener la lista de pacientes
router.get('/Adminpacientes', AdminPacientes.ObtenerPacientes);
// Ruta para crear un nuevo paciente
router.post('/Adminpacientes', AdminPacientes.CrearPaciente);

router.route('/Adminpacientes/:id_paciente')
    .get(AdminPacientes.ObtenerPacientePorId)
    .put(AdminPacientes.EditarPacientes)
    .delete(AdminPacientes.DeletePacientes);

module.exports = router;
