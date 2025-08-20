let medicos = [];

const getAllMedicos = () => medicos;

const getMedicoById = (idMedico) =>
  medicos.find(m => m.idMedico === idMedico);

const addMedico = (medico) => {
  medicos.push(medico);
  return medico;
};

const updateMedico = (idMedico, data) => {
  const index = medicos.findIndex(m => m.idMedico === idMedico);
  if (index === -1) return null;

  medicos[index] = { ...medicos[index], ...data };
  return medicos[index];
};

const deleteMedico = (idMedico) => {
  const index = medicos.findIndex(m => m.idMedico === idMedico);
  if (index === -1) return null;

  const eliminado = medicos.splice(index, 1);
  return eliminado[0];
};

module.exports = {
  getAllMedicos,
  getMedicoById,
  addMedico,
  updateMedico,
  deleteMedico
};