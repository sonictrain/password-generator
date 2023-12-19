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

let charSet = [];

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
    charSet = [];

    pwdConfig.chars.lowerCase = confirm("Do you want any lower case characters in your password?");
    if (pwdConfig.chars.lowerCase) {
      lowerCasedCharacters.map((c) => charSet.push(c));
    }

    pwdConfig.chars.upperCase = confirm("Do you want any upper case characters in your password?");
    if (pwdConfig.chars.upperCase) {
      upperCasedCharacters.map((c) => charSet.push(c));
    }

    pwdConfig.chars.number = confirm("Do you want any numbers in your password?");
    if (pwdConfig.chars.number) {
      numericCharacters.map((c) => charSet.push(c));
    }

    pwdConfig.chars.special = confirm("Do you want any special characters in your password?");
    if (pwdConfig.chars.special) {
      specialCharacters.map((c) => charSet.push(c));
    }

  } while (Object.values(pwdConfig.chars).filter((c) => c === true).length < 1);

  arrayLengthPrompt:
  while (true) {

    let length = Number(prompt("How long do you want your password to be?"));

    if (!isNaN(length) && length >= 8 && length <= 128) {
      pwdConfig.length = length;
      break arrayLengthPrompt; // break the array if the user's response is valid.
    } else {
      alert("Please insert a valid number between 8 and 128:");
    }

  }

}

// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Fisher-Yates sorting algorithm from
// https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
function shuffle(arr) { 
  for (let i = arr.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [arr[i], arr[j]] = [arr[j], arr[i]]; 
  } 
  return arr; 
};

// Function to generate password with user input
function generatePassword() {
  getPasswordOptions()
    
  // create empty array according to the length choosen
  // by the user and fill every element with empty strings
  let arrayPwd = new Array(pwdConfig.length - Object.values(pwdConfig.chars).filter((c) => c === true).length).fill('');

  // run getRandom function on every element of the array using a map
  arrayPwd.map((c) => arrayPwd[arrayPwd.indexOf(c)] = getRandom(charSet));

  if (pwdConfig.chars.lowerCase) {
    arrayPwd.push(getRandom(lowerCasedCharacters));
  }

  if (pwdConfig.chars.upperCase) {
    arrayPwd.push(getRandom(upperCasedCharacters));
  }

  if (pwdConfig.chars.number) {
    arrayPwd.push(getRandom(numericCharacters));
  }

  if (pwdConfig.chars.special) {
    arrayPwd.push(getRandom(specialCharacters));
  }

  arrayPwd = shuffle(arrayPwd);

  // join the array inn a string a return
  return arrayPwd.join('');
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