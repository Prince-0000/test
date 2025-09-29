import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-[#141821] shadow-2xl rounded-4xl text-amber-50">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black dark:text-white">
        Videos Topic
      </h1>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
        {/* SwiftUI Video */}
        <Link href="/videos/swiftui" className="w-full max-w-sm">
          <div className="rounded-2xl bg-[#eef2f4] dark:bg-gray-950 shadow-2xl overflow-hidden transition duration-500 hover:border-violet-400 hover:border-2">
            <div className="m-4 p-4 text-black dark:text-white">
              <Image
                alt="SwiftUI"
                src="/videos_swift.jpeg"
                width={350}
                height={250}
                className="w-full h-auto object-cover"
              />
              <h2 className="text-xl sm:text-2xl mt-4 font-semibold">
                <span className="text-blue-600">Swift</span>UI Videos
              </h2>
              <p className="text-sm mt-2">
                Click to watch <span className="text-blue-600">Swift</span>UI video tutorials.
              </p>
            </div>
          </div>
        </Link>

        {/* UIKit Video */}
        <Link href="/videos/uikit" className="w-full max-w-sm">
          <div className="rounded-2xl text-black dark:text-white bg-[#eef2f4] dark:bg-gray-950 shadow-2xl overflow-hidden transition duration-500 hover:border-violet-400 hover:border-2">
            <div className="m-4 p-4">
              <Image
                alt="UIKit"
                src="/video_ui.jpg"
                width={350}
                height={250}
                className="w-full h-auto object-cover"
              />
              <h2 className="text-xl sm:text-2xl mt-4 font-semibold">
                <span className="text-blue-600">UIKit</span> Videos
              </h2>
              <p className="text-sm mt-2">
                Click to watch <span className="text-blue-600">UIKit</span> video tutorials.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default page;
