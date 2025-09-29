"use client"

import React, { useEffect, useRef, useState } from 'react';

const NAVBAR_HEIGHT = 64;

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'features', label: 'Features' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
];

export default function SidebarPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const contentRef = useRef(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el && contentRef.current) {
      const contentTop = contentRef.current.getBoundingClientRect().top;
      const elementTop = el.getBoundingClientRect().top;
      const scrollOffset =
        elementTop - contentTop + contentRef.current.scrollTop - NAVBAR_HEIGHT;

      contentRef.current.scrollTo({ top: scrollOffset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleScroll = () => {
      const sectionOffsets = sections.map((section) => {
        const el = document.getElementById(section.id);
        if (!el) return { id: section.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        const contentTop = content.getBoundingClientRect().top;
        return {
          id: section.id,
          top: Math.abs(rect.top - contentTop - NAVBAR_HEIGHT),
        };
      });

      const closest = sectionOffsets.reduce((prev, curr) =>
        curr.top < prev.top ? curr : prev
      );
      setActiveSection(closest.id);
    };

    content.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => content.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-black border-2 border-gray-600 rounded-4xl  m-6 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white p-6 sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto border-r border-gray-600 ">
        <ul className="space-y-4">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`pl-2 border-l-4 ${
                  activeSection === section.id
                    ? 'border-violet-700 text-violet-700 font-bold'
                    : 'border-transparent'
                } hover:underline`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Scrollable Content */}
      <main
  ref={contentRef}
  className="w-3/4 overflow-y-auto p-10 space-y-24 h-[calc(100vh-64px)] text-white bg-black rounded-r-4xl hide-scrollbar"
>
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="min-h-[80vh] scroll-mt-[64px]"
          >
            <h2 className="text-3xl font-bold mb-4">{section.label}</h2>
            <p className="text-gray-400">
              This is the content for {section.label}.
              <br />
              Scroll to see the sidebar highlight change.
            </p>
          </section>
        ))}
      </main>
    </div>
  );
}
