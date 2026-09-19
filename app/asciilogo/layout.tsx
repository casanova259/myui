import { DialRoot } from "dialkit";
import "dialkit/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                {children}
                {/* Single global panel — mount once here, not per-component. */}
                <DialRoot />
            </body>
        </html>
    );
}