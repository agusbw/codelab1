"use client";
import React from "react";
import { useAuthContext } from "../context/AuthContext";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
export default function SignInButton() {
  const { user } = useAuthContext();
  const auth = getAuth();
  const router = useRouter();

  if (!user)
    return (
      <Link
        className="px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white"
        href={"/signin"}
      >
        Sign In
      </Link>
    );
  if (user)
    return (
      <button
        onClick={() => {
          signOut(auth).then(() => {
            router.replace("/signin");
          });
        }}
        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white"
      >
        Sign Out
      </button>
    );
}
