// import "./globals.css";
// import NavPage from "./Components/Navbar/NavContent";
// import FooterPage from "./Components/Footer/FooterContent";
// import { ThemeProvider } from "next-themes";
// import { Toaster } from 'react-hot-toast';
// export const metadata = {
//   title: "aquirewithash",
//   description: "Swift UI course",
// };

// export default function RootLayout({ children }) {
//   return (
//     // instead of document.documentElement

//     <html lang="en" data-theme="dark" suppressHydrationWarning>
//       <head />
//       <body className="bg-gray-50 dark:bg-gray-950">
//         <ThemeProvider defaultTheme="dark" enableSystem>
//           <section className="sticky top-0 z-50 bg-black">
//           <NavPage/>
//           </section>
//        <section className="">
//        {children}
//        </section>
//           <FooterPage />
//           <Toaster position="top-right" />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "aquirewithash",
  description: "Swift UI course",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-950">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
