import "./globals.css";
import { ReactNode } from "react";
import { GlobalStateProvider } from "./GlobalStateProvider"; // 👈 import


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalStateProvider>
          {children}
        </GlobalStateProvider>
      </body>
    </html>
  );
}