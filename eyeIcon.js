// for eye icons
document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById('togglePassword1');

    //If statement uses an event listener to toggle between visible and non-visible text based on if the eye is clicked
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            togglePasswordVisibility(this, 'password');
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
        console.error("Toggle Password element not found");
    }
});
