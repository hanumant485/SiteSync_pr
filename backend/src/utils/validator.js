const validator = require("validator");

const validate = (userData) => {
    const mandatoryFields = ["firstName", "emailId", "password"];

    const IsAllowed = mandatoryFields.every((k) => Object.keys(userData).includes(k));

    if (!IsAllowed) {
        throw new Error("Missing mandatory fields");
    }

    if (!validator.isEmail(userData.emailId)) {
        throw new Error("Invalid email format");
    }

    // Trim password to remove accidental leading/trailing spaces
    const password = userData.password.trim();

    // Allow any non-whitespace character, but enforce at least:
    // - one lowercase, one uppercase, one digit
    // - one special character from a broad set
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\[\]{}|;:'",.<>/?])[^\s]{8,}$/;

    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*()_+={}[]|;:'\",.<>/? )"
        );
    }

    // Store the trimmed password back (optional, but good practice)
    userData.password = password;
};

module.exports = validate;