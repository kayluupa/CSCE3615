// for eye icons
document.addEventListener("DOMContentLoaded", function() {
    const togglePassword1 = document.getElementById('togglePassword1');
    const togglePassword2 = document.getElementById('togglePassword2');

    if (togglePassword1 && togglePassword2) {
        togglePassword1.addEventListener('click', function() {
            togglePasswordVisibility(this, 'password');
        });

        togglePassword2.addEventListener('click', function() {
            togglePasswordVisibility(this, 'retype-password');
        });

        function togglePasswordVisibility(element, inputId) {
            const passwordInput = document.getElementById(inputId);
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                element.setAttribute('src', 'images/eyeOpen.svg');
            } else {
                passwordInput.type = 'password';
                element.setAttribute('src', 'images/eyeClosed.svg');
            }
        }
    } else {
        console.error("Toggle Password elements not found");
    }
});
// eye icons