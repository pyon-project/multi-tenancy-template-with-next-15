import React, { use } from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store Articles",
  description: "Browse our collection of articles",
};

interface Article {
  id: number;
  title: string;
  description: string;
}

function getArticles(): Promise<Article[]> {
  // Simulate API call
  return Promise.resolve(
    [1, 2, 3].map((id) => ({
      id,
      title: `Article ${id}`,
      description:
        "This is a sample article description. You can replace this with real content.",
    })),
  );
}

export default function Page() {
  const articles = use(getArticles());

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Store Articles</h1>
      <div className="grid gap-6">
        {articles.map((article) => (
          <article key={article.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600">{article.description}</p>
            <Link
              href={`/store/articles/${article.id}`}
              className="inline-block mt-4 text-blue-500 hover:text-blue-600"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
