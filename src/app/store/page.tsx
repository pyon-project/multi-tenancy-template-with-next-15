import React from "react";
import Link from "next/link";

export default function StorePage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Store Application</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Welcome to the Store application.</p>
        <div className="mt-4 p-4 bg-blue-100 rounded">
          <p className="text-blue-800">Environment Test:</p>
          <p className="font-mono">{process.env.NEXT_PUBLIC_STORE_TEST}</p>
          <p className="font-mono">
            App Name: {process.env.NEXT_PUBLIC_APP_NAME}
          </p>
        </div>
        <div className="mt-6">
          <Link
            href="/store/articles"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            View Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
