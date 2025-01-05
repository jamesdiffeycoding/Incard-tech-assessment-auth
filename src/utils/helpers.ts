export interface AuthContextInterface {
  isCredentialsCorrect: (credentials: CredentialsInterface) => boolean;
  checkLoginExpired: (loginExpiry: string) => boolean;
  handleSuccessfulLogin: () => void;
  loginExpiryTime: string;
}

interface CredentialsInterface {
  username: string;
  password: string;
}

export function checkLoginExpired(loginExpiry: string) {
  const msNow = Date.now(); // Compare times in milliseconds since 1970
  const msExpiry = new Date(loginExpiry).getTime();
  return msNow > msExpiry;
}
export const EXPIRY_MINUTES = 5;

export const EXPIRY_SECONDS = 0;

export function getDateInFuture(minutes: number, seconds: number) {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + minutes);
  expiryDate.setSeconds(expiryDate.getSeconds() + seconds);
  return expiryDate.toString();
}

export function isCredentialsCorrect(credentials: CredentialsInterface) {
  return credentials.username === "incard" && credentials.password === "incard";
}

export const LOGIN_EXPIRY_KEY = "login-expiry"; // local storage key

export const OLD_DATE =
  "Sun Jan 01 1980 00:00:00 GMT+0000 (Greenwich Mean Time)";
