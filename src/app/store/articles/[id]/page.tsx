import React, { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

interface Article {
  id: string;
  title: string;
  content: string;
}

function getArticle(id: string): Promise<Article> {
  // Simulate API call
  return Promise.resolve({
    id,
    title: `Article ${id}`,
    content:
      "This is a sample article content. In a real application, this would be fetched from your CMS or database.",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  return {
    title: article.title,
  };
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const article = use(getArticle(id));

  const numId = parseInt(id);
  if (isNaN(numId) || numId < 1 || numId > 3) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/store/articles"
          className="text-blue-500 hover:text-blue-600 mb-6 inline-block"
        >
          ← Back to Articles
        </Link>

        <article className="bg-white rounded-lg shadow p-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">{article.content}</p>
            <p className="text-gray-600">The article ID is: {article.id}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
