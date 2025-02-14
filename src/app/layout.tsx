import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const robotoMono = localFont({
    src: '/fonts/RobotoMono-VariableFont_wght.ttf',
    variable: '--font-roboto-mono',
    weight: '100 900',
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "R&M",
    description: "",
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
        </head>
        <body
            className={`${robotoMono.variable} ${geistMono.variable} antialiased`}
            suppressHydrationWarning={true}
        >
        {children}
        </body>
        </html>
    );
}
