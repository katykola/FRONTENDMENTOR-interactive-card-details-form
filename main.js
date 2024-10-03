let inputs = document.querySelectorAll('input');
inputs = Array.from(inputs);

// Cardholder Name
const cardNameInput = document.getElementById('cardholderName');
const cardNameDisplay = document.querySelector('[data-card-name]');
const messageNameInvalid = document.querySelector('.name-invalid');

// Card Number
const cardNumberInput = document.getElementById('cardNumber');
const cardNumberDisplay = document.querySelector('[data-card-number]');
const messageCardNumberEmpty = document.querySelector('.card-number-empty');
const messageCardNumberInvalid = document.querySelector('.card-number-invalid');

// Name: Vyplnění pole na kartě z inputu
cardNameInput.addEventListener('input', function () {
    cardNameDisplay.textContent = cardNameInput.value;
});


// Card Number: Vyplnění pole na kartě z inputu
cardNumberInput.addEventListener('input', function () {
    
    // Remove all non-digit characters
    let input = cardNumberInput.value.replace(/\D/g, '');// Replace \D(non-digit) s flag g(all, ne jen prvni) za '', tzn. empty string
    
    // Limit the length to 16 digits
    if (input.length > 16) {
        input = input.substring(0, 16); // Vytvoří string se startIndex 0 a endIndex 16, ale ne včetně, tedy 0 až 15
    }
    
    // Format the input to include spaces every 4 digits
    input = input.replace(/(\d{4})(?=\d)/g, '$1 '); // (group 4 digits)(group lookalike group, vlož mezeru za prvni skupinu)
    
    // Update the input value
    cardNumberInput.value = input;
    cardNumberDisplay.textContent = cardNumberInput.value;
});


// Date
const monthExpInput = document.getElementById('month');
const monthExpDisplay = document.querySelector('[data-card-month]');
const yearExpInput = document.getElementById('year');
const yearExpDisplay = document.querySelector('[data-card-year]');
const messageDateEmpty = document.querySelector('.date-blank');
const messageDateInvalid = document.querySelector('.date-invalid');

monthExpInput.addEventListener('input', function () {
    
    // Remove all non-digit characters
    let input = monthExpInput.value.replace(/\D/g, '');
    
    // Limit the length to 2 digits
    if (input.length > 2) {
        input = input.substring(0, 2); 
    }
    
    // Update the input value
    monthExpInput.value = input;
    monthExpDisplay.textContent = monthExpInput.value;
});

yearExpInput.addEventListener('input', function () {
    
    // Remove all non-digit characters
    let input = yearExpInput.value.replace(/\D/g, '');
    
    // Limit the length to 2 digits
    if (input.length > 2) {
        input = input.substring(0, 2); 
    }
    
    // Update the input value
    yearExpInput.value = input;
    yearExpDisplay.textContent = yearExpInput.value;
});

// CVC

const cvcNumberInput = document.getElementById('cvc');
const cvcDisplay = document.querySelector('[data-card-cvc]');
const messageCvcEmpty = document.querySelector('.cvc-blank');
const messageCvcInvalid = document.querySelector('.cvc-invalid');


cvcNumberInput.addEventListener('input', function () {
    
    // Remove all non-digit characters
    let input = cvcNumberInput.value.replace(/\D/g, '');
    
    // Limit the length to 2 digits
    if (input.length > 3) {
        input = input.substring(0, 3); 
    }
    
    // Update the input value
    cvcNumberInput.value = input;
    cvcDisplay.textContent = cvcNumberInput.value;
});



// Validation

const button = document.querySelector('button');

button.addEventListener('click', function(){

    isValidCardholderName();
    isValidCardNumber();
    isValidMonth();
    isValidYear();
    isInFuture();
    isCvcValid();

})


// Zjisti, zda je jmeno prazdne
function isValidCardholderName(){
    if(cardholderName.value === ''){
        cardholderName.classList.add('invalid-input');
        messageNameInvalid.style.display = 'inherit';

    }else{
        cardholderName.classList.remove('invalid-input');
        messageNameInvalid.style.display = 'none';
    }
}

// Zjisti, jestli je cislo karty prazdne nebo nevalidni
function isValidCardNumber(){ 
    if(cardNumberInput.value === ''){
        cardNumberInput.classList.add('invalid-input');
        messageCardNumberEmpty.style.display = 'inherit';
        messageCardNumberInvalid.style.display = 'none';
    }else if(cardNumberInput.value.length < 19){
        cardNumberInput.classList.add('invalid-input');
        messageCardNumberInvalid.style.display = 'inherit';
        messageCardNumberEmpty.style.display = 'none';
    }else{
        cardNumberInput.classList.remove('invalid-input');
        messageCardNumberInvalid.style.display = 'none';
        messageCardNumberEmpty.style.display = 'none';
    }
}

// Zjisti, zda je month prazdny nebo nevalidni

function isValidMonth(){
    const monthNumber = parseInt(monthExpInput.value);
    if(monthExpInput.value === ''){
        messageDateInvalid.style.display = 'none';
        messageDateEmpty.style.display = 'inherit';
    }else if(monthExpInput.value.length < 2){
        messageDateEmpty.style.display = 'none';
        messageDateInvalid.style.display = 'inherit';
    }else if(monthNumber < 1 || monthNumber > 12){
        messageDateEmpty.style.display = 'none';
        messageDateInvalid.style.display = 'inherit';
    }else{
        messageDateInvalid.style.display = 'none';
        messageDateEmpty.style = 'none'
    }
}

// Zjisti, zda je year prazdny nebo nevalidni

function isValidYear(){
    const yearNumber = parseInt(monthExpInput.value);
    if(yearExpInput.value === ''){
        messageDateEmpty.style.display = 'inherit';
    }else{
        messageDateEmpty.style = 'none'
    }
}

// Zjisti, zda je datum expirace v budoucnosti

function isInFuture(){

    let month = parseInt(monthExpInput.value);
    let year = parseInt(yearExpInput.value);
    let currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
    let currentMonth = new Date().getMonth() + 1; // Get current month (0-based index)

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        console.log("The expiration date must be in the future.");
        messageDateInvalid.style.display = 'inherit';
    } else {
        console.log("The expiration date is valid.");
        messageDateInvalid.style.display = 'none';
    }
}

// Zjisti, zda je CVC prazdne nebo nevalidni

function isCvcValid(){
    if(cvcNumberInput.value === ''){
        messageCvcInvalid.style.display = 'none';
        messageCvcEmpty.style.display = 'inherit';
    }else if(cvcNumberInput.value.length < 3){
        messageCvcEmpty.style.display = 'none';
        messageCvcInvalid.style.display = 'inherit';
    }else{
        messageCvcInvalid.style.display = 'none';
        messageCvcEmpty.style = 'none'
    }
}