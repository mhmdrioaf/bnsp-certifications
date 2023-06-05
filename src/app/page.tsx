import BookCard from "@/components/card/BookCard";
import SearchField from "@/components/inputs/SearchField";

async function getBooks() {
  const res = await fetch("http://localhost:3000/api/getbooks", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return await res.json();
}

async function getPublisher() {
  const res = await fetch("http://localhost:3000/api/getpublisher", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return await res.json();
}

export default async function Home() {
  const books = await getBooks();
  const publisher = await getPublisher();

  return (
    <main className="w-full min-h-screen px-8 py-8 flex flex-col gap-8">
      <SearchField />
      <div className="grid grid-cols-2 gap-4">
        {books.map((book: Book) => {
          const publisherName = publisher
            .filter((value: Publisher) => value.id === book.publisherId)
            .map((publisher: Publisher) => publisher.name);

          return (
            <BookCard
              key={book.id}
              title={book.title}
              publisherName={publisherName}
              price={book.price}
              stock={book.stock}
            />
          );
        })}
      </div>
    </main>
  );
}
