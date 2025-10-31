import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "E-Commerce App",
  description: "Next.js full stack assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {/* Navbar stays outside page content */}
        <Navbar />
        <div className="pt-16 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
