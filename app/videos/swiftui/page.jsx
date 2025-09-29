'use client';

import Link from 'next/link';
import Image from 'next/image';

const articles = [
  {
    slug: 'introduction-to-swiftui',
    title: 'Introduction to SwiftUI',
    description: 'Learn the basics of Apple’s SwiftUI framework.',
    image :'/swiftui.png',
  },
  {
    slug: 'custom-layouts',
    title: 'Custom Layouts',
    description: 'Design and how to create responsive and custom layouts in SwiftUI.',
    image: '/swiftui.png',
  },
  {
    slug: 'animations',
    title: 'Animations in SwiftUI',
    description: 'Make your app more dynamic with SwiftUI animations.',
    image: '/swiftui.png',
  },
];

export default function Page() {
  return (
    <div className="p-8 w-[90vw] mx-auto">
      <h1 className="text-4xl mb-8 text-center text-black dark:text-white">SWIFTUI ARTICLES</h1>
      <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2">
        {articles.map(({ slug, title, description, image }) => (
          <Link key={slug} href={`/videos/swiftui/${slug}`}>
            <div className="cursor-pointer  rounded-3xl bg-[#eef2f4] dark:bg-gray-900 shadow-2xl transition duration-300  hover:border-violet-400 hover:border-2 ">
              <div className="m-4 p-8 text-black dark:text-white">
                <Image
                  alt={title}
                  src={image}
                  width={350}
                  height={250}
                  className="rounded-md"
                />
                <h2 className="text-2xl mt-4 text-blue-400">{title}</h2>
                <p className="text-black dark:text-gray-300 mt-2">{description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
