// Home link shortcut function
function homePageShortCut() {
    const homeLink = document.querySelector('.home-link a');
    if (!homeLink) {
        return;
    }
    // Add event listener for 'keydown'
    document.addEventListener('keydown', (event) => {
        // Check if 'Alt' key and 'H' key are pressed simultaneously
        if (event.altKey && event.key.toLowerCase() === 'h') {
            event.preventDefault();
            homeLink.click();
        }
    });
}
homePageShortCut();

// Offcanvas dismiss button shortcut function
function offcanvasDismissShortcut() {
    // Find all buttons with the data-bs-dismiss="offcanvas" attribute
    const offcanvasButtons = document.querySelectorAll('[data-bs-dismiss="offcanvas"]');
    // Check if any such buttons exist in the DOM
    if (offcanvasButtons.length === 0) {
        return; 
    }
    // Function to handle keydown event
    function handleKeyDown(event) {
        // Check if 'Alt' key and 'O' key are pressed simultaneously
        if (event.altKey && event.key.toLowerCase() === 'o') {
            event.preventDefault(); // Prevent the default action, if any
            // Loop through all the offcanvas buttons and trigger click for each one
            offcanvasButtons.forEach(button => {
                button.click(); // Trigger click for each button
            });
        }
    }
    // Add event listener for 'keydown'
    document.addEventListener('keydown', handleKeyDown);
}
offcanvasDismissShortcut();

// right navbar navigations
function initRightSideBarNavigation() {
    const rightSidebar = document.querySelector('.right-sidebar')
    if (!rightSidebar || !rightSidebar.querySelectorAll('.right-sidebar a, .right-sidebar button').length) {
        return;
    }
    // Get all focusable elements within the sidebar
    const focusableElements = document.querySelectorAll('.right-sidebar a, .right-sidebar button');
    // Convert NodeList to Array to easily manage indices
    const elements = Array.from(focusableElements);
    // Track current focused element index
    let currentIndex = 0;
    // Function to change button classes for the active element
    function updateButtonClass(index) {
        // Remove btn-success and btn-dark from all elements, and add back btn btn-success or btn-dark as needed
        elements.forEach(el => {
            el.classList.remove('btn-danger');
            el.classList.remove('btn-success', 'btn-dark'); // Remove any styling class
            if (el !== elements[index]) {
                // Optionally add default class back (btn-success or btn-dark based on original requirement)
                el.classList.add('btn', 'btn-success');  // Replace with the desired default class if needed
            }
        });
        // Add btn btn-danger to the currently focused element
        elements[index].classList.add('btn', 'btn-danger');
    }
    // Initial focus on the first element
    elements[currentIndex].focus();
    updateButtonClass(currentIndex);  // Set initial active button class
    // Add event listener to the document for arrow keys
    document.addEventListener('keydown', function (event) {
        // Prevent default behavior for arrow keys
        if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            event.preventDefault();
        }
        // Handle Arrow Down (Move to the next element in the list)
        if (event.key === 'ArrowDown') {
            currentIndex = (currentIndex + 1) % elements.length;
            elements[currentIndex].focus();
            updateButtonClass(currentIndex);
        }
        // Handle Arrow Up (Move to the previous element in the list)
        if (event.key === 'ArrowUp') {
            currentIndex = (currentIndex - 1 + elements.length) % elements.length;
            elements[currentIndex].focus();
            updateButtonClass(currentIndex);
        }
        // Handle Arrow Right (Move to the next element in the list)
        if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % elements.length;
            elements[currentIndex].focus();
            updateButtonClass(currentIndex);
        }
        // Handle Arrow Left (Move to the previous element in the list)
        if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + elements.length) % elements.length;
            elements[currentIndex].focus();
            updateButtonClass(currentIndex);
        }
    });
}
initRightSideBarNavigation();

//  details navigations 
function initDetailsNavigation() {
    // Check if the <div class="details-container"> exists in the DOM
    const detailsContainer = document.querySelector('.details-container');

    // Exit if detailsContainer or details elements are not present
    if (!detailsContainer || !detailsContainer.querySelectorAll('details').length) {
        return;
    }

    const detailsElements = detailsContainer.querySelectorAll('details');
    let currentIndex = 0;

    // Set initial focus on the first details element's summary
    detailsElements[currentIndex].querySelector('summary').focus();

    function updateFocus(index) {
        if (index >= 0 && index < detailsElements.length) {
            currentIndex = index;
            detailsElements[currentIndex].querySelector('summary').focus();
        }
    }

    function isAnyDetailsOpen() {
        return Array.from(detailsElements).some(details => details.open);
    }

    function toggleActiveClass(currentDetails, isOpen) {
        // Remove active class from all details
        detailsElements.forEach(details => details.classList.remove('active'));

        // Add active class only to the currently opened details if open
        if (isOpen) {
            currentDetails.classList.add('active');
        }
    }

    document.addEventListener('keydown', (e) => {
        // Only handle arrow keys for focus movement if no details is open
        if (!isAnyDetailsOpen()) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                updateFocus((currentIndex + 1) % detailsElements.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                updateFocus((currentIndex - 1 + detailsElements.length) % detailsElements.length);
            }
        }

        // Handle Enter key to toggle details open/close
        if (e.key === 'Enter') {
            e.preventDefault();
            const currentDetails = detailsElements[currentIndex];

            // Toggle the current details element
            const isOpen = !currentDetails.open;
            detailsElements.forEach((details) => {
                details.open = false; // Close all details
                details.classList.remove('active'); // Remove active class
            });
            currentDetails.open = isOpen;  // Toggle the current details
            toggleActiveClass(currentDetails, isOpen); // Add/remove active class
        }
    });
}
initDetailsNavigation();



