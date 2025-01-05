import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trade Platform",
  description: "Welcome to our trading platform",
};

export default function Page() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Trade Platform</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-4">
          Welcome to the Trade platform. Here you can manage your trades and
          view market data.
        </p>
        <div className="grid gap-4 mt-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
            <div className="flex gap-4">
              <Link
                href="/trade/markets"
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                View Markets
              </Link>
              <Link
                href="/trade/portfolio"
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                My Portfolio
              </Link>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Market Overview</h2>
            <p className="text-gray-600">
              Real-time market data and trading insights would be displayed
              here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
