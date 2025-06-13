document.addEventListener('DOMContentLoaded', () => {
    // Dropdown functionality for "Habitaciones"
    const dropdownButton = document.getElementById('habitaciones-dropdown');
    const dropdownContainer = dropdownButton.closest('.dropdown-container');

    dropdownButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent click from bubbling to window and closing immediately
        dropdownContainer.classList.toggle('active');
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (!dropdownContainer.contains(event.target)) {
            dropdownContainer.classList.remove('active');
        }
    });

    // Basic date picker placeholder functionality (no actual date picker library)
    window.openDatePicker = (type) => {
        alert(`You clicked to open the date picker for ${type}. In a real application, a calendar widget would appear here.`);
        // Here you would integrate a date picker library like Flatpickr, jQuery UI Datepicker, etc.
    };

    // Sidebar functions (Moved to global scope for onclick attributes in HTML)
    // This is a common pattern for simple sidebar toggles when using inline `onclick`
});

/* Sidebar functions - declared globally for onclick attributes in HTML */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px"; // Adjust width as needed
    document.getElementById("main").style.marginLeft = "250px";
    // Optional: Add a class to #main for blur effect
    // document.getElementById("main").classList.add("main-content-blur");
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    // Optional: Remove blur class
    // document.getElementById("main").classList.remove("main-content-blur");
}

