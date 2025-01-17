// These unit tests can be run with npm run test

import { expect, test } from "vitest";
import {
  checkLoginExpired,
  getDateInFuture,
  isCredentialsCorrect,
  OLD_DATE,
} from ".";

test("Incard as username/password credentials valid.", () => {
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
