// // "use client";

// // import { useEffect, useRef, useState } from "react";

// // export default function BlogEditor({ onSave }) {
// //   const editorRef = useRef(null);
// //   const [isEditorReady, setIsEditorReady] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [collection, setCollection] = useState("swiftuiArticles");
// //   const [showSuccess, setShowSuccess] = useState(false);

// //   useEffect(() => {
// //     const initEditor = async () => {
// //       const EditorJS = (await import("@editorjs/editorjs")).default;
// //       const Header = (await import("@editorjs/header")).default;
// //       const Paragraph = (await import("@editorjs/paragraph")).default;
// //       const ImageTool = (await import("@editorjs/image")).default;
// //       const CodeTool = (await import("@editorjs/code")).default;
// //       const VideoTool = (await import("editorjs-video")).default;

// //       if (!editorRef.current) {
// //         editorRef.current = new EditorJS({
// //           holder: "editorjs",
// //           tools: {
// //             // Main Heading (H1)
// //             header: {
// //               class: Header,
// //               inlineToolbar: true,
// //               config: {
// //                 placeholder: "Enter main heading",
// //                 levels: [1],
// //                 defaultLevel: 1,
// //               },
// //             },
// //             // Subheading (H2)
// //             subheading: {
// //               class: Header,
// //               inlineToolbar: true,
// //               config: {
// //                 placeholder: "Enter subheading",
// //                 levels: [2],
// //                 defaultLevel: 2,
// //               },
// //             },
// //             paragraph: Paragraph,
// //             code: {
// //               class: CodeTool,
// //               config: {
// //                 themeURL: "https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-vsc-dark-plus.min.css",
// //                 themeName: "prism-vsc-dark-plus",
// //                 languages: {
// //                   swift: "Swift" 
// //                 },
// //                 defaultLanguage: "swift" // ✅ Set Swift as default
// //               }
// //             },
// //             image: {
// //               class: ImageTool,
// //               config: {
// //                 uploader: {
// //                   async uploadByFile(file) {
// //                     try {
// //                       const formData = new FormData();
// //                       formData.append("image", file);

// //                       const res = await fetch(
// //                         `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
// //                         {
// //                           method: "POST",
// //                           body: formData,
// //                         }
// //                       );

// //                       const data = await res.json();

// //                       if (data.success) {
// //                         return {
// //                           success: 1,
// //                           file: {
// //                             url: data.data.url,
// //                           },
// //                         };
// //                       } else {
// //                         throw new Error("Upload failed");
// //                       }
// //                     } catch (err) {
// //                       console.error("Image upload failed:", err);
// //                       return {
// //                         success: 0,
// //                         message: "Image upload failed",
// //                       };
// //                     }
// //                   },
// //                 },
// //               },
// //             },
// //             video: {
// //               class: VideoTool,
// //               config: {},
// //             },
// //           },
// //           data: { blocks: [] },
// //           onReady: () => setIsEditorReady(true),
// //         });
// //       }
// //     };

// //     if (typeof window !== "undefined") {
// //       initEditor();
// //     }

// //     return () => {
// //       editorRef.current?.destroy?.();
// //       editorRef.current = null;
// //     };
// //   }, []);

// //   const handleSave = async () => {
// //     if (!isEditorReady || !editorRef.current) {
// //       console.error("Editor is not ready yet!");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const savedData = await editorRef.current.save();

// //       await onSave({
// //         content: savedData,
// //         collection,
// //       });

// //       if (editorRef.current?.render) {
// //         await editorRef.current.render({ blocks: [] });
// //       }

// //       setShowSuccess(true);
// //       setTimeout(() => setShowSuccess(false), 1000);
// //     } catch (error) {
// //       console.error("Save failed:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="relative space-y-4">
// //       {/* Collection Dropdown */}
// //       <div>
// //         <label className="block mb-1 font-semibold">Select Collection:</label>
// //         <select
// //           value={collection}
// //           onChange={(e) => setCollection(e.target.value)}
// //           className="border border-gray-300 px-3 py-2 rounded"
// //         >
// //           <option value="swiftuiArticles">SwiftUI Articles</option>
// //           <option value="uikitArticles">UIKit Articles</option>
// //         </select>
// //       </div>

