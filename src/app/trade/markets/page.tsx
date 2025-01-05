import React, { use } from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trade Markets",
  description: "View all available markets",
};

interface Market {
  id: number;
  name: string;
  price: number;
  change: number;
}

function getMarkets(): Promise<Market[]> {
  // Simulate API call
  return Promise.resolve([
    { id: 1, name: "BTC/USD", price: 45000.0, change: 2.5 },
    { id: 2, name: "ETH/USD", price: 2800.0, change: -1.2 },
    { id: 3, name: "SOL/USD", price: 98.5, change: 5.7 },
  ]);
}

export default function Page() {
  const markets = use(getMarkets());

  return (
    <div className="min-h-screen p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Markets</h1>
        <Link href="/trade" className="text-purple-500 hover:text-purple-600">
          ← Back to Trade Home
        </Link>
      </div>

      <div className="grid gap-4">
        {markets.map((market) => (
          <div key={market.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{market.name}</h2>
              <div className="text-right">
                <p className="text-lg font-bold">
                  ${market.price.toLocaleString()}
                </p>
                <p
                  className={`text-sm ${market.change >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {market.change >= 0 ? "+" : ""}
                  {market.change}%
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href={`/trade/markets/${market.id}`}
                className="text-purple-500 hover:text-purple-600"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
