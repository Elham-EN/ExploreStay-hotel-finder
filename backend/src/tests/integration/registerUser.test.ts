import express, { Express, Request, Response } from "express";
import request from "supertest";
import inputSanitize from "../../middlewares/inputSanitizer";
import userRegistrationValidation from "../../middlewares/inputValidator";

describe("User Registration", () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.post("/test/sanitize", inputSanitize, (req: Request, res: Response) => {
      res.status(200).json(req.body); // Echo the body back for testing
    });
    app.post(
      "/test/validate",
      userRegistrationValidation,
      (req: Request, res: Response) => {
        res.status(200).json(req.body); // Echo the body back for testing
      }
    );
  });

  it("should fail registration due to invalid email", async () => {
    const userData = {
      firstname: "John",
      lastname: "Doe",
      email: "notanemail",
      password: "123456",
    };

    const response = await request(app).post("/test/validate").send(userData);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Email is required",
        }),
      ])
    );
  });

  it("should lowercase firstname, lastname and email", async () => {
    const mockData = {
      firstname: "John",
      lastname: "Doe",
      email: "TEST@EMAIL.COM",
    };
    const response = await request(app).post("/test/sanitize").send(mockData);
    expect(response.statusCode).toBe(200);
    expect(response.body.firstname).toBe("john");
    expect(response.body.lastname).toBe("doe");
    expect(response.body.email).toBe("test@email.com");
  });
});
