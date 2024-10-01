import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import { inter } from "./lib/fonts";

export const metadata: Metadata = {
    title: "Azure Deployment",
    description: "Deploying using Azure and Docker",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} antialiased`}
            >
                <Navbar />
                {children}
            </body>
        </html>
    );
}
