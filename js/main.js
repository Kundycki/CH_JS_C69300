const dias = [
    { nombre: "lunes", cant: 3 },
    { nombre: "martes", cant: 5 },
    { nombre: "miércoles", cant: 2 },
    { nombre: "jueves", cant: 6 },
    { nombre: "viernes", cant: 4 }
];

function Diaturno() {
    let dia = prompt('¿Qué día desea elegir? (Ejemplo: Lunes, Martes,...)');
    let eleccion = dias.find(d => d.nombre.toLowerCase() === dia.toLowerCase());
    console.log('Usted eligió el día', dia);

    if (eleccion) {
        if (eleccion.cant > 0) {
            console.log(`¡Perfecto! Hay turnos disponibles para ${eleccion.nombre}.`);
            eleccion.cant -= 1;
        } else {
            console.log(`Perdón, pero no hay más turnos disponibles para ${eleccion.nombre}.`);
        }
    } else {
        console.log("Día inválido. Por favor intente nuevamente.");
    }
}

function iniciarSimulacionTurno() {
    let confirmacion = prompt('¡Hola! ¿Está interesado en un turno para atención? (si / no)');

    while (confirmacion && confirmacion.toLowerCase() === "si") {
        Diaturno();
        confirmacion = prompt("¿Desea pedir otro turno? (si / no)");
    }

    if (confirmacion && confirmacion.toLowerCase() === "no") {
        console.log("¡Hasta luego!");
    } else if (confirmacion) {
        console.log("Respuesta no reconocida. Finalizando.");
    }
}

function solicitarTurno(area) {
    const fecha = prompt(`Seleccioná una fecha para el turno de ${area} (formato aaaa-mm-dd):`);
    if (fecha) {
        const nuevoTurno = { area, fecha };
        const turnosGuardados = JSON.parse(localStorage.getItem('turnos')) || [];
        turnosGuardados.push(nuevoTurno);
        localStorage.setItem('turnos', JSON.stringify(turnosGuardados));
        alert(`Turno reservado para ${area} el ${fecha}`);
    }
}

function abrirFormularioSoporte() {
    const form = document.getElementById('formSoporte');
    if (form) {
        form.style.display = 'block';
    } else {
        console.log("Formulario no encontrado en el DOM.");
    }
}

function enviarSoporte(event) {
    event.preventDefault();
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    alert(`Gracias por contactarnos. Te responderemos a ${correo}.\nMensaje: ${mensaje}`);
    document.getElementById('formSoporte').style.display = 'none';
}

function mostrarTurnosGuardados() {
    const turnos = JSON.parse(localStorage.getItem('turnos')) || [];
    console.log("Turnos guardados:", turnos);
}
