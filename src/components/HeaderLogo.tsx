import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <div className="flex mb-12">
      <Link href="/home" aria-label="Go to Home Page">
        <Image
          width={90} /* px */
          height={50} /* px */
          src="/IncardLogo.jpg"
          alt="Incard Logo"
        />
      </Link>
    </div>
  );
}
