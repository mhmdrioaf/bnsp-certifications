"use client";

import TextField from "@/components/inputs/TextField";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Edit() {
  const params = useParams();
  const [bookDetail, setBookDetail] = useState<Book>({
    id: "loading",
    price: 0,
    title: "loading",
    stock: 0,
    publisherId: "loading",
  });
  const [publisher, setPublisher] = useState<Publisher[]>([
    {
      id: "loading...",
      name: "loading...",
      address: "loading...",
      city: "loading...",
      phone_number: "loading...",
    },
  ]);

  const [message, setMessage] = useState<{
    status?: string;
    value?: string | React.ReactNode;
  } | null>(null);

  useEffect(() => {
    const unsub = async () => {
      const res = await fetch("http://localhost:3000/api/getbooksid", {
        method: "POST",
        body: JSON.stringify({ id: params.id }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setBookDetail(data);
    };

    unsub();
  }, [params.id]);

  useEffect(() => {
    const unsub = async () => {
      const res = await fetch("http://localhost:3000/api/getpublisher");
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed fetching publisher detail");
      }

      setPublisher(data);
    };

    unsub();
  }, []);

  async function updateBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/updatebook", {
        method: "POST",
        body: JSON.stringify({
          id: bookDetail.id,
          title: bookDetail.title,
          price: bookDetail.price,
          stock: bookDetail.stock,
          publisherId: bookDetail.publisherId,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setMessage({
          status: "success",
          value: (
            <p>
              Berhasil mengubah data buku, klik{" "}
              <a className="font-extrabold" href="/admin">
                disini
              </a>{" "}
              untuk melihat perubahannya!
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

  function inputChangeHandler(
    event: ChangeEvent<HTMLInputElement>,
    dataToChange: string
  ) {
    setBookDetail((prev) => ({ ...prev, [dataToChange]: event.target.value }));
  }

  return (
    <form
      onSubmit={(event) => updateBook(event)}
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
          placeholder={bookDetail.title}
          onChange={(event) => inputChangeHandler(event, "title")}
        />
      </div>

      <div className="w-full flex flex-col gap-4">
        <label htmlFor="price">Harga Buku</label>
        <TextField
          type="number"
          id="price"
          placeholder={`${bookDetail.price}`}
          onChange={(event) => inputChangeHandler(event, "price")}
        />
      </div>

      <div className="w-full flex flex-col gap-4">
        <label htmlFor="stock">Stok Tersedia</label>
        <TextField
          type="number"
          id="stock"
          placeholder={`${bookDetail.stock}`}
          onChange={(event) => inputChangeHandler(event, "stock")}
        />
      </div>

      <div className="w-full flex flex-col gap-4">
        <label htmlFor="publisher">Penerbit</label>
        <select
          id="publisher"
          className="w-full border border-gray-400 outline-none px-2 py-2 rounded-md"
          defaultValue={bookDetail.publisherId}
          onChange={(event) =>
            setBookDetail((prev) => ({
              ...prev,
              publisherId: event.target.value,
            }))
          }
        >
          {publisher.map((publisher: Publisher) => (
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
