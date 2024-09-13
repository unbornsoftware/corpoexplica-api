function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateBirthdate(birthdate){
    const date = newDate(birthdate);
    return !isNaN(date.getTime());
}

module.exports = {
    validateEmail,
    validateBirthdate
}

