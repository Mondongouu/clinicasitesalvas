const modelo = require('../modelo/MedicoModelo');

const obtenerMedicos = (req, res) => {
  const medicos = modelo.getAllMedicos();
  res.json(medicos);
};

const crearMedico = (req, res) => {
  const { t1 :idMedico, t2 :identificacion, t3 :nombres,t4 :telefono,t5 : correo } = req.body;

  if (modelo.getMedicoById(idMedico)) {
    return res.status(400).json({ error: 'El médico ya existe' });
  }

  const nuevo = {
    idMedico,
    identificacion,
    nombres,
    telefono,
    correo
  };

  const medicoCreado = modelo.addMedico(nuevo);
  res.status(201).json(medicoCreado);
};

const actualizarMedico = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const actualizado = modelo.updateMedico(id, data);
  if (!actualizado) {
    return res.status(404).json({ error: 'Médico no encontrado' });
  }

  res.json(actualizado);
};

const eliminarMedico = (req, res) => {
  const id = req.params.idMedico;

  const eliminado = modelo.deleteMedico(id);
  if (!eliminado) {
    return res.status(404).json({ error: 'Médico no encontrado' });
  }

  res.json({ mensaje: 'Médico eliminado', medico: eliminado });
};

module.exports = {
  obtenerMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico
};