// //       {/* Editor */}
// //       <div
// //         id="editorjs"
// //         className={`border border-gray-300 rounded p-4 min-h-[200px] ${
// //           loading ? "pointer-events-none opacity-50" : ""
// //         }`}
// //       />

// //       {/* Save Button */}
// //       <button
// //         onClick={handleSave}
// //         disabled={!isEditorReady || loading}
// //         className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed"
// //       >
// //         Save Blog
// //       </button>

// //       {/* Fullscreen Loading Overlay */}
// //       {loading && (
// //         <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
// //           <div className="flex flex-col items-center">
// //             <div className="h-10 w-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-4" />
// //             <p className="text-white text-lg">Saving your blog...</p>
// //           </div>
// //         </div>
// //       )}

// //       {/* Success Toast */}
// //       {showSuccess && (
// //         <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50 transition-opacity duration-500">
// //           Your blog has been saved!
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useRef, useState } from "react";
// import Prism from "prismjs";
// import "prismjs/components/prism-swift";
// import "prism-themes/themes/prism-vsc-dark-plus.css";

// // Extend Swift syntax for SwiftUI
// Prism.languages.swift.keyword = /\b(?:VStack|HStack|ZStack|Text|Image|NavigationView|List|ForEach|Button|Spacer|Group|Section|ScrollView|NavigationLink|Form|Picker|Toggle|Slider|TabView|Color|GeometryReader)\b/;

// export default function BlogEditor({ onSave }) {
//   const editorRef = useRef(null);
//   const [isEditorReady, setIsEditorReady] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [collection, setCollection] = useState("swiftuiArticles");
//   const [showSuccess, setShowSuccess] = useState(false);

//   // Monaco-based Code Tool for EditorJS with scroll passthrough fix and no scrollbar
//   class MonacoCodeTool {
//     static get toolbox() {
//       return {
//         title: "Code",
//         icon: "<svg viewBox='0 0 512 512'><path fill='currentColor' d='M184 208l-96 96 96 96M328 208l96 96-96 96'/></svg>",
//       };
//     }

//     constructor({ data }) {
//       this.data = data || { code: "" };
//       this.wrapper = null;
//     }

//     render() {
//       this.wrapper = document.createElement("div");
//       this.wrapper.style.minHeight = "200px";
//       this.wrapper.style.border = "1px solid #ccc";
//       this.wrapper.style.borderRadius = "6px";
//       this.wrapper.style.overflow = "hidden";

//       import("@monaco-editor/react").then(({ default: MonacoEditor }) => {
//         const rootEl = document.createElement("div");
//         rootEl.style.height = "300px";
//         this.wrapper.appendChild(rootEl);

//         import("react-dom/client").then(({ createRoot }) => {
//           const root = createRoot(rootEl);

//           root.render(
//             <MonacoEditor
//             height="300px"
//             language="swift"
//             value={this.data.code}
//             theme="vs-dark"
//             options={{
//               fontSize: 14,
//               minimap: { enabled: false },
//               scrollBeyondLastLine: false,
//               wordWrap: "on",
//               automaticLayout: true,
//               scrollbar: { vertical: "hidden", horizontal: "hidden" },
//               quickSuggestions: true,
//               suggestOnTriggerCharacters: true,
//               acceptSuggestionOnEnter: "on",
//               parameterHints: { enabled: true },
//             }}
//             onMount={(editor, monaco) => {
//               const containerEl = editor.getDomNode();
          
//               // Scroll passthrough fix
//               if (containerEl) {
//                 containerEl.addEventListener(
//                   "wheel",
//                   (e) => {
//                     const scrollTop = containerEl.scrollTop;
//                     const scrollHeight = containerEl.scrollHeight;
//                     const clientHeight = containerEl.clientHeight;
          
//                     const atTop = scrollTop === 0 && e.deltaY < 0;
//                     const atBottom =
//                       scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
          
//                     if (atTop || atBottom) {
//                       e.preventDefault();
//                       window.scrollBy(0, e.deltaY);
//                     }
//                   },
//                   { passive: false }
//                 );
//               }
          
