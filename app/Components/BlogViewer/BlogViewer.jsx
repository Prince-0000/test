// "use client";
// import { useEffect, useState } from "react";
// import hljs from "highlight.js";
// import "../../../style/xcode-dark.css";
// // import "highlight.js/styles/github-dark.css";
// export default function BlogViewer({ content }) {
//   const [copiedIndex, setCopiedIndex] = useState(null);

//   useEffect(() => {
//     hljs.highlightAll();
//   }, [content]);

//   const handleCopy = (code, index) => {
//     navigator.clipboard.writeText(code).then(() => {
//       setCopiedIndex(index);
//       setTimeout(() => setCopiedIndex(null), 2000);
//     });
//   };

//   if (!content?.blocks || content.blocks.length === 0) {
//     return <div className="text-gray-500 italic">No content to show</div>;
//   }

//   const renderText = (text) =>
//     typeof text === "string" ? text : JSON.stringify(text);

//   return (
//     <div className="prose prose-lg dark:prose-invert max-w-none break-words whitespace-pre-wrap">
//       {content.blocks.map((block, i) => {
//         switch (block.type) {
//             case "header":
//                 if (block.data.level === 1) {
//                   return (
//                     <h1
//                       key={i}
//                       className="text-4xl font-bold"
//                       style={{ marginTop: "1rem", marginBottom: "1rem" }}
//                     >
//                       {renderText(block.data.text)}
//                     </h1>
//                   );
//                 } else if (block.data.level === 2) {
//                   return (
//                     <h2
//                       key={i}
//                       className="text-2xl font-semibold"
//                       style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}
//                     >
//                       {renderText(block.data.text)}
//                     </h2>
//                   );
//                 } else if (block.data.level === 3) {
//                   return (
//                     <h3
//                       key={i}
//                       className="text-2xl font-semibold"
//                       style={{ marginTop: "0.5rem", marginBottom: "0.25rem" }}
//                     >
//                       {renderText(block.data.text)}
//                     </h3>
//                   );
//                 }
//               // fallback for other levels
//               return (
//                 <h3
//                   key={i}
//                   className="font-semibold"
//                   style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
//                 >
//                   {renderText(block.data.text)}
//                 </h3>
//               );

//           case "list": {
//             const Tag = block.data.style === "ordered" ? "ol" : "ul";

//             const normalizedItems = block.data.items.map((item) => {
//               if (typeof item === "string") return item;
//               if (
//                 item &&
//                 typeof item === "object" &&
//                 typeof item.content === "string"
//               ) {
//                 return item.content;
//               }
//               return "";
//             });

//             return (
//               <Tag
//                 key={i}
//                 className="list-inside"
//                 style={{ marginTop: 0, marginBottom: "0.5rem", paddingLeft: "1.25rem" }}
//               >
//                 {normalizedItems.map((item, idx) => (
//                   <li key={idx} style={{ marginBottom: "-8px" }}>
//                     {item}
//                   </li>
//                 ))}
//               </Tag>
//             );
//           }

//           case "paragraph":
//             return (
//               <p
//                 key={i}
//                 className="leading-relaxed"
//                 style={{ marginTop: "1rem", marginBottom: "2rem" }}
//               >
//                 {renderText(block.data.text)}
//               </p>
//             );

//           case "code":
//             return (
//               <div key={i} className="relative group">
//                 <pre
//                   className="overflow-x-auto p-4 rounded-md shadow-xl hljs"
//                   // style={{ backgroundColor: "#000000" }}
//                 >
//                   <code
//                     className={`language-${block.data.language || "swift"}`}
//                     // style={{ backgroundColor: "#000000" }}
//                   >
//                     {renderText(block.data.code)}
//                   </code>
//                 </pre>
//                 <button
//                   onClick={() => handleCopy(block.data.code, i)}
//                   className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-gray-700 text-white opacity-100"
//                 >
//                   {copiedIndex === i ? "Copied!" : <i className="fa-solid fa-copy"></i>}
//                 </button>
//               </div>
//             );

