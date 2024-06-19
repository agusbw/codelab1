"use client";

import getCollection from "@/firebase/firestore/getCollection";
import * as React from "react";

export default function QuoteList() {
  const [quotes, setQuotes] = React.useState<
    Array<{ author: string; quote: string; id: string }>
  >([]);
  const [loading, setLoading] = React.useState(false);
  const fetchQuotes = async () => {
    setLoading(true);
    const { result, error } = await getCollection("quotes");
    setQuotes(result);
    if (error) {
      console.log(error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="space-y-2 mt-5">
      {loading ? (
        <p>Fetching quotes data...</p>
      ) : quotes.length > 0 ? (
        quotes.map((data, i) => (
          <div
            key={i}
            className="border rounded-md p-2 hover:shadow-md hover:scale-[1.005] transition-all"
          >
            <p className="italic">{data.quote}</p>
            <p className="text-teal-500 text-right">{data.author}</p>
          </div>
        ))
      ) : (
        <p>No quote's added yet</p>
      )}
    </div>
  );
}
