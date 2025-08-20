const express = require('express');
const router = express.Router();
const medicocontrolador = require('../controlador/MedicoControlado');

router.get('/', medicocontrolador.obtenerMedicos);
router.post('/guardar', medicocontrolador.crearMedico);
router.put('/:id', medicocontrolador.actualizarMedico);
router.delete('/:idMedico', medicocontrolador.eliminarMedico);

module.exports = router;