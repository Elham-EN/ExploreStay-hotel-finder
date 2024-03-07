import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

// When receive request for register endpoint, this validator will perform
// input validation check (custom middleware)
const userRegistrationValidation = [
  body("firstname")
    .notEmpty()
    .withMessage("First name is required")
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
    .withMessage("First name must be alphabetic"),
  body("lastname")
    .notEmpty()
    .withMessage("Last name is required")
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
    .withMessage("Last name must be alphabetic"),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password with 6 or more characters requried"),
  function inputValidator(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    next();
  },
];

export default userRegistrationValidation;