//           // case "image":
//           //   return (
//           //     <figure key={i} className="my-6">
//           //       <img
//           //         src={block.data.file?.url || ""}
//           //         alt={block.data.caption || "Image"}
//           //         className="rounded-md shadow-md w-full max-h-[500px] object-contain"
//           //       />
//           //       {block.data.caption && (
//           //         <figcaption className="text-sm text-center text-gray-500 mt-2">
//           //           {renderText(block.data.caption)}
//           //         </figcaption>
//           //       )}
//           //     </figure>
//           //   );
//           case "image":
//             console.log("Rendering image block:", block); // 👈 log full block object
//             console.log("Image URL:", block.data.file?.url); // 👈 log just the URL
//             return (
//               <figure key={i} className="my-6">
//                 <img
//                   src={block.data.file?.url || ""}
//                   alt={block.data.caption || "Image"}
//                   className="rounded-md shadow-md w-full max-h-[500px] object-contain"
//                 />
//                 {block.data.caption && (
//                   <figcaption className="text-sm text-center text-gray-500 mt-2">
//                     {renderText(block.data.caption)}
//                   </figcaption>
//                 )}
//               </figure>
//             );

//           default:
//             return null;
//         }
//       })}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import hljs from "highlight.js";
import Image from "next/image";
import "../../../style/xcode-dark.css";

export default function BlogViewer({ content, coverImage, title }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    hljs.highlightAll();
  }, [content]);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  if (!content?.blocks || content.blocks.length === 0) {
    return <div className="text-gray-500 italic">No content to show</div>;
  }

  const renderText = (text) =>
    typeof text === "string" ? text : JSON.stringify(text);

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none break-words whitespace-pre-wrap">
      {/* ✅ Cover image rendering */}
      {coverImage && (
        <div className="relative w-full h-64 sm:h-96 mb-6">
          {/* <Image
            src={coverImage}
            alt={title || "Cover Image"}
            fill
            className="object-cover rounded-xl"
            unoptimized // 👈 prevents ImgBB mobile breakage
          /> */}
          <Image
            src={coverImage}
            alt={title||coverImage}
            width={800}
            height={400}
            unoptimized // 👈 disables next/image optimization
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      )}

      {content.blocks.map((block, i) => {
        switch (block.type) {
          case "header":
            if (block.data.level === 1) {
              return (
                <h1
                  key={i}
                  className="text-4xl font-bold"
                  style={{ marginTop: "1rem", marginBottom: "1rem" }}
                >
                  {renderText(block.data.text)}
                </h1>
              );
            } else if (block.data.level === 2) {
              return (
                <h2
                  key={i}
                  className="text-2xl font-semibold"
                  style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}
                >
                  {renderText(block.data.text)}
                </h2>
              );
            } else if (block.data.level === 3) {
              return (
                <h3
                  key={i}
                  className="text-2xl font-semibold"
                  style={{ marginTop: "0.5rem", marginBottom: "0.25rem" }}
                >
                  {renderText(block.data.text)}
                </h3>
              );
            }
            return (
              <h3
                key={i}
                className="font-semibold"
                style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
              >
                {renderText(block.data.text)}
              </h3>
            );

          case "list": {
            const Tag = block.data.style === "ordered" ? "ol" : "ul";
            const normalizedItems = block.data.items.map((item) => {
              if (typeof item === "string") return item;
              if (
                item &&
                typeof item === "object" &&
                typeof item.content === "string"
              ) {
                return item.content;
              }
              return "";
            });

            return (
              <Tag
                key={i}
                className="list-inside"
                style={{
                  marginTop: 0,
                  marginBottom: "0.5rem",
                  paddingLeft: "1.25rem",
                }}
              >
                {normalizedItems.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: "-8px" }}>
                    {item}
                  </li>
                ))}
              </Tag>
            );
          }

          case "paragraph":
            return (
              <p
                key={i}
                className="leading-relaxed"
                style={{ marginTop: "1rem", marginBottom: "2rem" }}
              >
                {renderText(block.data.text)}
              </p>
            );

          case "code":
            return (
              <div key={i} className="relative group">
                <pre className="overflow-x-auto p-4 rounded-md shadow-xl hljs">
                  <code
                    className={`language-${block.data.language || "swift"}`}
                  >
                    {renderText(block.data.code)}
                  </code>
                </pre>
                <button
                  onClick={() => handleCopy(block.data.code, i)}
                  className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-gray-700 text-white"
                >
                  {copiedIndex === i ? (
                    "Copied!"
                  ) : (
                    <i className="fa-solid fa-copy"></i>
                  )}
                </button>
              </div>
            );

          case "image":
            return (
              <figure key={i} className="my-6">
                <img
                  src={block.data.file?.url || ""}
                  alt={block.data.caption || "Image"}
                  className="rounded-md shadow-md w-full max-h-[500px] object-contain"
                />
                {block.data.caption && (
                  <figcaption className="text-sm text-center text-gray-500 mt-2">
                    {renderText(block.data.caption)}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
