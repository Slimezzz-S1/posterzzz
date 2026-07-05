import type { Metadata } from "next"
import "./globals.css"
import { GeistPixelSquare } from "geist/font/pixel"

import Header from "./header"
import Footer from "./footer"

export const metadata: Metadata = {
  title: "PosterZZZ",
  description: "Post things anonymously!",
}

export default function RootLayout({ children }: Readonly<{ children : React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistPixelSquare.variable} h-full`}
    >
      <body>
        <div className="flex flex-col min-h-screen max-w-5xl w-screen mx-auto">
          <Header />

          {children}

          <Footer />
        </div>
      </body>
    </html>
  );
}
