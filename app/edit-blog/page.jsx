import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-[#141821] shadow-2xl rounded-3xl text-amber-50">
      <h1 className="text-2xl text-black dark:text-white sm:text-3xl md:text-4xl font-bold text-center">
        Edit Articles
      </h1>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
        {/* SwiftUI Article */}
        <Link href="/edit-blog/swiftui" className="w-full max-w-sm">
          <div className="rounded-2xl bg-[#eef2f4] dark:bg-gray-950 shadow-2xl overflow-hidden transition duration-500 hover:border-violet-400 hover:border-2 ">
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
        </Link>

        {/* UIKit Article */}
        <Link href="/edit-blog/uikit" className="w-full max-w-sm">
          <div className="bg-[#eef2f4] dark:bg-gray-950 shadow-2xl rounded-3xl overflow-hidden transition duration-500 hover:border-violet-400 hover:border-2">
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
                Click to see <span className="text-blue-600">UIKit</span>  articles
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default page;
