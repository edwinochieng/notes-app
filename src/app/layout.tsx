import Providers from "@/components/Providers";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-gray-100 px-3 sm:px-16 lg:px-36'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
