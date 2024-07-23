function loadNavbar() {
    fetch('navbar/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            initNavbarToggle();
        });
}

function initNavbarToggle() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbarMenu = document.querySelector('.navbar__menu');
    const bars = document.querySelectorAll('.bar');

    mobileMenu.addEventListener('click', function () {
        navbarMenu.classList.toggle('active');
        mobileMenu.classList.toggle('is-active');
    });
}

document.addEventListener('DOMContentLoaded', loadNavbar);
