import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
const words = ["SwiftUI", "UIKit"];
const HeaderPage = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let timeout;
    const word = words[currentWordIndex];

    const type = (i = 0) => {
      if (i <= word.length) {
        setDisplayText(word.slice(0, i));
        timeout = setTimeout(() => type(i + 1), 100);
      } else {
        timeout = setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
      }
    };

    type();
    return () => clearTimeout(timeout);
  }, [currentWordIndex]);
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center  bg-white shadow-2xl dark:bg-black rounded-3xl  h-auto lg:h-[80vh] p-6 m-8 gap-8">
      {/* Logo Section */}
      {/* <div className="flex justify-center">
        <Image
          src="/acquireWithAsh.png"
          alt="logo"
          height={400}
          width={400}
          className="w-48 sm:w-64 md:w-80 lg:w-[400px] h-auto"
        />
      </div> */}

      {/* Text Content Section */}
      <div className="flex-1 text-center md:text-left m-10">
      <span className="ml-2 publica-font text-2xl ">
                AcquireWith
                <span className="font-bold text-violet-600">Ash.com</span>
              </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          
          <p>Design and create</p>
          <span className="text-violet-600 border-r-2 border-white">
            {displayText}
          </span>{" "}
          apps
        </h1>
        <p className="mt-6 text-sm sm:text-base text-black dark:text-white/80 max-w-md mx-auto md:mx-0">
          Build beautiful apps with modern UI frameworks. Learn how to design
          and code like a pro.
        </p>
        <button className="mt-6 bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
          Start Learning
        </button>
      </div>

      {/* Logo Section */}
      <div className="flex justify-center m-8">
       
        <Image
          src="/acquireWithAsh.png"
          alt="logo"
          height={400}
          width={400}
          className="w-48 sm:w-64 md:w-80 lg:w-[400px] h-auto"
        />
      
       </div>
    </div>
  );
};

export default HeaderPage;
