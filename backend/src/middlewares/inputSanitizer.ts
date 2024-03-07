import { Request, Response, NextFunction } from "express";

/**
 * Sanitizes specific input fields of a request body.
 * - Converts firstname, lastname, and email fields to
 *  lowercase and trims spaces.
 *
 * @param req The Express request object
 * @param res The Express response object
 * @param next The next middleware function in the stack
 */
function inputSanitize(req: Request, res: Response, next: NextFunction) {
  console.log("inputSanitize Middleware function");
  // Define a list of fields to sanitize
  const fieldsToSanitize = ["firstname", "lastname", "email"];
  fieldsToSanitize.forEach((field) => {
    // check if the field exists in the body request
    if (req.body[field] && typeof req.body[field] === "string") {
      // trim spaces and convert to lowercases
      req.body[field] = req.body[field].trim().toLowerCase();
    }
  });
  next();
}

export default inputSanitize;
