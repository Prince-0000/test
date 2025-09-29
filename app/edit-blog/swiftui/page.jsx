"use client";

import { useState, useEffect } from "react";
import { db } from "../../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";

async function getPosts() {
  const snapshot = await getDocs(collection(db, "swiftuiArticles"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className="bg-yellow-300">{part}</mark>
    ) : (
      part
    )
  );
}

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [loaderWidth, setLoaderWidth] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    let progressInterval;

    progressInterval = setInterval(() => {
      setLoaderWidth((prev) => {
        if (prev < 90) return prev + 5;
        return prev;
      });
    }, 150);

    getPosts().then((data) => {
      if (isMounted) {
        setPosts(data);
        clearInterval(progressInterval);
        setLoaderWidth(100);
        setTimeout(() => setLoading(false), 300);
      }
    });

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
    };
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (slug, index) => {
    setClickedIndex(index);
    setTimeout(() => {
      router.push(`/edit-blog/swiftui/${slug}`);
    }, 200); // Wait for animation before navigation
  };

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Loader */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-[3px] bg-gray-200 z-50">
          <div
            className="h-full bg-violet-600 transition-all duration-150 ease-linear"
            style={{ width: `${loaderWidth}%` }}
          ></div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-center mb-6">SwiftUI Articles</h1>

      {/* Search Bar */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-2 border shadow-sm focus:outline-none rounded-xl focus:ring-2  dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Articles */}
      {!loading && (
        <>
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <div
                  key={post.slug}
                  onClick={() => handleCardClick(post.slug, index)}
                  className={`cursor-pointer rounded-2xl bg-[#eef2f4] dark:bg-gray-900 shadow-xl overflow-hidden transition transform 
                    ${clickedIndex === index
                      ? "scale-95"
                      : "hover:scale-[1.02]"} duration-200`}
                >
                  <Image
                    src={post.coverImage || "/default.jpg"}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                    unoptimized
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-blue-500">
                      {highlightText(post.title, searchTerm)}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                      {highlightText(post.description || "", searchTerm)}
                    </p>
                    {post.author && (
                      <p className="text-xs text-gray-500 mt-1">
                        By {highlightText(post.author, searchTerm)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">
              No articles found.
            </p>
          )}
        </>
      )}
    </main>
  );
}
