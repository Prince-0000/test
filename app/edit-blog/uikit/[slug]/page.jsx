"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function EditBlogPage({ params }) {
  const [slug, setSlug] = useState(null);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogData, setBlogData] = useState(null);
  const router = useRouter();

  // unwrap params
  useEffect(() => {
    (async () => {
      const p = await params;
      setSlug(p.slug);
    })();
  }, [params]);

  // fetch blog when slug is ready
  useEffect(() => {
    if (!slug) return;

    async function fetchBlog() {
      const docRef = doc(db, "swiftuiArticles", slug);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setBlogTitle(data.title || "");
        setBlogData(data.content || {});
      } else {
        alert("Blog not found");
        router.push("/");
      }
      setLoading(false);
    }

    fetchBlog();
  }, [slug, router]);

  // initialize EditorJS after loading blogData
  useEffect(() => {
    if (!loading && blogData && !editorRef.current) {
      (async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const Paragraph = (await import("@editorjs/paragraph")).default;
        const ImageTool = (await import("@editorjs/image")).default;
        const CodeTool = (await import("@editorjs/code")).default;

        const editor = new EditorJS({
          holder: "editorjs",
          autofocus: true,
          tools: {
            header: Header,
            paragraph: Paragraph,
            code: CodeTool,
            image: {
                class: ImageTool,
                config: {
                  uploader: {
                    async uploadByFile(file) {
                      const formData = new FormData();
                      formData.append("image", file);
              
                      const apiKey = "11788afa927d117c5c791b9834b7cb2f"; // <-- put your real key here
                      const res = await fetch(
                        `https://api.imgbb.com/1/upload?key=${apiKey}`,
                        {
                          method: "POST",
                          body: formData,
                        }
                      );
              
                      const result = await res.json();
              
                      if (result.success) {
                        return {
                          success: 1,
                          file: {
                            url: result.data.url, // permanent public URL
                          },
                        };
                      } else {
                        throw new Error("Image upload failed");
                      }
                    },
                  },
                },
              },
              
          },
          data: blogData,
        });

        editorRef.current = editor;
      })();
    }
  }, [loading, blogData]);

  async function handleSave() {
    if (!editorRef.current) return;

    const savedData = await editorRef.current.save();
    await updateDoc(doc(db, "swiftuiArticles", slug), {
      title: blogTitle,
      content: savedData,
      updatedAt: new Date(),
    });

    alert("Blog updated successfully!");
    router.push(`/article/swiftui/${slug}`);
  }

  if (loading || !slug) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <input
        type="text"
        value={blogTitle}
        onChange={(e) => setBlogTitle(e.target.value)}
        placeholder="Blog title"
        className="w-full text-3xl font-bold mb-4 border-b border-gray-300 p-2"
      />

      <div id="editorjs" className="border rounded p-4 min-h-[400px] bg-gray-700" />

      <button
        onClick={handleSave}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
}
