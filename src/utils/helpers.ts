// File sorted alphabetically

export interface AuthContextInterface {
  checkLoginExpired: (loginExpiry: string) => boolean;
  handleSuccessfulLogin: () => void;
  isCredentialsCorrect: (credentials: CredentialsInterface) => boolean;
  loginExpiryTime: string;
}

interface CredentialsInterface {
  password: string;
  username: string;
}

export function checkLoginExpired(loginExpiry: string) {
  const msNow = Date.now(); // Compare times in milliseconds since 1970
  const msExpiry = new Date(loginExpiry).getTime();
  return msNow > msExpiry;
}

export const EXPIRY_MINUTES = 1;

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

export const isClientSide = typeof window !== "undefined";

export const LOGIN_EXPIRY_KEY = "login-expiry"; // local storage key

export const OLD_DATE =
  "Sun Jan 01 1980 00:00:00 GMT+0000 (Greenwich Mean Time)";

export const REFRESH_FREQUENCY_IN_MS = 5000; // 5 seconds
