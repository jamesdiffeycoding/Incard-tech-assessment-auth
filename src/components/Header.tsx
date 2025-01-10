import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-center align-center bg-black w-full p-2">
      <Link href="/home" aria-label="Go to Home Page">
        <Image
          width={100} /* px */
          height={50} /* px */
          src="/IncardLogo.jpg"
          alt="Incard Logo"
        />
      </Link>
    </div>
  );
}
