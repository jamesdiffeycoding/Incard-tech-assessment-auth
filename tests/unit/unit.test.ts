// ABOUT
// To run these tests use npm run vitest.
// To create a new unit test file, append the file with test.ts.

import { expect, test } from "vitest";
import {
  checkLoginExpired,
  getDateInFuture,
  isCredentialsCorrect,
  OLD_DATE,
} from "../../src/utils/helpers";

test("Incard credentials valid.", () => {
  expect(isCredentialsCorrect({ username: "incard", password: "incard" })).toBe(
    true
  );
});

test("Expired login registers as invalid.", () => {
  expect(checkLoginExpired(OLD_DATE)).toBe(true);
});

test("Expiry dates in future generate and register as valid.", () => {
  expect(checkLoginExpired(getDateInFuture(1, 1))).toBe(false);
});
