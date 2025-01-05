interface Credentials {
  username: string;
  password: string;
}

export function getFutureDate_MinsAndSecs(minutes: number, seconds: number) {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + minutes);
  expiryDate.setSeconds(expiryDate.getSeconds() + seconds);
  return expiryDate.toString();
}

export function isCredentialsCorrect(credentials: Credentials) {
  return credentials.username === "incard" && credentials.password === "incard";
}

export function isLoginExpired(loginExpiry: string) {
  const msNow = Date.now(); // Compare times in milliseconds since 1970
  const msExpiry = new Date(loginExpiry).getTime();
  return msNow > msExpiry;
}

export const LOGIN_EXPIRY_KEY = "login-expiry"; // local storage key

export const OLD_DATE =
  "Sun Jan 01 1980 00:00:00 GMT+0000 (Greenwich Mean Time)";