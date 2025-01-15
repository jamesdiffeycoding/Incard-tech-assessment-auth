import { EXPIRY_MINUTES } from "@/utils";

export default function Footer() {
  return (
    <p className="text-lime-200 mt-4">
      In this app your login session expires after {EXPIRY_MINUTES} minute(s).
    </p>
  );
}
