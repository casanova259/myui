import localFont from 'next/font/local';
import './globals.css';

// Map exactly to the .otf files in your screenshot
const neueMontreal = localFont({
  src: [
    {
      path: '../../public/fonts/NeueMontreal-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NeueMontreal-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NeueMontreal-Bold.otf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-neue-montreal',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${neueMontreal.variable}`}>
      <body className="font-sans antialiased bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}