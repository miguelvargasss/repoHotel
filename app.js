document.addEventListener('DOMContentLoaded', () => {

    // ---- Variables para guardar la selección del usuario ----
    let habitacionSeleccionada = 'Individual'; 
    let fechaLlegadaSeleccionada = '';
    let fechaSalidaSeleccionada = '';
    let metodoPagoSeleccionado = 'Efectivo';

    // ---- Inicialización de Modales de Bootstrap ----
    const reservaModalEl = document.getElementById('reservaModal');
    const reservaModal = new bootstrap.Modal(reservaModalEl);

    const loginModalEl = document.getElementById('loginModal');
    const loginModal = new bootstrap.Modal(loginModalEl);

    const registroModalEl = document.getElementById('registroModal');
    const registroModal = new bootstrap.Modal(registroModalEl);
    
    // ---- Lógica para el Widget de Reserva ----

    // 1. Selector de Habitaciones
    const dropdownButton = document.getElementById('habitaciones-dropdown');
    const dropdownMenu = document.querySelector('[aria-labelledby="habitaciones-dropdown"]');
    
    dropdownMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            habitacionSeleccionada = event.target.dataset.value;
            dropdownButton.textContent = `Habitación: ${habitacionSeleccionada}`;
        }
    });

    // --- Logica para metodo pago ----
    // --- LÓGICA PARA EL DROPDOWN DE MÉTODO DE PAGO EN EL MODAL ---

// 1. Seleccionamos los elementos del nuevo dropdown
const pagoDropdownButton = document.getElementById('metodo-pago-dropdown');
const pagoDropdownMenu = document.querySelector('[aria-labelledby="metodo-pago-dropdown"]');

