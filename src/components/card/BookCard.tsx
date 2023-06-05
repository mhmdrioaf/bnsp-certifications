export default function BookCard({
  title,
  price,
  publisherName,
  stock,
}: {
  title: string;
  price: number;
  publisherName: string;
  stock: number;
}) {
  const convertToRupiah = (price: number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <div className="w-full h-64 flex flex-col items-start gap-8 px-4 py-4 border border-gray-400 rounded-md cursor-pointer hover:bg-neutral-100">
      <p className="text-2xl">{title}</p>
      <p className="font-semibold text-xl">{convertToRupiah(price)}</p>
      <p className="text-gray-600">{publisherName}</p>
      <p>Tersedia: {stock} stok</p>
    </div>
  );
}
