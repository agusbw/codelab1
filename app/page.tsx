import QuoteList from "@/components/quote-list";

export default function Home() {
  return (
    <div className="mt-8 mb-12 max-h-screen px-4 lg:px-24">
      <div>
        <h1 className="text-3xl mb-5">List of Quotes</h1>
        <QuoteList />
      </div>
    </div>
  );
}
