document.addEventListener('DOMContentLoaded', () => {

    // ---- Variables para guardar la selección del usuario ----
    let habitacionSeleccionada = 'Individual'; 
    let fechaLlegadaSeleccionada = '';
    let fechaSalidaSeleccionada = '';
    let metodoPagoSeleccionado = 'Efectivo';

    // ---- Inicialización de Modales de Bootstrap Unificada ----
    const reservaModalEl = document.getElementById('reservaModal');
    const loginModalEl = document.getElementById('loginModal');
    const registroModalEl = document.getElementById('registroModal');
    const confirmacionModalEl = document.getElementById('confirmacionModal');

    // Guardaremos las instancias de los modales para poder usarlas después (ej: .show(), .hide())
    let reservaModal, loginModal, registroModal, confirmacionModal;

    if (reservaModalEl) reservaModal = new bootstrap.Modal(reservaModalEl);
    if (loginModalEl) loginModal = new bootstrap.Modal(loginModalEl);
    if (registroModalEl) registroModal = new bootstrap.Modal(registroModalEl);
    if (confirmacionModalEl) confirmacionModal = new bootstrap.Modal(confirmacionModalEl);
    
    // ---- Lógica para el Widget de Reserva (SOLO si existe en la página) ----
    const widgetDeReserva = document.getElementById('reservarBtn');
    if (widgetDeReserva) {
        // 1. Selector de Habitaciones
        const dropdownButton = document.getElementById('habitaciones-dropdown');
        const dropdownMenu = document.querySelector('[aria-labelledby="habitaciones-dropdown"]');
        
        if (dropdownMenu) {
            dropdownMenu.addEventListener('click', (event) => {
                if (event.target.tagName === 'A') {
                    event.preventDefault();
                    habitacionSeleccionada = event.target.dataset.value;
                    dropdownButton.textContent = `Habitación: ${habitacionSeleccionada}`;
                }
            });
        }

        // 2. Selectores de Fecha (Flatpickr)
        const fpLlegada = flatpickr("#fecha-llegada", {
            dateFormat: "Y-m-d",
            minDate: "today",
            locale: "es",
            onChange: function(selectedDates, dateStr) {
                fechaLlegadaSeleccionada = dateStr;
                if (selectedDates[0]) {
                    // Asegura que la fecha de salida sea como mínimo un día después de la llegada
                    const nextDay = new Date(selectedDates[0]);
                    nextDay.setDate(nextDay.getDate() + 1);
                    fpSalida.set('minDate', nextDay);
                }
            }
        });

        const fpSalida = flatpickr("#fecha-salida", {
            dateFormat: "Y-m-d",
            minDate: "today",
            locale: "es",
            onChange: function(selectedDates, dateStr) {
                fechaSalidaSeleccionada = dateStr;
            }
        });

        // 3. Botón "RESERVAR"
        widgetDeReserva.addEventListener('click', () => {
            if (!fechaLlegadaSeleccionada || !fechaSalidaSeleccionada) {
                alert('Por favor, selecciona una fecha de llegada y de salida.');
                return;
            }
            document.getElementById('reserva-tipo-habitacion').textContent = `Habitación ${habitacionSeleccionada}`;
            const fechaLlegada = new Date(fechaLlegadaSeleccionada + 'T00:00:00');
            const fechaSalida = new Date(fechaSalidaSeleccionada + 'T00:00:00');
            const diffTime = Math.abs(fechaSalida - fechaLlegada);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            document.getElementById('dias-estadia-display').textContent = diffDays > 0 ? diffDays : 1;
            document.getElementById('fecha-llegada-display').textContent = fechaLlegada.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
            document.getElementById('fecha-salida-display').textContent = fechaSalida.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const imagenHabitacion = document.getElementById('reserva-imagen-habitacion');
            if (habitacionSeleccionada === 'Standard') imagenHabitacion.src = 'img/Habi-Popular2.png';
            else if (habitacionSeleccionada === 'Deluxe') imagenHabitacion.src = 'img/Habi-Popular3.png';
            else imagenHabitacion.src = 'img/Habi-Popular1.png';
            
            if(reservaModal) reservaModal.show();
        });

        // 4. Lógica para método de pago en el modal de reserva
        const pagoDropdownButton = document.getElementById('metodo-pago-dropdown');
        const pagoDropdownMenu = document.querySelector('[aria-labelledby="metodo-pago-dropdown"]');
        if (pagoDropdownMenu) {
            pagoDropdownMenu.addEventListener('click', (event) => {
                if (event.target.tagName === 'A') {
                    event.preventDefault();
                    metodoPagoSeleccionado = event.target.dataset.value;
                    pagoDropdownButton.textContent = `M. Pago: ${metodoPagoSeleccionado}`;
                }
            });
        }
    }

    // ---- Lógica para botones de Login y Registro en la barra superior ----
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    if (loginBtn && registerBtn) {
        loginBtn.addEventListener('click', () => {
            if(loginModal) loginModal.show();
        });
        registerBtn.addEventListener('click', () => {
            if(registroModal) registroModal.show();
        });
    }

    // --- LÓGICA PARA EL CARRUSEL DE SCROLLING (AÑADIDO) ---
    const scrollContainer = document.querySelector('.scrolling-wrapper');
    const scrollNextBtn = document.getElementById('scroll-next');
    const scrollPrevBtn = document.getElementById('scroll-prev');

    if (scrollContainer && scrollNextBtn && scrollPrevBtn) {
        // Función para desplazar el carrusel
        const scrollCarousel = (direction) => {
            const card = document.querySelector('.room-card-wrapper');
            if (card) {
                const cardWidth = card.offsetWidth; // Obtiene el ancho de una tarjeta, incluyendo padding
                scrollContainer.scrollBy({ left: cardWidth * direction, behavior: 'smooth' });
            }
        };

        scrollNextBtn.addEventListener('click', () => scrollCarousel(1)); // Desplaza a la derecha
        scrollPrevBtn.addEventListener('click', () => scrollCarousel(-1)); // Desplaza a la izquierda
    }
    
    // --- LÓGICA PARA MOSTRAR/OCULTAR CONTRASEÑA EN LOGIN (AÑADIDO) ---
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('login-password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            // Cambia el tipo de input entre 'password' y 'text'
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            // Cambia el icono del ojo
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // --- LÓGICA PARA LA MEJORA DEL MODAL DE REGISTRO (AÑADIDO) ---
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        const toggleRegistroPassword = document.getElementById('toggleRegistroPassword');
        const registroPasswordInput = document.getElementById('registro-password');
        const registroSubmitBtn = document.getElementById('registroSubmitBtn');
        const requiredInputs = registroForm.querySelectorAll('[required]');

        // 1. Mostrar/Ocultar contraseña del formulario de registro
        if (toggleRegistroPassword && registroPasswordInput) {
             toggleRegistroPassword.addEventListener('click', () => {
                const type = registroPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                registroPasswordInput.setAttribute('type', type);
                toggleRegistroPassword.classList.toggle('fa-eye');
                toggleRegistroPassword.classList.toggle('fa-eye-slash');
            });
        }

        // 2. Función para validar el formulario y habilitar/deshabilitar el botón
        const validateForm = () => {
            let allValid = true;
            requiredInputs.forEach(input => {
                if (input.type === 'checkbox') {
                    if (!input.checked) {
                        allValid = false;
                    }
                } else {
                    if (input.value.trim() === '') {
                        allValid = false;
                    }
                }
            });
            // Habilita o deshabilita el botón según el resultado
            registroSubmitBtn.disabled = !allValid;
        };

        // 3. Añadir escuchadores de eventos para validar en tiempo real
        requiredInputs.forEach(input => {
            input.addEventListener('input', validateForm);
            input.addEventListener('change', validateForm); // Para el checkbox
        });
    }

    // ---- LÓGICA PARA EL MENÚ LATERAL DE INDEX.HTML (AÑADIDO) ----
    const menuIcon = document.querySelector('.top-bar .menu-icon');
    const mobileSidebar = document.getElementById('mobile-sidebar'); // Usa el ID general
    const sidebarOverlay = document.getElementById('sidebar-overlay'); // Usa el ID general
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');

    // Comprueba que los elementos del menú de la página de inicio existan
    if (menuIcon && mobileSidebar && sidebarOverlay && closeSidebarBtn && mobileSidebar.classList.contains('mobile-sidebar-custom')) {
        
        const openSidebar = () => {
            mobileSidebar.classList.add('visible');
            sidebarOverlay.classList.add('visible');
        };

        const closeSidebar = () => {
            mobileSidebar.classList.remove('visible');
            sidebarOverlay.classList.remove('visible');
        };

        menuIcon.addEventListener('click', openSidebar);
        closeSidebarBtn.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
    }


    // --- LÓGICA PARA CONFIRMAR RESERVA Y VALIDAR DATOS ---
    const confirmarReservaBtn = document.getElementById('confirmar-reserva-btn');
    if (confirmarReservaBtn && reservaModal && confirmacionModal) {
        
        confirmarReservaBtn.addEventListener('click', () => {
            
            // 1. Identificar los campos de texto que deben estar llenos
            const camposRequeridos = [
                document.getElementById('reserva-nombres'),
                document.getElementById('reserva-apellidos'),
                document.getElementById('reserva-dni'),
                document.getElementById('reserva-telefono'),
                document.getElementById('reserva-pais')
            ];

            // 2. Verificar que todos los campos tengan texto
            const todosLosCamposEstanLlenos = camposRequeridos.every(campo => campo && campo.value.trim() !== '');

            // 3. Decidir la acción a tomar
            if (todosLosCamposEstanLlenos) {
                // Si todo está correcto, ocultar el modal de reserva y mostrar el de confirmación
                reservaModal.hide();
                confirmacionModal.show();
            } else {
                // Si falta algún dato, mostrar una alerta al usuario
                alert('Por favor, complete todos los campos de datos personales para confirmar la reserva.');
            }
        });
    }

});