import { db } from "../../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

async function getArticles() {
  const snapshot = await getDocs(collection(db, "uikitArticles"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export default async function Page() {
  const uikitArticles = await getArticles();

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">SwiftUI Articles</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {uikitArticles.map((post) => (
          <Link key={post.slug} href={`/edit-blog/uikit/${post.slug}`}>
            <div className="cursor-pointer rounded-2xl bg-[#eef2f4] dark:bg-gray-900 shadow-xl overflow-hidden hover:scale-[1.02] transition duration-300">
            <Image
  src={post.coverImage || "/default.jpg"}
  alt={post.title}
  width={400}
  height={250}
  className="w-full h-48 object-cover"
  unoptimized
/>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-blue-500">{post.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{post.description}</p>
                {post.author && (
                  <p className="text-xs text-gray-500 mt-1">By {post.author}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
