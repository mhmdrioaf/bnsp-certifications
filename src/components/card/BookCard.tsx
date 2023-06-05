export default function BookCard({
  title,
  price,
  publisherName,
  stock,
  children,
}: {
  title: string;
  price: number;
  publisherName: string;
  stock: number;
  children?: React.ReactNode;
}) {
  const convertToRupiah = (price: number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <div className="w-full h-auto flex flex-col items-start gap-8 px-4 py-4 border border-gray-400 rounded-md">
      <p className="text-2xl">{title}</p>
      <p className="font-semibold text-xl">{convertToRupiah(price)}</p>
      <p className="text-gray-600">{publisherName}</p>
      <p>Tersedia: {stock} stok</p>
      {children}
    </div>
  );
}
