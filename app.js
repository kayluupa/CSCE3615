const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle('active');
});

function filterResults() {
    var zipcodeInput = document.getElementById('searchBar').value;
    var priceFilter = document.getElementById('price').value;
    var bedroomsFilter = document.getElementById('bedrooms').value;
    var bathroomsFilter = document.getElementById('bathrooms').value;
    var ul = document.getElementById("apartmentList");
    var li = ul.getElementsByTagName('li');

    for (var i = 0; i < li.length; i++) {
        var zipcode = li[i].getAttribute('data-zipcode');
        var price = li[i].getAttribute('data-price');
        var bedrooms = li[i].getAttribute('data-bedrooms');
        var bathrooms = li[i].getAttribute('data-bathrooms');

        var matchesZipcode = zipcode.includes(zipcodeInput) || !zipcodeInput;
        var matchesPrice = !priceFilter || (priceFilter === "1000" && price < 1000) ||
                           (priceFilter === "2000" && price >= 1000 && price < 2000) ||
                           (priceFilter === "3000" && price >= 2000 && price < 3000) ||
                           (priceFilter === "4000" && price >= 3000);
        var matchesBedrooms = bedrooms === bedroomsFilter || !bedroomsFilter;
        var matchesBathrooms = bathrooms === bathroomsFilter || !bathroomsFilter;

        if (matchesZipcode && matchesPrice && matchesBedrooms && matchesBathrooms) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function toggleFilter() {
    var filterOptions = document.getElementById('filterOptions');
    if (filterOptions.style.display === "none" || filterOptions.style.display === "") {
        filterOptions.style.display = "flex";
    } else {
        filterOptions.style.display = "none";
    }
}

document.getElementById('filterBtn').addEventListener('click', toggleFilter);

// for eye icons
document.addEventListener("DOMContentLoaded", function() {
    const togglePassword1 = document.getElementById('togglePassword1');
    const togglePassword2 = document.getElementById('togglePassword2');

    if (togglePassword1 && togglePassword2) {
        togglePassword1.addEventListener('click', function() {
            console.log("Toggle Password 1 clicked");
            toggleIcon(this);
        });

        togglePassword2.addEventListener('click', function() {
            console.log("Toggle Password 2 clicked");
            toggleIcon(this);
        });

        function toggleIcon(element) {
            console.log("Toggling icon for element: ", element);
            if (element.getAttribute('src') === 'images/eyeOpen.svg') {
                element.setAttribute('src', 'images/eyeClosed.svg');
            } else {
                element.setAttribute('src', 'images/eyeOpen.svg');
            }
        }
    } else {
        console.error("Toggle Password elements not found");
    }
});
// eye icons