import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Village Square",
  description:
    "A civic engagement platform prototype for residents and local representatives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="site-header__inner">
            <Link className="site-header__brand" href="/">
              Village Square
            </Link>
            <nav className="site-nav" aria-label="Primary navigation">
              <Link href="/">Home</Link>
              <Link href="/issues">Local priorities</Link>
              <Link href="/sign-in">Prototype sign in</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="site-footer__inner">
            <p>
              Village Square is a civic engagement prototype. It is not an
              official GOV.UK service.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
