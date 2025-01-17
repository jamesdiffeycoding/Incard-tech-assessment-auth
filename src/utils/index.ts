export type TAuthContext = {
  checkLoginExpired: (loginExpiry: string) => boolean;
  handleSuccessfulLogin?: () => void;
  isCredentialsCorrect?: (credentials: TCredentials) => boolean;
  loginExpiryTime: string;
  logoutEarly: () => void;
};

export type TCredentials = {
  password: string;
  username: string;
};

export function checkLoginExpired(loginExpiry: string) {
  const msNow = Date.now(); // Compare times in milliseconds since 1970
  const msExpiry = new Date(loginExpiry).getTime();
  return msNow > msExpiry; // true means expiry is in the past
}

export const EXPIRY_MINUTES = 10;

export const EXPIRY_SECONDS = 0;

export const EXPIRY_TIME_FOR_DISPLAY = `${
  EXPIRY_MINUTES > 0
    ? EXPIRY_MINUTES + (EXPIRY_MINUTES > 1 ? " minutes" : " minute")
    : ""
}${EXPIRY_MINUTES > 0 && EXPIRY_SECONDS > 0 ? " " : ""}${
  EXPIRY_SECONDS > 0
    ? EXPIRY_SECONDS + (EXPIRY_SECONDS > 1 ? " seconds" : " second")
    : ""
}`;

export function getDateInFuture(minutes: number, seconds: number) {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + minutes);
  expiryDate.setSeconds(expiryDate.getSeconds() + seconds);
  return expiryDate.toString();
}

export function isCredentialsCorrect(credentials: TCredentials) {
  return credentials.username === "incard" && credentials.password === "incard";
}

export const LOGIN_EXPIRY_KEY = "login-expiry"; // local storage key

export const OLD_DATE =
  "Sun Jan 01 1980 00:00:00 GMT+0000 (Greenwich Mean Time)";

export const REFRESH_FREQUENCY_IN_MS = 3000;
