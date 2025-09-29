// import Image from "next/image";
// import Link from "next/link";

// const page = () => {
//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-[#141821] shadow-2xl rounded-3xl text-amber-50">
//       <h1 className="text-2xl text-black dark:text-white sm:text-3xl md:text-4xl font-bold text-center">
//         Articles Topic
//       </h1>

//       <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
//         {/* SwiftUI Article */}
//         <Link href="/article/swiftui" className="w-full max-w-sm">
//           <div className="rounded-2xl bg-[#f9f9f9] dark:bg-gray-950 shadow-2xl overflow-hidden transition duration-500 hover:border-violet-400 hover:border-2 ">
//             <div className="m-4 p-4 text-black dark:text-white">
//               <Image
//                 alt="SwiftUI"
//                 src="/swiftui.jpeg"
//                 width={350}
//                 height={250}
//                 className="w-full h-auto object-cover"
//               />
//               <h2 className="text-xl sm:text-2xl mt-4 font-semibold">
//                 <span className="text-blue-600">Swift</span>UI Articles
//               </h2>
//               <p className="text-sm mt-2">
//                 Click to watch <span className="text-blue-600">Swift</span>ui articles.
//               </p>
//             </div>
//           </div>
//         </Link>

//         {/* UIKit Article */}
//         <Link href="/article/uikit" className="w-full max-w-sm">
//           <div className="bg-[#f9f9f9] dark:bg-gray-950 shadow-2xl rounded-3xl overflow-hidden transition duration-500 hover:border-violet-400 hover:border-2">
//             <div className="m-4 p-4 text-black dark:text-white">
//               <Image
//                 alt="UIKit"
//                 src="/ui_kit.jpg"
//                 width={350}
//                 height={250}
//                 className="w-full h-auto object-cover"
//               />
//               <h2 className="text-xl sm:text-2xl mt-4 font-semibold">
//                 <span className="text-blue-600">UIKit</span> Articles
//               </h2>
//               <p className="text-sm mt-2">
//                 Click to see <span className="text-blue-600">UIKit</span>  articles
//               </p>
//             </div>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default page;
"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const router = useRouter();

  const handleCardClick = (href, index) => {
    setClickedIndex(index); // shrink
    setTimeout(() => {
      setClickedIndex(`expand-${index}`); // expand
      setTimeout(() => {
        router.push(href); // navigate
      }, 150); // expand duration
    }, 150); // shrink duration
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-[#141821] shadow-2xl rounded-3xl text-amber-50">
      <h1 className="text-2xl text-black dark:text-white sm:text-3xl md:text-4xl font-bold text-center">
        Articles Topic
      </h1>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
        {/* SwiftUI Article */}
        <div
          onClick={() => handleCardClick("/article/swiftui", 0)}
          className={`w-full max-w-sm rounded-2xl hover:border-violet-600 hover:border-2  bg-[#f9f9f9] dark:bg-gray-950 shadow-2xl overflow-hidden transition-transform duration-150 cursor-pointer
            ${
              clickedIndex === 0
                ? "scale-95"
                : clickedIndex === "expand-0"
                
            }`}
        >
          <div className="m-4 p-4 text-black dark:text-white">
            <Image
              alt="SwiftUI"
              src="/swiftui.jpeg"
              width={350}
              height={250}
              className="w-full h-auto object-cover"
            />
            <h2 className="text-xl sm:text-2xl mt-4 font-semibold">
              <span className="text-blue-600">Swift</span>UI Articles
            </h2>
            <p className="text-sm mt-2">
              Click to watch <span className="text-blue-600">Swift</span>ui articles.
            </p>
          </div>
        </div>

        {/* UIKit Article */}
        <div
          onClick={() => handleCardClick("/article/uikit", 1)}
          className={`w-full max-w-sm hover:border-violet-600 hover:border-2 rounded-3xl bg-[#f9f9f9] dark:bg-gray-950 shadow-2xl overflow-hidden transition-transform duration-150 cursor-pointer
            ${
              clickedIndex === 1
                ? "scale-95"
                : clickedIndex === "expand-1"
                
            }`}
        >
          <div className="m-4 p-4 text-black dark:text-white">
            <Image
              alt="UIKit"
              src="/ui_kit.jpg"
              width={350}
              height={250}
              className="w-full h-auto object-cover"
            />
            <h2 className="text-xl sm:text-2xl mt-4 font-semibold">
              <span className="text-blue-600">UIKit</span> Articles
            </h2>
            <p className="text-sm mt-2">
              Click to see <span className="text-blue-600">UIKit</span> articles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
