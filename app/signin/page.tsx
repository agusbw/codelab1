"use client";
import React from "react";
import signIn from "../../firebase/auth/signin";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }
    setLoading(false);
    return router.push("/admin");
  };
  return (
    <div className="min-h-screen flex justify-center">
      <div className="p-4 border rounded-xl h-fit mt-40 space-y-2 max-w-sm w-80">
        <h1 className="text-3xl font-semibold text-teal-500">Sign In</h1>
        {error && (
          <div className="px-2 py-3 bg-red-500/10 text-red-500 rounded-sm">
            {error}
          </div>
        )}
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
            Don&apos;t have any account?{" "}
            <Link
              className="font-semibold hover:underline text-teal-500"
              href={"/signup"}
            >
              Sign Up
            </Link>
          </p>
          <button
            className="px-3 py-2 bg-teal-500 text-white hover:bg-teal-600 disabled:bg-slate-300 disabled:text-slate-400"
            type="submit"
            disabled={loading}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
