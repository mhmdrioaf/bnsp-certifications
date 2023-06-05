"use client";

import { MouseEvent } from "react";

export default function DeleteButton({ id }: { id: string }) {
  async function deleteData(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    try {
      await fetch("http://localhost:3000/api/delete", {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      });

      alert("Berhasil menghapus data");
      window.location.reload();
    } catch (err) {
      alert("Gagal menghapus data...");
    }
  }

  return (
    <button
      className="border-none outline-none bg-red-700 text-neutral-100 px-2 py-2 rounded-md"
      onClick={(event) => deleteData(event)}
    >
      Delete
    </button>
  );
}