//               // Stop Enter key event bubbling out of Monaco editor
//               editor.onKeyDown((e) => {
//                 if (e.keyCode === monaco.KeyCode.Enter) {
//                   e.stopPropagation();
//                 }
//               });
          
//               // Register custom Swift completions for SwiftUI keywords
//               monaco.languages.registerCompletionItemProvider('swift', {
//                 provideCompletionItems: () => {
//                   const suggestions = [
//                     {
//                       label: 'VStack',
//                       kind: monaco.languages.CompletionItemKind.Keyword,
//                       insertText: 'VStack {\n\t$0\n}',
//                       insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                       documentation: 'SwiftUI VStack container',
//                     },
//                     {
//                       label: 'HStack',
//                       kind: monaco.languages.CompletionItemKind.Keyword,
//                       insertText: 'HStack {\n\t$0\n}',
//                       insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                       documentation: 'SwiftUI HStack container',
//                     },
//                     {
//                       label: 'Text',
//                       kind: monaco.languages.CompletionItemKind.Keyword,
//                       insertText: 'Text("$0")',
//                       insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//                       documentation: 'SwiftUI Text view',
//                     },
//                     // Add more snippets as you like here
//                   ];
//                   return { suggestions };
//                 }
//               });
//             }}
//             onChange={(val) => {
//               this.data.code = val;
//             }}
//           />
          

//           );
//         });
//       });

//       return this.wrapper;
//     }

//     save() {
//       return { code: this.data.code };
//     }
//   }

//   useEffect(() => {
//     const initEditor = async () => {
//       const EditorJS = (await import("@editorjs/editorjs")).default;
//       const Header = (await import("@editorjs/header")).default;
//       const Paragraph = (await import("@editorjs/paragraph")).default;
//       const ImageTool = (await import("@editorjs/image")).default;
//       const VideoTool = (await import("editorjs-video")).default;
//       const List = (await import("@editorjs/list")).default;
//       const NestedList = (await import("@editorjs/nested-list")).default;  // optional for nested lists, you can use just List if you want
      
//       if (!editorRef.current) {
//         editorRef.current = new EditorJS({
//           holder: "editorjs",
//           tools: {
//             header: {
//               class: Header,
//               inlineToolbar: true,
//               config: {
//                 placeholder: "Enter main heading",
//                 levels: [1, 2, 3],  // Add levels 2 and 3 so you can add subheadings (h2, h3)
//                 defaultLevel: 2,    // Set default to level 2 for subheading
//               },
//             },
//             list: {
//               class: List,
//               inlineToolbar: true,
//             },
//             paragraph: Paragraph,
//             code: MonacoCodeTool,
//             image: {
//               class: ImageTool,
//               config: {
//                 uploader: {
//                   async uploadByFile(file) {
//                     try {
//                       const formData = new FormData();
//                       formData.append("image", file);

//                       const res = await fetch(
//                         `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
//                         { method: "POST", body: formData }
//                       );
//                       const data = await res.json();

//                       if (data.success) {
//                         return { success: 1, file: { url: data.data.url } };
//                       } else {
//                         throw new Error("Upload failed");
//                       }
//                     } catch (err) {
//                       console.error("Image upload failed:", err);
//                       return { success: 0, message: "Image upload failed" };
//                     }
//                   },
//                 },
//               },
//             },
//             video: { class: VideoTool, config: {} },
//           },
//           data: { blocks: [] },
//           onReady: () => setIsEditorReady(true),
//         });
//       }
//     };

//     if (typeof window !== "undefined") {
//       initEditor();
//     }

//     return () => {
//       editorRef.current?.destroy?.();
//       editorRef.current = null;
//     };
//   }, []);

//   const handleSave = async () => {
//     if (!isEditorReady || !editorRef.current) return;
//     setLoading(true);

//     try {
//       const savedData = await editorRef.current.save();
//       await onSave({ content: savedData, collection });

//       if (editorRef.current?.render) {
//         await editorRef.current.render({ blocks: [] });
//       }

