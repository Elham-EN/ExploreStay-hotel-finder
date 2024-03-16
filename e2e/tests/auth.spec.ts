import { test, expect } from "@playwright/test";

const FRONTEND_URL: string = "http://localhost:5173/";

test("should allow the user to sign in", async function ({ page }) {
  await page.goto(FRONTEND_URL);
  // Get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();
  // Assertion: Check if we are in the Sign in page
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  // Provide form input data
  await page.locator("[name=email]").fill("tommy@hotmail.com");
  await page.locator("[name=password]").fill("soran123");
  // Click the login button to sign in
  await page.getByRole("button", { name: "Login" }).click();
  // Assertion: check if user is signed in successfully
  await expect(page.getByText("Sign in Succcessfull")).toBeVisible();
});

test("should allow the user to register", async function ({ page }) {
  const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 10000}@test.com`;
  await page.goto(FRONTEND_URL);
  // Get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();
  // Assertion: Check if we are in the Sign in page
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  // Click the link "Sign up here"
  await page.getByRole("link", { name: "Sign up here" }).click();
  // Assertion: check if we are in the Sign up page
  await expect(page.getByRole("heading", { name: "Create an Account" })).toBeVisible();
  // Provide form input data
  await page.locator("[name=firstname]").fill("larry");
  await page.locator("[name=lastname]").fill("page");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("soran123");
  await page.locator("[name=confirmPassword]").fill("soran123");
  // Click the button to sign up the account
  await page.getByRole("button", { name: "Create Account" }).click();
  // Assertion: check if user is signed up successfully
  await expect(page.getByText("User registered successfully")).toBeVisible();
});
