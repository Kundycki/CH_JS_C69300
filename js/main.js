document.addEventListener('DOMContentLoaded', () => {
    const dias = [
        { nombre: "lunes", cant: 3 },
        { nombre: "martes", cant: 5 },
        { nombre: "miércoles", cant: 2 },
        { nombre: "jueves", cant: 6 },
        { nombre: "viernes", cant: 4 }
    ];

    document.querySelectorAll('[data-area]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const area = e.target.dataset.area;
            const { value: fecha } = await Swal.fire({
                title: `Turno para ${area}`,
                input: 'date',
                inputLabel: 'Seleccioná una fecha:',
                inputPlaceholder: 'aaaa-mm-dd',
                confirmButtonText: 'Reservar',
                showCancelButton: true
            });

            if (fecha) {
                const nuevoTurno = { area, fecha };
                const turnosGuardados = JSON.parse(localStorage.getItem('turnos')) || [];
                turnosGuardados.push(nuevoTurno);
                localStorage.setItem('turnos', JSON.stringify(turnosGuardados));
                Swal.fire('¡Turno reservado!', `Turno para ${area} el ${fecha}`, 'success');
            }
        });
    });

    document.getElementById('btnSimulacion').addEventListener('click', iniciarSimulacionTurno);
    document.getElementById('btnVerTurnos').addEventListener('click', mostrarTurnosGuardados);
    document.getElementById('btnSoporte').addEventListener('click', abrirFormularioSoporte);
    document.getElementById('formSoporte').addEventListener('submit', enviarSoporte);

    async function Diaturno() {
        const { value: dia } = await Swal.fire({
            title: '¿Qué día desea elegir?',
            input: 'text',
            inputPlaceholder: 'Ejemplo: Lunes, Martes...',
            showCancelButton: true
        });

        if (!dia) return;

        const eleccion = dias.find(d => d.nombre.toLowerCase() === dia.toLowerCase());

        if (eleccion) {
            if (eleccion.cant > 0) {
                eleccion.cant -= 1;
                Swal.fire('¡Perfecto!', `Hay turnos disponibles para ${eleccion.nombre}.`, 'success');
            } else {
                Swal.fire('Lo sentimos', `No hay más turnos para ${eleccion.nombre}.`, 'error');
            }
        } else {
            Swal.fire('Día inválido', 'Por favor intente nuevamente.', 'warning');
        }
    }

    async function iniciarSimulacionTurno() {
        let continuar = true;

        while (continuar) {
            const { isConfirmed } = await Swal.fire({
                title: '¿Desea pedir un turno?',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            });

            if (isConfirmed) {
                await Diaturno();
            } else {
                Swal.fire('¡Hasta luego!');
                continuar = false;
            }
        }
    }

    function abrirFormularioSoporte() {
        const form = document.getElementById('formSoporte');
        if (form) {
            form.style.display = 'block';
        }
    }

    function enviarSoporte(event) {
        event.preventDefault();
        const correo = document.getElementById('correo').value;
        const mensaje = document.getElementById('mensaje').value;

        Swal.fire('¡Gracias por contactarnos!', `Te responderemos a ${correo}.\nMensaje: ${mensaje}`, 'success');
        document.getElementById('formSoporte').style.display = 'none';
    }

    function mostrarTurnosGuardados() {
        const turnos = JSON.parse(localStorage.getItem('turnos')) || [];
        const htmlTurnos = turnos.map(t => `• ${t.area}: ${t.fecha}`).join('<br>') || 'No hay turnos guardados.';
        Swal.fire({
            title: 'Turnos guardados:',
            html: htmlTurnos,
            icon: 'info'
        });
    }
});