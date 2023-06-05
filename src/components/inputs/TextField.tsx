export default function TextField({
  ...props
}: React.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full outline-none border border-gray-400 rounded-md"
    />
  );
}
