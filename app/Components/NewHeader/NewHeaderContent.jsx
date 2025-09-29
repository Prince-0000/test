"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const darkImages = ["/Images/dark_1.png", "/Images/dark_2.png", "/Images/dark_3.png"];
const lightImages = ["/Images/light_1.png", "/Images/light_2.png", "/Images/light_3.png"];
const words = ["SwiftUI", "UIKit"];

export default function Hero() {
  const { theme } = useTheme();
  const images = theme === "dark" ? darkImages : lightImages;

  const [angle, setAngle] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const [depth, setDepth] = useState(220); // default depth

  // Typewriter effect
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

  // 3D image rotation
  useEffect(() => {
    let lastTime = Date.now();
    const speed = 2000;

    const updateRotation = () => {
      const now = Date.now();
      if (now - lastTime >= speed) {
        setAngle((prev) => prev - 120);
        lastTime = now;
      }
      requestAnimationFrame(updateRotation);
    };

    const animationId = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Adjust depth based on screen size
  useEffect(() => {
    const updateDepth = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDepth(180); // smaller for mobile
      } else if (width < 1024) {
        setDepth(260); // bigger for tablets
      } else {
        setDepth(300); // wider for desktop
      }
    };
  
    updateDepth();
    window.addEventListener("resize", updateDepth);
    return () => window.removeEventListener("resize", updateDepth);
  }, []);

  useEffect(() => setHasMounted(true), []);
  if (!hasMounted) return null;

  return (
    <section className="min-h-screen px-4 pt-6 pb-12 bg-white text-black dark:bg-black dark:text-white flex items-center justify-center -mt-10">
      {/* Tablet behaves like mobile */}
      <div className="max-w-[75vw] w-full flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-20">
        
        {/* LEFT TEXT */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <p>Design and create</p>
            <span className="text-violet-600 border-r-2 border-white">
              {displayText}
            </span>{" "}
            apps
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-black dark:text-white/80 max-w-md mx-auto lg:mx-0">
            Build beautiful apps with modern UI frameworks. Learn how to design
            and code like a pro.
          </p>
          <button className="mt-6 bg-violet-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold hover:scale-105 transition">
            Start Learning
          </button>
        </div>

        {/* RIGHT IMAGE CAROUSEL */}
        <div className="relative perspective-[1000px] w-[250px] sm:w-[300px] md:w-[350px] h-[220px] sm:h-[260px] md:h-[300px]">
          <div
            className="absolute w-full h-full transition-transform duration-1000"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${angle}deg)`,
            }}
          >
            {images.map((img, i) => {
              const rotate = i * 120;
              const visibleIndex =
                (((-angle / 120) % images.length) + images.length) %
                images.length;
              const isFront = i === Math.round(visibleIndex);
              const opacity = isFront ? 1 : 0.5;

              return (
                <div
                  key={i}
                  className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[90px] sm:w-[120px] md:w-[150px] lg:w-[180] h-[140px] sm:h-[200px] md:h-[240px] lg:h-[280]"
                  style={{
                    transform: `rotateY(${rotate}deg) translateZ(${depth}px)`,
                    transition: "transform 1s, opacity 1s",
                    opacity,
                  }}
                >
                  <Image
                    src={img}
                    alt={`img-${i}`}
                    width={350}
                    height={350}
                    className="w-full h-full object-contain rounded-3xl bg-transparent"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
