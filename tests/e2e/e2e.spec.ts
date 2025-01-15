// ABOUT
// To run these tests, run the dev server (npm run dev) and then run the tests (npm run pwt-ui).
// To create a new e2e test file, append the file with spec.ts.

import { test, expect } from "@playwright/test";
import {
  EXPIRY_MINUTES,
  EXPIRY_SECONDS,
  REFRESH_FREQUENCY_IN_MS,
} from "@/utils";

const SERVER = "http://localhost:3000";
const EXPIRY_MINUTES_IN_MS = EXPIRY_MINUTES * 60 * 1000;
const EXPIRY_SECONDS_IN_MS = EXPIRY_SECONDS * 1000;
const EXPIRY_IN_MS = EXPIRY_MINUTES_IN_MS + EXPIRY_SECONDS_IN_MS;

test("Can login and redirects to /home", async ({ page }) => {
  await page.goto(SERVER);
  const usernameInput = page.getByLabel("username");
  await usernameInput.fill("incard");
  const passwordInput = page.getByLabel("password");
  await passwordInput.fill("incard");
  const submitButton = page.getByRole("button", { name: "Log in" });
  await submitButton.click();
  await expect(page).toHaveURL(SERVER + "/home");
});

test("Home page redirects to login when not logged in", async ({ page }) => {
  await page.goto(SERVER);
  await expect(page).toHaveURL(SERVER + "/");
});

test("Session remains until expiration then redirects", async ({ page }) => {
  await page.goto(SERVER);
  const username = page.getByLabel("username");
  await username.fill("incard");
  const password = page.getByLabel("password");
  await password.fill("incard");
  const submitButton = page.getByRole("button", { name: "Log in" });
  await submitButton.click();
  await expect(page).toHaveURL(SERVER + "/home");
  await page.reload(); // reload the page to ensure session persistence
  await page.waitForTimeout(EXPIRY_IN_MS - 1); // check that it doesn't redirect before expiry
  await expect(page).toHaveURL(SERVER + "/home");
  await page.waitForTimeout(2 * REFRESH_FREQUENCY_IN_MS); // wait 2 refresh cycles and expect a redirect back to the login page
  await expect(page).toHaveURL(SERVER + "/");
});
