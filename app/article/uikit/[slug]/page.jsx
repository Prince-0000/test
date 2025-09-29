import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
import Image from "next/image";
import BlogViewer from "../../../Components/BlogViewer/BlogViewer";
import { db } from "../../../../lib/firebase";
// import BlogViewer from "@/Components/BlogViewer";
 

export default async function BlogPost({ params }) {
  const { slug } = await params; 

  const docRef = doc(db, "uikitArticles", slug);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return <div className="text-red-500 p-8">Post not found.</div>;
  }

  const data = docSnap.data();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      {/* Optional cover image */}
      {data.coverImage && (
        <Image
        src={data.coverImage}
        alt={data.title}
        width={800}
        height={400}
        unoptimized // 👈 disables next/image optimization
        className="w-full h-auto object-cover  rounded-lg"
      />
      )}

      {/* Blog Content Viewer */}
      <BlogViewer content={data.content} />
    </div>
  );
}
