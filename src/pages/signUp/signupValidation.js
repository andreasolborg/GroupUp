/**
 * Checks if password contains at least 3 numbers and 3 non-numbers
 * 
 * @param {string} password 
 * @returns A boolean value that indidates whether password is considered strong.
 */
export const isStrongPassword = (password) => {
    if (password.length < 6) {
        return false;
    }

    let numCounter = 0;
    let letterCounter = 0;

    for (var i = 0; i < password.length; i++) {
        if (isNaN(password.charAt(i))) {
            letterCounter++;
            continue;
        }
        numCounter++;
    }

    return (letterCounter >= 3 && numCounter >= 3);
}


/**
 * Checks if email matches the format: "personal_info@domain" as described by https://www.w3resource.com/javascript/form/email-validation.php.
 * 
 * @param {string} email 
 * @returns A boolean value that indicated whether string is valid email.
 */
export const isValidEmail = (email) => {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return (emailRegex.test(email));
}


/**
 * Checks if string only contains upper and lowercase letters from a-å.
 * 
 * @param {string} string 
 * @returns A boolean value that indicates whether string matches criteria.
 */
export const isValidName = (string) => {
    var letters = /^[A-Za-zæøåÆØÅ]+$/;

    return letters.test(string);
}

/**
 * Checks if int is at least 18.
 * 
 * @param {int} age 
 * @returns A boolean value indicating whether age is at least 18.
 */
export const isAdult = (age) => {
    return (age >= 18);
}