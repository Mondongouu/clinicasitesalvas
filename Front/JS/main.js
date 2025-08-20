const apiUrl = 'http://localhost:3000/medicos';
const medicoForm = document.getElementById('medicoForm');
const idMedicoInput = document.getElementById('idMedico');
const identificacionInput = document.getElementById('identificacion');
const nombresInput = document.getElementById('nombres');
const telefonoInput = document.getElementById('telefono');
const correoInput = document.getElementById('correo');
const tablaMedicosBody = document.getElementById('tablaMedicosBody');

//Cargar medicos al iniciar la pagina
window.onload = () => {
    cargarMedicos();
};

//Funcion para cargar los medicos y mostrarlos en la tabla
function cargarMedicos() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            tablaMedicosBody.innerHTML = '';
            data.forEach(medico => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${medico.idMedico}</td>
                <td>${medico.identificacion}</td>
                <td>${medico.nombres}</td>
                <td>${medico.telefono}</td>
                <td>${medico.correo}</td>
                <td>
                    <button class="edit-btn" onclick="editarMedico('${medico.idMedico}')">Editar</button>
                    <button class="delete-btn" onclick="eliminarMedico('${medico.idMedico}')">Eliminar</button>
                </td>
                `;
                tablaMedicosBody.appendChild(tr);
            });
        })
        .catch(err => alert('Error cargando medicos' + err));
}

//Guardar o actualizar medico
medicoForm.addEventListener('submit', e =>{
    e.preventDefault();
    const idMedico = idMedicoInput.value.trim();
    const identificacion = identificacionInput.value.trim();
    const nombres = nombresInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const correo = correoInput.value.trim();

    if (!idMedico || !identificacion || !nombres || !telefono || !correo) {
        alert('Por favor complete todos los campos.');
        return;
    }
    
    const medicoData= {idMedico, identificacion, nombres, telefono, correo};
    const metodo = existeMedico(idMedico) ? 'PUT': 'POST';
    const url = metodo === 'POST' ? apiUrl :  `${apiUrl}/${idMedico}`;

    fetch(url, {
        method: metodo,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(medicoData),
    })
    .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e.error));
    })
    .then(() =>{
        alert(metodo === 'POST' ? 'Medico agregado' : 'Medico actualizado');
        limpiarFormulario();
        cargarMedicos();
    })
    .catch(err => alert('Error: ' + err));
});

function existeMedico(idMedico) {
    return Array.from(tablaMedicosBody.children).some(
        row => row.children[0].textContent === idMedico
    );
}

function editarMedico(idMedico){
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        const medico = data.find(m => m.idMedico === idMedico);
        if (!idMedico)  {
            alert('Medico no encontrado');
            return;
        }
        idMedicoInput.value = medico.idMedico;
        identificacionInput.value = medico.identificacion;
        nombresInput.value = medico.nombres;
        telefonoInput.value = medico.telefono;
        correoInput.value = medico.correo;
    });
}

function eliminarMedico(idMedico) {
    if (!confirm('¿Seguro que quieres eliminar este medico?')) return;

    fetch(`${apiUrl}/${idMedico}`, { method: 'DELETE'})
    .then(res => {
        if(!res.ok) throw new Error('Error al eliminar medico');
        return res.json();
    })
    .then(() =>{
        alert('Medico eliminado');
        cargarMedicos();
    })
    .catch(err => alert(err));
}

function limpiarFormulario() {
    idMedicoInput.value = '';
    identificacionInput.value = '';
    nombresInput.value = '';
    telefonoInput.value = '';
    correoInput.value = '';
}