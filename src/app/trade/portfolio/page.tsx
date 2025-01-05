import React, { use } from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trade Portfolio",
  description: "View your trading portfolio",
};

interface Position {
  id: number;
  asset: string;
  amount: number;
  value: number;
  profitLoss: number;
}

function getPortfolio(): Promise<Position[]> {
  // Simulate API call
  return Promise.resolve([
    { id: 1, asset: "BTC", amount: 0.5, value: 22500.0, profitLoss: 1200.0 },
    { id: 2, asset: "ETH", amount: 4.2, value: 11760.0, profitLoss: -420.0 },
    { id: 3, asset: "SOL", amount: 25.0, value: 2462.5, profitLoss: 325.5 },
  ]);
}

export default function Page() {
  const positions = use(getPortfolio());
  const totalValue = positions.reduce((sum, pos) => sum + pos.value, 0);
  const totalProfitLoss = positions.reduce(
    (sum, pos) => sum + pos.profitLoss,
    0,
  );

  return (
    <div className="min-h-screen p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Portfolio</h1>
        <Link href="/trade" className="text-purple-500 hover:text-purple-600">
          ← Back to Trade Home
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Total Value</p>
            <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Total P/L</p>
            <p
              className={`text-2xl font-bold ${totalProfitLoss >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {totalProfitLoss >= 0 ? "+" : ""}
              {totalProfitLoss.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {positions.map((position) => (
          <div key={position.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{position.asset}</h2>
                <p className="text-gray-600">{position.amount} tokens</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">
                  ${position.value.toLocaleString()}
                </p>
                <p
                  className={`text-sm ${position.profitLoss >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {position.profitLoss >= 0 ? "+" : ""}$
                  {position.profitLoss.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
