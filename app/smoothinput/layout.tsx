// app/layout.tsx
import { DialRoot } from "dialkit";
import "dialkit/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <DialRoot />
      </body>
    </html>
  );
}