import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { RoleProvider } from "@/context/RoleContext";

export const metadata: Metadata = {
  title: "ProCure AI | Defense Intelligence Portal",
  description: "Sophisticated AI-powered Tender Evaluation and Strategic Eligibility Analysis for Defense Procurement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="h-full flex overflow-hidden bg-[#F8FAFC]">
        <RoleProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopNav />
            <main className="flex-1 overflow-y-auto p-4 lg:p-6">
              {children}
            </main>
          </div>
        </RoleProvider>
      </body>
    </html>
  );
}

