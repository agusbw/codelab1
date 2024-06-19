"use client";
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/admin");
  };
  return (
    <div className="min-h-screen flex justify-center">
      <div className="p-4 border rounded-xl h-fit mt-60 space-y-2 max-w-sm w-80">
        <h1 className="text-3xl font-semibold text-teal-500 ">Sign Up</h1>
        <form
          onSubmit={handleForm}
          className="flex flex-col gap-4"
        >
          <label htmlFor="email">
            <p className="text-sm font-semibold">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              className="border py-1.5 px-3 rounded-md w-full"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p className="text-sm font-semibold">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              className="border py-1.5 px-3 rounded-md w-full"
              placeholder="password"
            />
          </label>
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              className="font-semibold hover:underline text-teal-500"
              href={"/signin"}
            >
              Sign In
            </Link>
          </p>
          <button
            className="px-3 py-2 bg-teal-500 text-white hover:bg-teal-600"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
