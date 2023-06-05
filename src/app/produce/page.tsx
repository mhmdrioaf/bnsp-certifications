import BookCard from "@/components/card/BookCard";

async function getBooks() {
  const res = await fetch("http://localhost:3000/api/getminimumbooks", {
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

async function getPublishersById(id: string) {
  const res = await fetch("http://localhost:3000/api/getpublisherid", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();

  return data;
}

export default async function Produce() {
  const books = await getBooks();
  const publishers = await getPublishers();

  const publisherName = publishers
    .filter((value: Publisher) => value.id === books[0].publisherId)
    .map((publisher: Publisher) => publisher.name);

  return (
    <div className="w-full px-8 py-8 flex flex-col gap-8">
      <p className="font-bold text-2xl">Kebutuhan Buku</p>
      <div className="w-full grid grid-col-2 gap-8">
        {
          <BookCard
            key={books[0].id}
            title={books[0].title}
            publisherName={publisherName}
            price={books[0].price}
            stock={books[0].stock}
          />
        }
      </div>
    </div>
  );
}
