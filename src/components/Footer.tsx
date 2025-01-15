import { EXPIRY_TIME_FOR_DISPLAY } from "@/utils";

export default function Footer() {
  return (
    <p className="text-lime-200 mt-12">
      For security, login sessions expire after {EXPIRY_TIME_FOR_DISPLAY}.
    </p>
  );
}
