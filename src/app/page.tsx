import type React from "react";
import { Features } from "./_components/Features";
import { FAQ } from "./_components/FAQ";
import { Youtube } from "lucide-react";
import { YouTubeForm } from "./_components/YouTubeForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <Youtube className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            AI YouTube Assistant
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Transform any YouTube video into an interactive AI experience. Get
            insights, summaries, and more with just one click.
          </p>
        </div>

        <YouTubeForm />
        <Features />
        <FAQ />
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">
            © 2025 AI YouTube Assistant. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-primary transition">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}