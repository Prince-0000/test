// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "../../lib/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import BlogEditor from "../Components/BlogEditor/BlogEditor";
// import toast from "react-hot-toast";

// export default function CreateBlogPage() {
//   const [title, setTitle] = useState("");
//   const [slug, setSlug] = useState("");
//   const [description, setDescription] = useState("");
//   const [author, setAuthor] = useState("");
//   const [coverImage, setCoverImage] = useState("");
//   const [isUploading, setIsUploading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   // const [loading, setLoading] = useState(true);
//   // const [isAuthor, setIsAuthor] = useState(false);
//   const [editorKey, setEditorKey] = useState(0);

//   const router = useRouter();

 



//   const uploadImageToImgBB = async (file) => {
//     const apiKey = "11788afa927d117c5c791b9834b7cb2f"; // Replace with your key
//     const formData = new FormData();
//     formData.append("image", file);

//     const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     if (data.success) return data.data.url;
//     throw new Error("Image upload failed");
//   };

//   const handleSave = async ({ content, collection }) => {
//     if (!title || !slug || !description || !author || !coverImage) {
//       toast.error("Please fill in all fields and upload a cover image.");
//       return;
//     }

//     setIsSaving(true);

//     try {
//       await setDoc(doc(db, collection, slug), {
//         title,
//         slug,
//         description,
//         author,
//         coverImage,
//         content,
//         createdAt: new Date(),
//       });

//       setTitle("");
//       setSlug("");
//       setDescription("");
//       setAuthor("");
//       setCoverImage("");
//       setEditorKey((prev) => prev + 1);

//       toast.success("Blog saved successfully!");
//       router.refresh();
//     } catch (error) {
//       toast.error("Failed to save blog.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

  

 

//   return (
//     <div className="relative">
//       {isSaving && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="text-white text-xl font-semibold">Saving blog...</div>
//         </div>
//       )}

//       <div className="max-w-3xl mx-auto py-8 px-4">
//         <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>

//         <input
//           type="text"
//           placeholder="Blog Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full mb-4 p-2 border border-gray-300 rounded"
//           disabled={isSaving}
//         />

//         <input
//           type="text"
//           placeholder="Slug (e.g. mastering-swiftui)"
//           value={slug}
//           onChange={(e) =>
//             setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))
//           }
//           className="w-full mb-4 p-2 border border-gray-300 rounded"
//           disabled={isSaving}
//         />

//         <input
//           type="text"
//           placeholder="Short Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full mb-4 p-2 border border-gray-300 rounded"
//           disabled={isSaving}
//         />

//         <input
//           type="text"
//           placeholder="Author Name"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           className="w-full mb-4 p-2 border border-gray-300 rounded"
//           disabled={isSaving}
//         />

//         <label className="block mb-2 font-medium">Upload Cover Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={async (e) => {
//             const file = e.target.files[0];
//             if (!file) return;
//             setIsUploading(true);
//             try {
//               const url = await uploadImageToImgBB(file);
//               setCoverImage(url);
//               toast.success("Image uploaded successfully.");
//             } catch (error) {
//               toast.error("Image upload failed.");
//             } finally {
//               setIsUploading(false);
//             }
//           }}
//           className="w-full mb-4 p-2 border border-gray-300 rounded"
//           disabled={isSaving || isUploading}
//         />

//         {isUploading && (
//           <p className="text-blue-500 mb-2">Uploading image, please wait...</p>
//         )}

//         {coverImage && (
//           <img
//             src={coverImage}
//             alt="Cover Preview"
//             className="w-full h-48 object-cover rounded mb-4"
//           />
//         )}

//         <BlogEditor key={editorKey} onSave={handleSave} />
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import BlogEditor from "../Components/BlogEditor/BlogEditor";
import toast from "react-hot-toast";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editorKey, setEditorKey] = useState(0);

  const router = useRouter();

  const uploadImageToImgBB = async (file) => {
    const apiKey = "11788afa927d117c5c791b9834b7cb2f"; // Replace with your key
    const formData = new FormData();
    formData.append("image", file);
  
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });
  
    const data = await res.json();
    if (data.success) {
      // ✅ use display_url instead of url
      return data.data.display_url || data.data.image.url;
    }
    throw new Error("Image upload failed");
  };
  

  // Recursive function to remove undefined fields from an object or array
  function cleanObject(obj) {
    if (obj === null || typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map(cleanObject);

    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, cleanObject(v)])
    );
  }

  const handleSave = async ({ content, collection }) => {
    if (
      !title?.trim() ||
      !slug?.trim() ||
      !description?.trim() ||
      !author?.trim() ||
      !coverImage?.trim()
    ) {
      toast.error("Please fill all fields and upload a cover image.");
      return;
    }

    if (!content || !content.blocks || content.blocks.length === 0) {
      toast.error("Blog content cannot be empty.");
      return;
    }

    const sanitizedContent = {
      ...content,
      blocks: content.blocks.filter(block => block && block.type && block.data)
    };
    
    
    // Deep clean entire data object from undefined fields
    const dataToSave = cleanObject({
      title,
      slug,
      description,
      author,
      coverImage,
      content: sanitizedContent,
      createdAt: new Date(),
    });

    setIsSaving(true);

    try {
      await setDoc(doc(db, collection, slug), dataToSave);

      // Clear form
      setTitle("");
      setSlug("");
      setDescription("");
      setAuthor("");
      setCoverImage("");
      setEditorKey((prev) => prev + 1);

      toast.success("Blog saved successfully!");
      router.refresh();
    } catch (error) {
      console.error("Save failed:", error);
      toast.error(`Save failed: ${error.message || error}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative">
      {isSaving && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-xl font-semibold">Saving blog...</div>
        </div>
      )}

      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>

        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          disabled={isSaving}
        />

        <input
          type="text"
          placeholder="Slug (e.g. mastering-swiftui)"
          value={slug}
          onChange={(e) =>
            setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))
          }
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          disabled={isSaving}
        />

        <input
          type="text"
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          disabled={isSaving}
        />

        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          disabled={isSaving}
        />

        <label className="block mb-2 font-medium">Upload Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            setIsUploading(true);
            try {
              const url = await uploadImageToImgBB(file);
              setCoverImage(url);
              toast.success("Image uploaded successfully.");
            } catch (error) {
              toast.error("Image upload failed.");
            } finally {
              setIsUploading(false);
            }
          }}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          disabled={isSaving || isUploading}
        />

        {isUploading && (
          <p className="text-blue-500 mb-2">Uploading image, please wait...</p>
        )}

        {coverImage && (
          <img
            src={coverImage}
            alt="Cover Preview"
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}

        <BlogEditor key={editorKey} onSave={handleSave} />
      </div>
    </div>
  );
}
