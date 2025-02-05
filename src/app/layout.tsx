// import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
// import '@fortawesome/fontawesome-svg-core/styles.css';
// import { config } from '@fortawesome/fontawesome-svg-core';
// config.autoAddCss = false;
// import '@/styles/globals.css';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

// export const metadata: Metadata = {
//   title: 'OiDiVi Helper - Find & Offer Services',
//   description: 'A platform to connect users and helpers securely.',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" dir="ltr">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <div className="min-h-screen flex flex-col">
//           {/* Header */}
//           {/* <header className="bg-gradient-to-r from-red-500 to-black text-white">
//             <div className="w-full mx-auto px-4 py-6 flex justify-between items-center">
//               <h1 className="text-2xl font-bold">OiDiVi Helper</h1>
//               <nav>
//                 <ul className="flex space-x-4">
//                   <li>
//                     <a href="/find-services" className="hover:underline">
//                       Find Services
//                     </a>
//                   </li>
//                   <li>
//                     <a href="/offer-services" className="hover:underline">
//                       Offer Services
//                     </a>
//                   </li>
//                   <li>
//                     <a href="/login" className="hover:underline">
//                       Log In
//                     </a>
//                   </li>
//                   <li>
//                     <a href="/register" className="hover:underline">
//                       Register
//                     </a>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           </header> */}

//           {/* Main Content */}
//           <main className="flex-grow overflow-y-auto">{children}</main>

//           {/* Footer */}
//           {/* <footer className="bg-gradient-to-r from-black to-red-500 text-white text-center py-4">
//             <p className="text-sm">
//               © 2025 OiDiVi Helper. All rights reserved.
//             </p>
//           </footer> */}
//         </div>
//       </body>
//     </html>
//   );
// }


import '@/styles/globals.css';  // Esto importa el archivo con los estilos globales

import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
