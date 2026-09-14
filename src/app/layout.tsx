import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude Developer Certification Workbench & Production Cockpit",
  description: "Hands-on engineering workbench for Claude Developer Certification: Anthropic Messages API, Prompt Caching, Multi-Turn Tool Loops, and 7-Day Study Roadmap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('claude-cert-theme');
                  if (saved === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased bg-[var(--color-bg)] text-[var(--color-text-primary)]">
        {/* Central traffic pixel */}
        <img
          src="https://demo-traffic.vercel.app/api/px?p=claude-dev-cockpit"
          alt=""
          width={1}
          height={1}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
        />
        {children}
      </body>
    </html>
  );
}
