"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../../context/AuthContext";
import addData from "@/firebase/firestore/addData";

import { useRouter } from "next/navigation";
function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = React.useState<{
    quote: string;
    author: string;
  }>({
    quote: "",
    author: "",
  });

  React.useEffect(() => {
    if (user == null) {
      router.push("/");
      alert("Please login to access the admin page!");
    }
  }, [user, router]);

  async function handleAddQuote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const { error } = await addData("quotes", uuidv4(), {
      quote: form.quote,
      author: form.author,
    });
    if (error) {
      console.log(error);
      setForm({
        quote: "",
        author: "",
      });
      alert("Failed to add quote");
    } else {
      setForm({
        quote: "",
        author: "",
      });
      alert("New quote added");
    }
    setLoading(false);
  }

  if (user)
    return (
      <div className="px-4 lg:px-24">
        <p>Only logged in users can view this page</p>
        <h2 className="mt-4 text-2xl">Add Qoutes</h2>
        <form
          onSubmit={handleAddQuote}
          className="flex flex-col gap-2 mt-4"
        >
          <label htmlFor="quote">
            <p className="text-sm font-semibold">Quote</p>
            <textarea
              onChange={(e) =>
                setForm((prev) => {
                  return {
                    ...prev,
                    quote: e.target.value,
                  };
                })
              }
              required
              name="quote"
              value={form.quote}
              id="quote"
              className="border py-1.5 px-3 rounded-md w-full"
              placeholder="Write quote here!"
            />
          </label>
          <label htmlFor="author">
            <p className="text-sm font-semibold">Author</p>
            <input
              onChange={(e) =>
                setForm((prev) => {
                  return {
                    ...prev,
                    author: e.target.value,
                  };
                })
              }
              required
              type="text"
              name="author"
              id="author"
              value={form.author}
              className="border py-1.5 px-3 rounded-md w-full"
              placeholder="Jhon Doe"
            />
          </label>
          <button
            className="px-3 py-2 bg-teal-500 text-white hover:bg-teal-600 disabled:bg-slate-300 disabled:text-slate-400"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    );
}

export default Page;
