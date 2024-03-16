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
