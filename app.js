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

// New Favorites Functionality
document.addEventListener('DOMContentLoaded', function () {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Add to favorites
    document.querySelectorAll('.add-to-favorites').forEach(button => {
        button.addEventListener('click', function () {
            const apartment = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: this.dataset.price,
                bedrooms: this.dataset.bedrooms,
                bathrooms: this.dataset.bathrooms,
                zipcode: this.dataset.zipcode
            };

            if (!favorites.some(fav => fav.id === apartment.id)) {
                favorites.push(apartment);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert('Added to favorites');
            } else {
                alert('Already in favorites');
            }
        });
    });

    // Display favorites
    const favoritesList = document.getElementById('favoritesList');
    if (favoritesList) {
        favorites.forEach(apartment => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${apartment.name}</h3>
                <p>Price: ${apartment.price}</p>
                <p>Bedrooms: ${apartment.bedrooms}</p>
                <p>Bathrooms: ${apartment.bathrooms}</p>
                <p>Zip: ${apartment.zipcode}</p>
            `;
            favoritesList.appendChild(li);
        });
    }
});