// Making the validation of the profile page

// Here is where I assign variables to an element in the html pages

let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title1 = document.getElementById("title1");
let nameError = document.getElementById('name-error');
let emailError = document.getElementById('email-error');
let passwordError = document.getElementById('password-error');
let submitError = doucment.getElementById('submit-error');

// This method is for form validation for the name

function validateName() {
    var name = document.getElementById('name').value;
    if (name.length == 0) {
        nameError.innerHTML = 'Name is required';
        return false;
    }
    if ((name.length > 0) && (name.length < 5)) {
        nameError.innerHTML = 'Name must be at least 5 characters long';
        return false;
    }
    nameError.innerHTML = '';
    return true;
}

// This method is for form validation for the email

function validateEmail() {
    var email = document.getElementById('email').value;
    if (email.length == 0) {
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailError.innerHTML = 'Email Invalid';
        return false;
    }
    emailError.innerHTML = '';
    return true;
}

// This method is for form validation for the password

function validatePassword() {
    var password = document.getElementById('password').value;
    if (password.length == 0) {
        passwordError.innerHTML = 'Password is required';
        return false;
    }
    if ((password.length > 0) && (password.length < 8)) {
        passwordError.innerHTML = 'Password must be at least 8 characters long';
        return false;
    }
    passwordError.innerHTML = '';
    return true;
}

// This method is alert the user that they have successfully signed up, if not errors will occur

function validateForm() {
    if (!validateName() || !validateEmail() || !validatePassword()) {
        submitError.innerHTML = 'Please fix error';
        return false;
    }
    else {
        alert('You have signed up!');
        location.reload();
    }
    return true;
}

// This method is to alert the user that they have submitted their feedback

function submitFeedback() {
    var feedback = document.getElementById("fdback").value;
    if (feedback.trim() === "") {
        alert('Please provide your feedback before submitting.');
        return false;
    }
    else {
        alert('You have submitted your feedback!');
        location.reload();
    }
    return true;
}

// This method is to switch to sign in page ##not working

signinBtn.onclick = function(){
    nameField.style.maxHeight = "0";
    title1.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
}

// This method is to switch to sign up page ##not working

signupBtn.onclick = function(){
    nameField.style.maxHeight = "60px";
    title1.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
}