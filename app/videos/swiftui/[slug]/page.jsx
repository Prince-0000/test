import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return [
    { slug: 'introduction-to-swiftui' },
    { slug: 'custom-layouts' },
    { slug: 'animations' },
  ];
}

export  default async function Page({ params }) {
  const { slug } = await params;

  const articleData = {
    'introduction-to-swiftui': {
      title: 'Introduction to SwiftUI',
      content: 'SwiftUI is a modern UI framework by Apple for building user interfaces across all Apple platforms.',
    },
    'custom-layouts': {
      title: 'Custom Layouts in SwiftUI',
      content: 'Learn how to build and manage custom layouts in SwiftUI using stacks, frames, and GeometryReader.',
    },
    'animations': {
      title: 'Animations in SwiftUI',
      content: 'Explore SwiftUI\'s powerful and easy-to-use animation system.',
    },
  };

  if (!articleData[slug]) {
    notFound();
  }

  const { title, content } = articleData[slug];

  return (
    <div className="p-6 max-w-3xl mx-auto text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg leading-relaxed">{content}</p>
    </div>
  );
}
