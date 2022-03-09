export const isStrongPassword = (password) => {
    if (password.length < 6) {
      return false;
    }

    let numCounter = 0;
    let letterCounter = 0;

    for (var i = 0; i < password.length; i++) {
        if (isNaN(passwordString.charAt(i))) {
            letterCounter++;
            continue;
        }
        numCounter++;
    }

    return (letterCounter >= 3 && numCounter >= 3);
}