//       setShowSuccess(true);
//       setTimeout(() => setShowSuccess(false), 1000);
//     } catch (error) {
//       console.error("Save failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative space-y-4">
//       <div>
//         <label className="block mb-1 font-semibold">Select Collection:</label>
//         <select
//           value={collection}
//           onChange={(e) => setCollection(e.target.value)}
//           className="border border-gray-300 px-3 py-2 rounded"
//         >
//           <option value="swiftuiArticles">SwiftUI Articles</option>
//           <option value="uikitArticles">UIKit Articles</option>
//         </select>
//       </div>

//       {/* EditorJS */}
//       <div
//         id="editorjs"
//         className={`border border-gray-300 rounded p-4 min-h-[200px] ${
//           loading ? "pointer-events-none opacity-50" : ""
//         }`}
//       />

//       <button
//         onClick={handleSave}
//         disabled={!isEditorReady || loading}
//         className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 disabled:opacity-60"
//       >
//         Save Blog
//       </button>

//       {loading && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="flex flex-col items-center">
//             <div className="h-10 w-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-4" />
//             <p className="text-white text-lg">Saving your blog...</p>
//           </div>
//         </div>
//       )}

//       {showSuccess && (
//         <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50">
//           Your blog has been saved!
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-swift";
import "prism-themes/themes/prism-vsc-dark-plus.css";

// Extend Swift syntax for SwiftUI
Prism.languages.swift.keyword = /\b(?:VStack|HStack|ZStack|Text|Image|NavigationView|List|ForEach|Button|Spacer|Group|Section|ScrollView|NavigationLink|Form|Picker|Toggle|Slider|TabView|Color|GeometryReader)\b/;

