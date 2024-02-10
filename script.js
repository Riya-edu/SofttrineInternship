document.getElementById('contactForm').addEventListener('Submit', function(event) {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('number').value.trim();
    const dob = document.getElementById('dob').value.trim();

    clearErrors();

    let isValid = true;

    // Validate Name
    if (name === '') {
        displayError('name', 'Name is required');
        isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(name)) {
        displayError('name', 'Name must contain only letters');
        isValid = false;
    }

    // Validate Email
    if (email === '') {
        displayError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        displayError('email', 'Invalid email address');
        isValid = false;
    }

    // Validate Phone
    if (phone === '') {
        displayError('phone', 'Phone number is required');
        isValid = false;
    } else if (!/^\+91\d{10}$/.test(phone)) {
        displayError('phone', 'Invalid phone number');
        isValid = false;
    }

    // Validate DOB
    if (dob === '') {
        displayError('dob', 'Date of Birth is required');
        isValid = false;
    } else if (!isValidDOB(dob)) {
        displayError('dob', 'Must be 18 years or older');
        isValid = false;
    }

    if (isValid) {
        // Submit the form
        alert('Form submitted successfully');
        document.getElementById('contactForm').reset();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(number) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
}

function isValidDOB(dob) {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const minDOBDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    return dobDate <= minDOBDate;
}

function displayError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    errorElement.textContent = message;
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(error => error.textContent = '');
}
