function filterResults() {
    var zipcodeInput = document.getElementById('searchBar').value;
    var priceFilter = document.getElementById('price').value;
    var bedroomsFilter = document.getElementById('bedrooms').value;
    var bathroomsFilter = document.getElementById('bathrooms').value;
    var ul = document.getElementById("apartmentList");
    var li = ul.getElementsByTagName('li');

    for (var i = 0; i < li.length; i++) {
        var zipcode = li[i].getAttribute('data-zipcode');
        var price = parseInt(li[i].getAttribute('data-price')); // Ensure price is an integer
        var bedrooms = li[i].getAttribute('data-bedrooms');
        var bathrooms = li[i].getAttribute('data-bathrooms');

        var matchesZipcode = zipcode === zipcodeInput || !zipcodeInput;
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
