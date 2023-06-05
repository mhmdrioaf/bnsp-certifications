"use client";

import BookCard from "@/components/card/BookCard";
import SearchField from "@/components/inputs/SearchField";
import { useSearchParams } from "next/navigation";

async function searchBooks(title: string) {
  const response = await fetch("http://localhost:3000/api/search", {
    method: "POST",
    body: JSON.stringify({ title: title }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed fetching books");
  }

  return response.json();
}

async function getPublisher() {
  const res = await fetch("http://localhost:3000/api/getpublisher", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return await res.json();
}

export default async function Search() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")!;

  //   const books: Book[] = [];

  const books = await searchBooks(searchQuery);
  console.log(books);

  const publisher = await getPublisher();

  return (
    <div className="w-full min-h-screen px-8 py-8 flex flex-col gap-8">
      <SearchField />
      {books.length > 0 && (
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
      )}
      {books.length < 1 && (
        <div className="w-full px-4 py-4 flex items-center justify-center">
          Buku tidak ditemukan...
        </div>
      )}
    </div>
  );
}
