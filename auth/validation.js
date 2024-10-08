const { body, validationResult } = require("express-validator");

// sign-up errors
const firstNameLengthError = "first name must be between 1-30 characters.";
const firstNameError = "first name must only contain letters.";
const firstNameEmptyError = "must provide a first name.";
const lastNameLengthError = "last name must be between 1-30 characters.";
const lastNameError = "last name must only contain letters.";
const lastNameEmptyError = "must provide a last name.";
const confirmPasswordError = "passwords do not match.";

// join-club errors
const passcodeError = "incorrect passcode.";

// log-in & sign-up errors
const emailLengthError = "email must be between 1-50 characters.";
const emailError = "must provide a valid email.";
const emailEmptyError = "must provide an email.";
const passwordLengthError = "password must be between 8-20 characters.";
const passwordError =
  "password must contain an uppercase letter, lowercase letter, and a number";
const passwordEmptyError = "must provide a password.";

// new message errors
const titleLengthError = "title must be between 1-30 characters.";
const messageLengthError = "message must be between 10-300 characters.";

const validateFormInput = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage(firstNameEmptyError)
    .isLength({ min: 1, max: 30 })
    .withMessage(firstNameLengthError)
    .isAlpha()
    .withMessage(firstNameError),

  body("lastname")
    .trim()
    .notEmpty()
    .withMessage(lastNameEmptyError)
    .isLength({ min: 1, max: 30 })
    .withMessage(lastNameLengthError)
    .isAlpha()
    .withMessage(lastNameError),

  body("email")
    .trim()
    .notEmpty()
    .withMessage(emailEmptyError)
    .isLength({ min: 1, max: 50 })
    .withMessage(emailLengthError)
    .isEmail()
    .withMessage(emailError),

  body("password")
    .trim()
    .notEmpty()
    .withMessage(passwordEmptyError)
    .isLength({ min: 8, max: 20 })
    .withMessage(passwordLengthError)
    .custom((value) => {
      let hasLower = false;
      let hasUpper = false;
      let hasNumber = false;

      for (let i = 0; i < value.length; i++) {
        const letter = value[i];

        // special characters have no effect
        if (/[A-Z]/.test(letter)) {
          hasUpper = true;
        }

        if (/[a-z]/.test(letter)) {
          hasLower = true;
        }

        if (/\d/.test(letter)) {
          hasNumber = true;
        }
      }

      if (!hasLower || !hasUpper || !hasNumber) {
        throw new Error(passwordError);
      }

      return true;
    }),

  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(confirmPasswordError);
      }

      return true;
    }),
];

const validateJoinFormInput = [
  body("passcode")
    .equals(process.env.SECRETPASSCODE)
    .withMessage(passcodeError),
];

const validateLoginFormInput = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage(emailEmptyError)
    .isLength({ min: 1, max: 50 })
    .withMessage(emailLengthError)
    .isEmail()
    .withMessage(emailError),

  body("password")
    .trim()
    .notEmpty()
    .withMessage(passwordEmptyError)
    .isLength({ min: 8, max: 20 })
    .withMessage(passwordLengthError)
    .custom((value) => {
      let hasLower = false;
      let hasUpper = false;
      let hasNumber = false;

      for (let i = 0; i < value.length; i++) {
        const letter = value[i];

        // special characters have no effect
        if (/[A-Z]/.test(letter)) {
          hasUpper = true;
        }

        if (/[a-z]/.test(letter)) {
          hasLower = true;
        }

        if (/\d/.test(letter)) {
          hasNumber = true;
        }
      }

      if (!hasLower || !hasUpper || !hasNumber) {
        throw new Error(passwordError);
      }

      return true;
    }),
];

const validateMessageFormInput = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(titleLengthError),

  body("message")
    .trim()
    .isLength({ min: 10, max: 300 })
    .withMessage(messageLengthError),
];

module.exports = {
  validateFormInput,
  validationResult,
  validateJoinFormInput,
  validateLoginFormInput,
  validateMessageFormInput,
};
