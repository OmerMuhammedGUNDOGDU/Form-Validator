const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small"); // Error mesajlarına ulaştık
  small.innerText = message; // Error mesajlarının görünmesini sağladık
}

// Show input success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
  // return re.test(String(email).toLowerCase()); // Girilen tüm karakterleri küçüğe çevirir
}

// Check Required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    // console.log(input.value);
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length // Karakter uzunluklarına min-max değerleri girildi
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1); // "input id" ile işlem yapılacak id seçildi. "charAt(0)" ile 1. indekste yer alan karakter seçildi ve bu karakter "toUpperCase" ile büyütüldü "+ input.id.slice(1)" ile 2. indeksten itibaren kalan karakterleri ekledik
}

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(password2.value);

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15); // min. = 3 , max = 21 karakter olmalı
  checkLength(password, 6, 15); // min. = 6 , max = 15 karakter olmalı
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