export default function BlogEditor({ onSave }) {
  const editorRef = useRef(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState("swiftuiArticles");
  const [showSuccess, setShowSuccess] = useState(false);

  // Monaco-based Code Tool
  class MonacoCodeTool {
    static get toolbox() {
      return {
        title: "Code",
        icon: "<svg viewBox='0 0 512 512'><path fill='currentColor' d='M184 208l-96 96 96 96M328 208l96 96-96 96'/></svg>",
      };
    }
  
    constructor({ data }) {
      this.data = data || { code: "" };
      this.wrapper = null;
    }
  
    render() {
      this.wrapper = document.createElement("div");
      this.wrapper.style.minHeight = "200px";
      this.wrapper.style.border = "1px solid #ccc";
      this.wrapper.style.borderRadius = "6px";
      this.wrapper.style.overflow = "hidden"; // no internal scroll bar
  
      import("@monaco-editor/react").then(({ default: MonacoEditor }) => {
        const rootEl = document.createElement("div");
        rootEl.style.width = "100%";
        this.wrapper.appendChild(rootEl);
  
        import("react-dom/client").then(({ createRoot }) => {
          const root = createRoot(rootEl);
  
          root.render(
            <MonacoEditor
              height="auto"
              language="swift"
              value={this.data.code}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                overviewRulerLanes: 0,
                alwaysConsumeMouseWheel: false, // let wheel bubble
                scrollbar: {
                  vertical: "hidden", // hide vertical scrollbar
                  horizontal: "auto",
                  useShadows: false,
                },
                wordWrap: "on", // prevent horizontal scroll
              }}
              onMount={(editor, monaco) => {
                // Focus immediately when code block is added
                editor.focus();
              
                // Dynamic height adjustment
                const updateHeight = () => {
                  const contentHeight = editor.getContentHeight();
                  const domNode = editor.getDomNode();
                  if (domNode) {
                    domNode.style.height = contentHeight + "px";
                    editor.layout();
                  }
                };
              
                updateHeight();
                setTimeout(updateHeight, 0);
                editor.onDidContentSizeChange(updateHeight);
              
                const domNode = editor.getDomNode();
                if (domNode) {
                  domNode.addEventListener(
                    "wheel",
                    (e) => {
                      const atTop = editor.getScrollTop() === 0 && e.deltaY < 0;
                      const atBottom =
                        editor.getScrollTop() + editor.getLayoutInfo().height >=
                        editor.getScrollHeight();
              
                      if (atTop || atBottom) {
                        e.preventDefault();
                        window.scrollBy({ top: e.deltaY });
                      }
                    },
                    { passive: false }
                  );
                }
              
                editor.onKeyDown((e) => {
                  if (e.keyCode === monaco.KeyCode.Enter) {
                    e.stopPropagation();
                  }
                });
              
                // SwiftUI snippets...
                monaco.languages.registerCompletionItemProvider("swift", {
                  provideCompletionItems: () => {
                    const suggestions = [
                      {
                        label: "VStack",
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: "VStack {\n\t$0\n}",
                        insertTextRules:
                          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: "SwiftUI VStack container",
                      },
                      {
                        label: "HStack",
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: "HStack {\n\t$0\n}",
                        insertTextRules:
                          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: "SwiftUI HStack container",
                      },
                      {
                        label: "Text",
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'Text("$0")',
                        insertTextRules:
                          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: "SwiftUI Text view",
                      },
                    ];
                    return { suggestions };
                  },
                });
              }}
              
              onChange={(val) => {
                this.data.code = val;
              }}
            />
          );
        });
      });
  
      return this.wrapper;
    }
  
    save() {
      return { code: this.data.code };
    }
  }

  useEffect(() => {
    const initEditor = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const Paragraph = (await import("@editorjs/paragraph")).default;
      const ImageTool = (await import("@editorjs/image")).default;
      const VideoTool = (await import("editorjs-video")).default;
      const List = (await import("@editorjs/list")).default;
      const Marker = (await import("@editorjs/marker")).default;
      const InlineCode = (await import("@editorjs/inline-code")).default;

      if (!editorRef.current) {
        editorRef.current = new EditorJS({
          holder: "editorjs",
          tools: {
            header: {
              class: Header,
              inlineToolbar: ["bold", "italic"],
              config: {
                placeholder: "Enter main heading",
                levels: [1, 2, 3],
                defaultLevel: 2,
              },
            },
            list: {
              class: List,
              inlineToolbar: ["bold", "italic"],
            },
            paragraph: {
              class: Paragraph,
              inlineToolbar: ["bold", "italic", "marker", "inlineCode"],
            },
            code: MonacoCodeTool,
            image: {
              class: ImageTool,
              config: {
                uploader: {
                  async uploadByFile(file) {
                    try {
                      const formData = new FormData();
                      formData.append("image", file);
                      const res = await fetch(
                        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                        { method: "POST", body: formData }
                      );
                      const data = await res.json();
                      if (data.success) {
                        return {
                          success: 1,
                          file: { url: data.data.url },
                        };
                      } else {
                        throw new Error("Upload failed");
                      }
                    } catch (err) {
                      console.error("Image upload failed:", err);
                      return { success: 0, message: "Image upload failed" };
                    }
                  },
                },
              },
            },
            video: { class: VideoTool, config: {} },
            marker: Marker,
            inlineCode: InlineCode,
          },
          data: { blocks: [] },
          onReady: () => setIsEditorReady(true),
        });
      }
    };

    if (typeof window !== "undefined") {
      initEditor();
    }

    return () => {
      editorRef.current?.destroy?.();
      editorRef.current = null;
    };
  }, []);

  const handleSave = async () => {
    if (!isEditorReady || !editorRef.current) return;
    setLoading(true);
    try {
      const savedData = await editorRef.current.save();
      await onSave({ content: savedData, collection });

      if (editorRef.current?.render) {
        await editorRef.current.render({ blocks: [] });
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Select Collection:</label>
        <select
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded"
        >
          <option value="swiftuiArticles">SwiftUI Articles</option>
          <option value="uikitArticles">UIKit Articles</option>
        </select>
      </div>

      <div
        id="editorjs"
        className={`border border-gray-300 rounded p-4 min-h-[200px] ${
          loading ? "pointer-events-none opacity-50" : ""
        }`}
      />

      <button
        onClick={handleSave}
        disabled={!isEditorReady || loading}
        className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 disabled:opacity-60"
      >
        Save Blog
      </button>

      {loading && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white text-lg">Saving your blog...</p>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50">
          Your blog has been saved!
        </div>
      )}
    </div>
  );
}
