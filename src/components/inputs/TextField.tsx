export default function TextField({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full outline-none border border-gray-400 rounded-md px-2 py-2"
    />
  );
}
