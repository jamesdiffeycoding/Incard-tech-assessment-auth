/* HOW TO RUN THESE TESTS
To run these tests (command: npm pwt-ui)
you also need the development server running (command: npm run dev).
*/

import { test, expect } from "@playwright/test";
import {
  EXPIRY_MINUTES,
  EXPIRY_SECONDS,
  REFRESH_FREQUENCY_IN_MS,
} from "@/utils/helpers";

const devServer = "http://localhost:3000";
const EXPIRY_MINUTES_IN_MS = EXPIRY_MINUTES * 60 * 1000;
const EXPIRY_SECONDS_IN_MS = EXPIRY_SECONDS * 1000;
const EXPIRY_IN_MS = EXPIRY_MINUTES_IN_MS + EXPIRY_SECONDS_IN_MS;

test("Home page redirects to /login", async ({ page }) => {
  await page.goto(devServer);
  await expect(page).toHaveURL(devServer + "/login");
});

test("Can login and redirects to /home", async ({ page }) => {
  await page.goto(devServer);
  const usernameInput = page.getByLabel("username");
  await usernameInput.fill("incard");
  const passwordInput = page.getByLabel("password");
  await passwordInput.fill("incard");
  const submitButton = page.getByText("submit");
  await submitButton.click();
  await expect(page).toHaveURL(devServer + "/home");
});

test("Session remains until expiration then redirects", async ({ page }) => {
  await page.goto(devServer);
  const username = page.getByLabel("username");
  await username.fill("incard");
  const password = page.getByLabel("password");
  await password.fill("incard");
  const submit = page.getByText("submit");
  await submit.click();
  await expect(page).toHaveURL(devServer + "/home");
  await page.reload(); // reload the page to ensure session persistence
  await page.waitForTimeout(EXPIRY_IN_MS - 1); // check that it doesn't redirect before expiry
  await expect(page).toHaveURL(devServer + "/home");
  await page.waitForTimeout(2 * REFRESH_FREQUENCY_IN_MS); // wait 2 refresh cycles and expect a redirect
  await expect(page).toHaveURL(devServer + "/login");
});
