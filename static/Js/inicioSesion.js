// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const goToRegister = document.getElementById('goToRegister');
    const goToLogin = document.getElementById('goToLogin');
    const loginErrorMessage = document.getElementById('login-error-message');
    const registerErrorMessage = document.getElementById('register-error-message');

    function showForm(form) {
        document.querySelector('.iniciarForm-container.active').classList.remove('active');
        form.classList.add('active');
    }

    goToRegister.addEventListener('click', function(event) {
        event.preventDefault();
        showForm(registerForm.parentElement);
    });

    goToLogin.addEventListener('click', function(event) {
        event.preventDefault();
        showForm(loginForm.parentElement);
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulación de autenticación
        if (username === 'usuario' && password === 'contrasena') {
            alert('Inicio de sesión exitoso');
            // Redirigir a otra página o realizar otra acción
        } else {
            loginErrorMessage.textContent = 'Usuario o contraseña incorrectos';
        }
    });

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        const regUsername = document.getElementById('reg-username').value;
        const regPassword = document.getElementById('reg-password').value;
        const regEmail = document.getElementById('reg-email').value;

        // Simulación de registro
        if (regUsername && regPassword && regEmail) {
            alert('Registro exitoso');
            // Realizar acciones de registro, como guardar datos en el backend
        } else {
            registerErrorMessage.textContent = 'Por favor, complete todos los campos';
        }
    });

    // Mostrar el formulario de inicio de sesión por defecto
    loginForm.parentElement.classList.add('active');
});