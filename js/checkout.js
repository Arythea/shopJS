// Get the input fields
var password = document.querySelector(".password");
var phone = document.querySelector('.phone');
var firstName = document.querySelector('.name');
var lastName = document.querySelector('input[placeholder="Last Name"]');
var email = document.querySelector('input[placeholder="Email"]');
var address = document.querySelector('input[placeholder="Address"]');
var sendButton = document.querySelector('button[type=submit]');

// Get the error elements
var errorPassword = document.getElementById("errorPassword");
var errorName = document.getElementById('errorName');  
var errorPhone = document.getElementById('errorPhone');

// Validate vars
var vFirstName = false;
var vLastName = false;
var vEmail = false;
var vPassword = false;
var vAddress = false;
var vPhone = false;

// Exercise 6
function validate() {
    // Validate fields entered by the user: name, phone, password, and email
    if(vFirstName && vLastName && vEmail && vPassword && vAddress && vPhone){
        // some code...
        this.event.preventDefault();
        errorSendButton.style.color = "green";
        errorSendButton.style.display = "block";
        errorSendButton.innerHTML = "Completed";
    }else{
        this.event.preventDefault();
        errorSendButton.style.color = "red";
        errorSendButton.style.display = "block";
        errorSendButton.innerHTML = "Check form errors.";
        firstName.onblur();
        lastName.onblur();
        email.onblur();
        password.onblur();
        address.onblur();
        phone.onblur();
    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    // Add some content to DOM and change some styles
    errorName.innerHTML = "At least 3 characters. Numbers are not valid.";
    errorName.style.color = "red";
    errorLastName = lastName.parentElement.appendChild(document.createElement("p"));
    errorLastName.style.display = "none";
    errorLastName.innerHTML = "At least 3 characters. Numbers are not valid.";
    errorLastName.style.color = "red";
    errorEmail = email.parentElement.appendChild(document.createElement("p"));
    errorEmail.style.display = "none";
    errorEmail.innerHTML = "Enter a valid email.";
    errorEmail.style.color = "red";
    errorPassword.innerHTML = "Only letters and numbers. At least 3 characters (one of them a letter and one of them a number).";
    errorPassword.style.color = "red";
    errorAddress = address.parentElement.appendChild(document.createElement("p"));
    errorAddress.style.display = "none";
    errorAddress.innerHTML = "At least 3 characters.";
    errorAddress.style.color = "red";
    errorPhone.innerHTML = "At least 3 characters. Only numbers are valid.";
    errorPhone.style.color = "red";
    errorSendButton = sendButton.parentElement.appendChild(document.createElement("p"));
    errorSendButton.style.display = "none";

    /**** VALIDATIONS ****/
    // NAME
    firstName.onblur = function(){
        if ( /^[a-zA-Z\s\.]{3,}$/.test(firstName.value) ) {
            vFirstName = true;
            firstName.style.borderColor = "black";
            errorName.style.display = "none";
        } else {
            vFirstName = true;
            firstName.style.borderColor = "red";
            errorName.style.display = "block";
        }
    }
    // LAST NAME
    lastName.onblur = function(){
        if ( /^[a-zA-Z\s\.]{3,}$/.test(lastName.value) ) {
            vLastName = true;
            lastName.style.borderColor = "black";
            errorLastName.style.display = "none";
        } else {
            vLastName = false;
            lastName.style.borderColor = "red";
            errorLastName.style.display = "block";
        }
    }
    // EMAIL
    email.onblur = function(){
        if ( /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email.value) ) {
            vEmail = true;
            email.style.borderColor = "black";
            errorEmail.style.display = "none";
        } else {
            vEmail = false;
            email.style.borderColor = "red";
            errorEmail.style.display = "block";
        }
    }
    // PASSWORD
    password.onblur = function(){
        if ( /^(?=.*[0-9])(?=.*[a-z]).{3,8}$/.test(password.value) ) {
            vPassword = true;
            password.style.borderColor = "black";
            errorPassword.style.display = "none";
        } else {
            vPassword = false;
            password.style.borderColor = "red";
            errorPassword.style.display = "block";
        }
    }
    // ADDRESS
    address.onblur = function(){
        if ( /^[a-zA-Z0-9\s\.]{3,}$/.test(address.value) ) {
            vAddress = true;
            address.style.borderColor = "black";
            errorAddress.style.display = "none";
        } else {
            vAddress = false;
            address.style.borderColor = "red";
            errorAddress.style.display = "block";
        }
    }
    // PHONE
    phone.onblur = function(){
        if ( /^[0-9\s\.]{3,}$/.test(phone.value) ) {
            vPhone = true;
            phone.style.borderColor = "black";
            errorPhone.style.display = "none";
        } else {
            vPhone = false;
            phone.style.borderColor = "red";
            errorPhone.style.display = "block";
        }
    }
});