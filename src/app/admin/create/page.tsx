"use client";

import TextField from "@/components/inputs/TextField";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Create() {
  const [book, setBook] = useState<Book>({
    id: "",
    title: "",
    price: 0,
    stock: 0,
    publisherId: "",
  });
  const [publisherData, setPublisherData] = useState<Publisher[]>([]);
  const [message, setMessage] = useState<{
    status?: string;
    value?: string | React.ReactNode;
  } | null>(null);

  useEffect(() => {
    const unsub = async () => {
      const res = await fetch("http://localhost:3000/api/getpublisher");
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed fetching publisher detail");
      }

      setPublisherData(data);
    };

    unsub();
  }, []);

  function inputChangeHandler(
    event: ChangeEvent<HTMLInputElement>,
    dataToChange: string
  ): void {
    setBook((prev) => ({ ...prev, [dataToChange]: event.target.value }));
  }

  async function addData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/add", {
        method: "POST",
        body: JSON.stringify(book),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setMessage({
          status: "success",
          value: (
            <p>
              Berhasil menambahkan data buku, klik{" "}
              <a className="font-extrabold" href="/admin">
                disini
              </a>{" "}
              untuk melihat data baru!
            </p>
          ),
        });
      }
    } catch (err) {
      setMessage({
        status: "error",
        value: (
          <p>
            Gagal mengubah data buku, klik{" "}
            <a className="font-extrabold" href="/admin">
              disini
            </a>{" "}
            untuk mencobanya kembali
          </p>
        ),
      });
    }
  }

  return (
    <form
      onSubmit={(event) => addData(event)}
      className="w-full px-8 py-8 flex flex-col items-center justify-center gap-8"
    >
      {message && (
        <div
          className={
            message?.status === "error"
              ? "w-full px-4 py-4 rounded-md fixed top-0 left-0 bg-red-700 text-white"
              : "w-full px-4 py-4 rounded-md fixed top-0 left-0 bg-green-300 text-neutral-950"
          }
        >
          {message.value}
        </div>
      )}

      <div className="w-full flex flex-col gap-4">
        <label htmlFor="title">Judul Buku</label>
        <TextField
          type="text"
          id="title"
          placeholder={"Judul..."}
          onChange={(event) => inputChangeHandler(event, "title")}
          required
        />
      </div>

      <div className="w-full flex flex-col gap-4">
        <label htmlFor="title">Buku Id</label>
        <TextField
          type="text"
          id="title"
          placeholder={"H0001..."}
          onChange={(event) => inputChangeHandler(event, "id")}
          required
        />
      </div>

      <div className="w-full flex flex-col gap-4">
        <label htmlFor="title">Kategori Buku</label>
        <TextField
          type="text"
          id="title"
          placeholder={"Kategori..."}
          onChange={(event) => inputChangeHandler(event, "category")}
          required
        />
      </div>

      <div className="w-full flex flex-col gap-4">
        <label htmlFor="price">Harga Buku</label>
        <TextField
          type="number"
          id="price"
          placeholder="Harga..."
          onChange={(event) => inputChangeHandler(event, "price")}
          required
        />
      </div>

      <div className="w-full flex flex-col gap-4">
        <label htmlFor="stock">Stok Tersedia</label>
        <TextField
          type="number"
          id="stock"
          placeholder="Stok tersedia..."
          onChange={(event) => inputChangeHandler(event, "stock")}
          required
        />
      </div>

      <div className="w-full flex flex-col gap-4">
        <label htmlFor="publisher">Penerbit</label>
        <select
          id="publisher"
          className="w-full border border-gray-400 outline-none px-2 py-2 rounded-md"
          required
          onChange={(event) =>
            setBook((prev) => ({
              ...prev,
              publisherId: event.target.value,
            }))
          }
        >
          <option value="">Pilih penerbit...</option>
          {publisherData.map((publisher: Publisher) => (
            <option key={publisher.id} value={publisher.id}>
              {publisher.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full border-none outline-none bg-green-800 text-white rounded-md px-4 py-4"
      >
        Simpan
      </button>
    </form>
  );
}
