// Array of special characters to be included in password
const specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
const upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

let charset = [];

let pwdConfig = {
  length: 8,
  chars: {
      lowerCase: false,
      upperCase: false,
      number: false,
      special: false,
  }
}

// Function to prompt user for password options
function getPasswordOptions() {

  // do while loop to ask multiple times the same set of questions until at least one is true
  do {
      charset = []

      pwdConfig.chars.lowerCase = confirm("Do you want any lower case characters in your password?");
      if (pwdConfig.chars.lowerCase) {
        charset.concat(lowerCasedCharacters)
      }

      pwdConfig.chars.upperCase = confirm("Do you want any upper case characters in your password?");
      if (pwdConfig.chars.upperCase) {
        charset.concat(upperCasedCharacters)
      }

      pwdConfig.chars.number = confirm("Do you want any numbers in your password?");
      if (pwdConfig.chars.number) {
        charset.concat(numericCharacters)
      }

      pwdConfig.chars.special = confirm("Do you want any special characters in your password?");
      if (pwdConfig.chars.special) {
        charset.concat(specialCharacters)
      }

  } while (Object.values(pwdConfig.chars).filter((c) => c === true).length < 1);

  arrayLength:
  while (true) {

    let length = prompt("How long do you want your password to be?");
    
    if (Number(length) >= 8 && Number(length) <= 128) {
      pwdConfig.length = Number(length);
      break arrayLength;
    } else {
      alert("Please insert a number between 8 and 128.")
    }

  }

}

// Function for getting a random element from an array
function getRandom(arr) {

}

// Function to generate password with user input
function generatePassword() {
  getPasswordOptions()
}

// Get references to the #generate element
const generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);