import BookCard from "@/components/card/BookCard";
import SearchField from "@/components/inputs/SearchField";

async function getBooks() {
  const res = await fetch("http://localhost:3000/api/getbooks", {
    cache: "no-store",
  });
  const data = await res.json();

  return data;
}

async function getPublishers() {
  const res = await fetch("http://localhost:3000/api/getpublisher", {
    cache: "no-store",
  });
  const data = await res.json();

  return data;
}

export default async function Home() {
  const books = await getBooks();
  const publishers = await getPublishers();

  return (
    <main className="w-full min-h-screen px-8 py-8 flex flex-col gap-8">
      <SearchField />
      <div className="grid grid-cols-2 gap-4">
        {books?.map((book: Book) => {
          const publisherName = publishers
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
