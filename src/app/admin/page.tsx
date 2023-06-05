"use client";

import DeleteButton from "@/components/button/DeleteButton";
import BookCard from "@/components/card/BookCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default async function Admin() {
  const [booksData, setBooksData] = useState<Book[]>();
  const [publishersData, setPublishersData] = useState<Publisher[]>([
    {
      id: "loading...",
      name: "loading...",
      address: "loading...",
      city: "loading...",
      phone_number: "loading...",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:3000/api/getbooks")
      .then((response) => response.json())
      .then((data) => setBooksData(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/getpublisher")
      .then((response) => response.json())
      .then((data) => setPublishersData(data));
  }, []);

  return (
    <div className="w-full px-8 py-8 flex flex-col gap-8">
      <div className="w-full flex flex-row items-end justify-end">
        <Link
          href="/admin/create"
          className="px-4 py-4 border-none outline-none bg-orange-400 text-white rounded-md hover:bg-orange-500"
        >
          Tambah Data
        </Link>
      </div>
      <div className="w-full grid grid-col-2 gap-8">
        {booksData?.map((book: Book) => {
          const publisherName = publishersData
            ?.filter((value: Publisher) => value.id === book.publisherId)
            .map((publisher: Publisher) => publisher.name);

          return (
            <BookCard
              price={book.price}
              publisherName={publisherName ? publisherName[0] : "loading..."}
              stock={book.stock}
              title={book.title}
              key={book.id}
            >
              <div className="flex flex-row gap-8">
                <Link
                  className="bg-green-300 text-neutral-900 px-2 py-2 rounded-md"
                  href={`/admin/edit/${book.id}`}
                >
                  Edit
                </Link>
                <DeleteButton id={book.id} />
              </div>
            </BookCard>
          );
        })}
      </div>
    </div>
  );
}
