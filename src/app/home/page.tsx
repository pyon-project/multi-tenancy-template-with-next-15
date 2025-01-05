import React from "react";

export default function HomePage() {
  const isDevelopment = process.env.NODE_ENV === "development";

  const links = [
    {
      name: "Store",
      href: isDevelopment
        ? "http://localhost:3001"
        : "https://store.yourdomain.com",
      className: "bg-blue-500 hover:bg-blue-600",
    },
    {
      name: "Board",
      href: isDevelopment
        ? "http://localhost:3002"
        : "https://board.yourdomain.com",
      className: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Trade",
      href: isDevelopment
        ? "http://localhost:3003"
        : "https://trade.yourdomain.com",
      className: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
        <div className="space-y-4">
          <p>Choose your application:</p>
          <div className="flex gap-4 justify-center">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-2 text-white rounded ${link.className}`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
