import Link from "next/link";
import SignInButton from "./signin-button";

export default function Header() {
  return (
    <header className="px-4 lg:px-24 py-4">
      <nav className="w-full flex justify-end space-x-4 items-center">
        <Link
          className="hover:underline"
          href="/"
        >
          Quotes
        </Link>
        <Link
          className="hover:underline"
          href="/admin"
        >
          Admin
        </Link>
        <SignInButton />
      </nav>
    </header>
  );
}
