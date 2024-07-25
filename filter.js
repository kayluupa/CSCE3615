function toggleFilter() {
    var filterOptions = document.getElementById('filterOptions');
    if (filterOptions.style.display === "none" || filterOptions.style.display === "") {
        filterOptions.style.display = "flex";
    } else {
        filterOptions.style.display = "none";
    }
}

//Main function for reading the values of a listing and then displaying only matching listings
function filterResults() {  
    var zipcodeInput = document.getElementById('searchBar').value;
    var priceFilter = document.getElementById('price').value;
    var bedroomsFilter = document.getElementById('bedrooms').value;
    var bathroomsFilter = document.getElementById('bathrooms').value;
    var amenitiesCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var selectedAmenities = Array.from(amenitiesCheckboxes).map(cb => cb.value);
    var ul = document.getElementById("apartmentList");
    var li = ul.getElementsByTagName('li');
    var noResultsMessage = document.getElementById('noResultsMessage');

    let hasResults = false;

    //Creates console logs for each filter criteria
    console.log("Filter criteria:");
    console.log("Zipcode:", zipcodeInput);
    console.log("Price:", priceFilter);
    console.log("Bedrooms:", bedroomsFilter);
    console.log("Bathrooms:", bathroomsFilter);
    console.log("Selected Amenities:", selectedAmenities);

    //All listings are gone through and checked to see if they match the specified filter criteria
    for (var i = 0; i < li.length; i++) {
        var zipcode = li[i].getAttribute('data-zipcode');
        var price = parseInt(li[i].getAttribute('data-price'));
        var bedrooms = li[i].getAttribute('data-bedrooms');
        var bathrooms = li[i].getAttribute('data-bathrooms');
        var amenities = li[i].getAttribute('data-amenities').split(',');

        var matchesZipcode = zipcode === zipcodeInput || !zipcodeInput;
        var matchesPrice = !priceFilter || (priceFilter === "1000" && price < 1000) ||
                           (priceFilter === "2000" && price >= 1000 && price < 2000) ||
                           (priceFilter === "3000" && price >= 2000 && price < 3000) ||
                           (priceFilter === "4000" && price >= 3000);
        var matchesBedrooms = bedrooms === bedroomsFilter || !bedroomsFilter;
        var matchesBathrooms = bathrooms === bathroomsFilter || !bathroomsFilter;
        var matchesAmenities = selectedAmenities.every(amenity => amenities.includes(amenity));

        //Shows a T/F log for criteria matching once moved to var for filtering
        console.log(`Apartment ${i + 1}:`);
        console.log("Zipcode:", zipcode, "Matches:", matchesZipcode);
        console.log("Price:", price, "Matches:", matchesPrice);
        console.log("Bedrooms:", bedrooms, "Matches:", matchesBedrooms);
        console.log("Bathrooms:", bathrooms, "Matches:", matchesBathrooms);
        console.log("Amenities:", amenities, "Matches:", matchesAmenities);

        //All criteria for filtering must match exactly to be displayed on the results page
        if (matchesZipcode && matchesPrice && matchesBedrooms && matchesBathrooms && matchesAmenities) {
            li[i].style.display = "";
            hasResults = true;
        } else {
            li[i].style.display = "none";
        }
    }

    if (hasResults) {
        noResultsMessage.style.display = "none";
    } else {
        noResultsMessage.style.display = "block";
    }
}

//Listeners to update the filterResults() function when the new filter button is clicked
document.getElementById('filterBtn').addEventListener('click', toggleFilter);
document.getElementById('applyFilterBtn').addEventListener('click', filterResults);
document.getElementById('clearFilterBtn').addEventListener('click', clearFilters);
document.getElementById('searchBar').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        filterResults();
    }
});

function clearFilters() {
    document.getElementById('searchBar').value = '';
    document.getElementById('price').value = '';
    document.getElementById('bedrooms').value = '';
    document.getElementById('bathrooms').value = '';
    document.querySelectorAll('input[name="amenities"]:checked').forEach(cb => cb.checked = false);
    filterResults();
}