// 2. Añadimos un listener al menú
if (pagoDropdownMenu) { // Verificamos que el elemento exista
    pagoDropdownMenu.addEventListener('click', (event) => {
        // Nos aseguramos que el click fue en un enlace (<a>)
        if (event.target.tagName === 'A') {
            event.preventDefault(); // Evitamos que la página se recargue

            // Guardamos el valor seleccionado en nuestra variable
            metodoPagoSeleccionado = event.target.dataset.value;

            // Actualizamos el texto del botón para mostrar la selección
            pagoDropdownButton.textContent = `M. Pago: ${metodoPagoSeleccionado}`;

            console.log(`Método de pago seleccionado: ${metodoPagoSeleccionado}`); // Opcional: para verificar en consola
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
            // Forzar que la fecha de salida sea posterior a la de llegada
            if (selectedDates[0]) {
                fpSalida.set('minDate', selectedDates[0]);
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
    const botonReservar = document.getElementById('reservarBtn');
    botonReservar.addEventListener('click', () => {
        if (!fechaLlegadaSeleccionada || !fechaSalidaSeleccionada) {
            alert('Por favor, selecciona una fecha de llegada y de salida.');
            return;
        }

        // Pasar datos al modal de reserva ANTES de mostrarlo
        document.getElementById('reserva-tipo-habitacion').textContent = `Habitación ${habitacionSeleccionada}`;

        const fechaLlegada = new Date(fechaLlegadaSeleccionada + 'T00:00:00');
        const fechaSalida = new Date(fechaSalidaSeleccionada + 'T00:00:00');
        
        const diffTime = Math.abs(fechaSalida - fechaLlegada);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        document.getElementById('dias-estadia-display').textContent = diffDays > 0 ? diffDays : 1;
        document.getElementById('fecha-llegada-display').textContent = fechaLlegada.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        document.getElementById('fecha-salida-display').textContent = fechaSalida.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

        // Cambiar la imagen de la habitación según la selección (ejemplo)
        const imagenHabitacion = document.getElementById('reserva-imagen-habitacion');
        if (habitacionSeleccionada === 'Standard') {
            imagenHabitacion.src = 'img/Habi-Popular2.png';
        } else if (habitacionSeleccionada === 'Deluxe') {
             imagenHabitacion.src = 'img/Habi-Popular3.png';
        } else {
             imagenHabitacion.src = 'img/Habi-Popular1.png';
        }

        // Mostrar el modal de reserva
        reservaModal.show();
    });

    // ---- Lógica para botones de Login y Registro en la barra superior ----
    document.getElementById('loginBtn').addEventListener('click', () => {
        loginModal.show();
    });

    document.getElementById('registerBtn').addEventListener('click', () => {
        registroModal.show();
    });


    // --- LÓGICA PARA EL CARRUSEL DE SCROLLING PERSONALIZADO ---
    const carouselContainer = document.querySelector('#scrolling-carousel');
    if (carouselContainer) { // Solo ejecutar si el carrusel existe en la página
        const carouselWrapper = carouselContainer.querySelector('.scrolling-wrapper');
        const prevBtn = carouselContainer.querySelector('#scroll-prev');
        const nextBtn = carouselContainer.querySelector('#scroll-next');
        const cards = carouselContainer.querySelectorAll('.room-card-wrapper');
        
        let currentIndex = 0;

        function updateCarousel() {
            if (cards.length === 0) return; // Salir si no hay tarjetas
            const cardWidth = cards[0].offsetWidth; // Ancho de una tarjeta, incluyendo padding
            const offset = -currentIndex * cardWidth;
            carouselWrapper.style.transform = `translateX(${offset}px)`;
        }

        function getVisibleCardsCount() {
            if (cards.length === 0) return 0;
            const containerWidth = carouselContainer.querySelector('.carousel-inner-scroll').offsetWidth;
            const cardWidth = cards[0].offsetWidth;
            // Evitar división por cero si el ancho de la tarjeta es 0
            return cardWidth > 0 ? Math.floor(containerWidth / cardWidth) : 0;
        }

        nextBtn.addEventListener('click', () => {
            const visibleCards = getVisibleCardsCount();
            if (currentIndex < cards.length - visibleCards) {
                currentIndex++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        // Actualizar en caso de que cambie el tamaño de la ventana
        window.addEventListener('resize', () => {
            // Reiniciar para evitar cálculos incorrectos
            currentIndex = 0;
            updateCarousel();
        });

        // Una llamada inicial para asegurar la posición correcta al cargar
        updateCarousel();
    }


    // --- LÓGICA PARA MOSTRAR/OCULTAR CONTRASEÑA EN LOGIN ---
    const loginModalContainer = document.getElementById('loginModal');
    if (loginModalContainer) { // Ejecutar solo si el modal de login existe
        
        const togglePassword = loginModalContainer.querySelector('#togglePassword');
        const passwordInput = loginModalContainer.querySelector('#login-password');

        if(togglePassword && passwordInput) {
            togglePassword.addEventListener('click', function () {
                // Comprobar el tipo de input actual
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                // Cambiar el ícono del ojo
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        }
    }

    // --- LÓGICA PARA LA MEJORA DEL MODAL DE REGISTRO ---
    const registroForm = document.getElementById('registroForm');
    if(registroForm) { // Solo ejecutar si el formulario existe
        const passInput = document.getElementById('registro-password');
        const togglePassIcon = document.getElementById('toggleRegistroPassword');
        const termsCheck = document.getElementById('registro-terminos');
        const submitBtn = document.getElementById('registroSubmitBtn');

        const requiredInputs = registroForm.querySelectorAll('input[required]:not([type="checkbox"])');

        if(togglePassIcon && passInput) {
            togglePassIcon.addEventListener('click', function() {
                const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passInput.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        }

        function validateForm() {
            let allFieldsValid = true;
            requiredInputs.forEach(input => {
                if (input.value.trim() === '') {
                    allFieldsValid = false;
                }
            });
            if (!termsCheck.checked) {
                allFieldsValid = false;
            }
            submitBtn.disabled = !allFieldsValid;
        }

        registroForm.addEventListener('keyup', validateForm);
        termsCheck.addEventListener('change', validateForm);

        registroForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            validateForm();
            if (!submitBtn.disabled) {
                alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
                
                const registroModalInst = bootstrap.Modal.getInstance(registroModalEl);
                registroModalInst.hide();
                loginModal.show();
            }
        });
    }

    
    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const closeBtn = document.getElementById('close-sidebar-btn');

    // Función para abrir el sidebar
    const openSidebar = () => {
        if(sidebar && overlay) {
            sidebar.classList.add('visible');
            overlay.classList.add('visible');
        }
    };

    // Función para cerrar el sidebar
    const closeSidebar = () => {
        if(sidebar && overlay) {
            sidebar.classList.remove('visible');
            overlay.classList.remove('visible');
        }
    };

    // Eventos para abrir y cerrar
    if (menuIcon) {
        menuIcon.addEventListener('click', openSidebar);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
});