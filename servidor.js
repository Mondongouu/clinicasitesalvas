const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true}));

let medicos= [];

app.get('/medicos', (req, res) =>{
    res.json(medicos);
});

app.post('/medicos', (req, res) =>{
    const {idMedico, identificacion, nombres, telefono, correo} = req.body;

    const existe = medicos.find(m => m.idMedico === idMedico);
    if (existe) {
        return res.status(400).json({ error: 'El medico ya existe'});
        }

        const nuevoMedico = {idMedico, identificacion, nombres,
        telefono, correo};
        medicos.push(nuevoMedico);
        res.status(201).json(nuevoMedico);
});

app.put('/medicos/:id', (req, res) => {
    const id = req.params.id;
    const {identificacion, nombres, telefono, correo} = req.body;

    const medicoIndex = medicos.findIndex(m => m.idMedico === id);
    if (medicoIndex === -1) {
        return res.status(404).json({ error: 'Medico no econtrado'});
    }
    if (identificacion) medicos[medicoIndex].identificacion = identificacion;
    if (nombres) medicos[medicoIndex].nombres = nombres;
    if (telefono) medicos[medicoIndex].telefono = telefono;
    if (correo) medicos[medicoIndex].correo = correo;

    res.json(medicos[medicoIndex]);
});

app.delete('/medicos/:idMedico', (req, res) => {
    const id = req.params.idMedico;
    const medicoIndex = medicos.findIndex(m => m.idMedico === id);

    if (medicoIndex === -1) {
        return res.status(404).json({ error: 'Medico no encontrado'});
    }

    const eliminado = medicos.splice(medicoIndex, 1);

    res.json({ mensaje: 'Medico eliminado', medico: eliminado[0]});
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});