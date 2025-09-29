"use client"; // Only needed if you're using app directory with hooks

import Image from "next/image";

export default function About() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="w-full max-w-6xl rounded-2xl bg-gradient-to-tl from-white via-[#9941eb] to-white dark:from-black dark:via-[#9941eb] dark:to-black p-[2px]">
        <div className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-950 px-6 sm:px-10 py-10 rounded-2xl shadow-2xl">
          {/* Left Text Content */}
          <div className="w-full md:w-2/3 p-4 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-gray-100 mb-4">
              Hey, I’m Ashutosh 👋
            </h1>
            <p className="text-black dark:text-gray-300 text-base sm:text-lg mb-4 leading-relaxed">
              I'm a skilled{" "}
              <span className="font-semibold text-violet-600">
                iOS Developer
              </span>{" "}
              and experienced freelancer passionate about building amazing apps
              and teaching others.
            </p>
            <p className="text-black dark:text-gray-300 text-base sm:text-lg mb-4 leading-relaxed">
              Over the years, I've built high-quality, performant apps using
              Swift, SwiftUI, and UIKit. Now, I want to give back by helping
              aspiring developers learn iOS development through hands-on
              guidance, projects, and real-world advice.
            </p>
            <p className="text-black dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              Whether you're a beginner or want to polish your skills—I'm here
              to support your journey. Let's build the future of iOS together 🚀
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/3 flex justify-center p-4 sm:p-6">
            <Image
              src="/ashutosh.jpeg"
              alt="Ashutosh"
              height={400}
              width={300}
              className="rounded-xl object-cover w-[250px] sm:w-[300px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
