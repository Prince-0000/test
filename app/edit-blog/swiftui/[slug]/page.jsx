
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { toast } from "react-hot-toast";
import Prism from "prismjs";
import "prismjs/components/prism-swift";
import "prism-themes/themes/prism-vsc-dark-plus.css";

// Extend Swift syntax highlighting for SwiftUI keywords
Prism.languages.swift.keyword = /\b(?:VStack|HStack|ZStack|Text|Image|NavigationView|List|ForEach|Button|Spacer|Group|Section|ScrollView|NavigationLink|Form|Picker|Toggle|Slider|TabView|Color|GeometryReader)\b/;

export default function EditBlogPage({ params }) {
  const [slug, setSlug] = useState(null);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogData, setBlogData] = useState(null);
  const router = useRouter();

 
  // Monaco-based Code Tool for EditorJS
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
              // Dynamic height adjustment
              const updateHeight = () => {
                const contentHeight = editor.getContentHeight();
                const domNode = editor.getDomNode();
                if (domNode) {
                  domNode.style.height = contentHeight + "px";
                  editor.layout();
                }
              };
            
              // First height adjustment
              updateHeight();
            
              // 🔹 Run again after render so height is correct immediately
              setTimeout(updateHeight, 0);
            
              // Adjust height when content changes
              editor.onDidContentSizeChange(updateHeight);
            
              // Allow page scroll when at edges
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
            

              // Stop Enter from bubbling out
              editor.onKeyDown((e) => {
                if (e.keyCode === monaco.KeyCode.Enter) {
                  e.stopPropagation();
                }
              });

              // SwiftUI snippets
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


// Monaco-based Code Tool for EditorJS
  // Get slug from params
  useEffect(() => {
    (async () => {
      const p = await params;
      setSlug(p.slug);
    })();
  }, [params]);

  // Fetch existing blog data
  useEffect(() => {
    if (!slug) return;

    async function fetchBlog() {
      try {
        const docRef = doc(db, "swiftuiArticles", slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setBlogTitle(data.title || "");
          setBlogData(data.content || {});
        } else {
          toast.error("Blog not found");
          router.push("/");
        }
      } catch (error) {
        toast.error("Error fetching blog");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [slug, router]);

  // Initialize EditorJS with blog data
  useEffect(() => {
    if (!loading && blogData && !editorRef.current) {
      (async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const Paragraph = (await import("@editorjs/paragraph")).default;
        const ImageTool = (await import("@editorjs/image")).default;
        const VideoTool = (await import("editorjs-video")).default;
        const List = (await import("@editorjs/list")).default;
        const Marker = (await import("@editorjs/marker")).default;
        const InlineCode = (await import("@editorjs/inline-code")).default;

        editorRef.current = new EditorJS({
          holder: "editorjs",
          autofocus: true,
          tools: {
            header: {
              class: Header,
              inlineToolbar: ["bold", "italic"],
              config: {
                placeholder: "Enter heading",
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
                    const formData = new FormData();
                    formData.append("image", file);
                    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
                    const res = await fetch(
                      `https://api.imgbb.com/1/upload?key=${apiKey}`,
                      { method: "POST", body: formData }
                    );
                    const result = await res.json();
                    if (result.success) {
                      return { success: 1, file: { url: result.data.url } };
                    } else {
                      throw new Error("Image upload failed");
                    }
                  },
                },
              },
            },
            video: { class: VideoTool, config: {} },
            marker: Marker,
            inlineCode: InlineCode,
          },
          data: blogData,
        });
      })();
    }
  }, [loading, blogData]);

  async function handleSave() {
    if (!editorRef.current) return;
    setSaving(true);
    try {
      const savedData = await editorRef.current.save();
      await updateDoc(doc(db, "swiftuiArticles", slug), {
        title: blogTitle,
        content: savedData,
        updatedAt: new Date(),
      });
      toast.success("Blog updated successfully!");
      router.push(`/article/swiftui/${slug}`);
    } catch (error) {
      toast.error("Failed to update blog");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !slug) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <input
        type="text"
        value={blogTitle}
        onChange={(e) => setBlogTitle(e.target.value)}
        placeholder="Blog title"
        className="w-full text-3xl font-bold mb-4 border-b border-gray-300 p-2"
      />

      <div id="editorjs" className="border rounded p-4 min-h-[400px]" />

      <button
        onClick={handleSave}
        disabled={saving}
        className={`mt-6 px-6 py-2 rounded-lg text-white ${
          saving
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
