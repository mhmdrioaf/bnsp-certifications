"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ tabs }: Tabs) {
  const pathname = usePathname();
  return (
    <div className="w-full py-8 px-8 flex flex-row items-center justify-between border-b-gray-400 border-b">
      <h3 className="text-black text-2xl font-bold">UNIBOOKSTORE</h3>
      <nav className="flex flex-row gap-4">
        {tabs.map((tab: Tab) => (
          <Link
            className={
              pathname === tab.route
                ? "text-black"
                : "text-gray-400 hover:text-black"
            }
            key={tab.id}
            href={tab.route}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
