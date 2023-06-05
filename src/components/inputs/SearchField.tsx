"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchField() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  function onSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  }

  return (
    <form
      className="px-2 py-2 flex flex-row justify-between items-center w-full border border-gray-400 rounded-lg"
      onSubmit={(event) => onSearch(event)}
    >
      <input
        className="border-none outline-none w-full h-full"
        type="text"
        placeholder="Cari nama buku..."
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <button
        type="submit"
        className="border-none outline-none bg-neutral-950 hover:bg-neutral-700 px-2 py-2 rounded-md text-neutral-100"
      >
        Cari
      </button>
    </form>
  );
}
