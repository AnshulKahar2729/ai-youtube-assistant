"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Link, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function YouTubeForm() {
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!url) {
      setError("Please enter a YouTube URL");
      return;
    }

    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    if (!query) {
      setError("Please enter a question about the video");
      return;
    }

    try {
      // Set loading state
      setIsGenerating(true);

      // Call the API
      const response = await fetch("/api/ask-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl : url, query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to process your request");
      }

      // Redirect to dashboard page after successful API call
      router.push("/chat");
    } catch (err) {
      // Handle errors
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto p-6 md:p-8 shadow-black shadow-sm mb-16 bg-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Ask AI About Any YouTube Video
        </h2>
        <p className="text-slate-600">
          Enter a YouTube URL and your question to get AI-powered insights
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="youtube-url"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            YouTube URL
          </label>
          <Input
            id="youtube-url"
            type="text"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label
            htmlFor="query"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Your Question
          </label>
          <Input
            id="query"
            type="text"
            placeholder="What are the main points discussed in this video?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <Button type="submit" disabled={isGenerating} className="w-full">
          {isGenerating ? (
            <>
              Processing<span className="loading">...</span>
            </>
          ) : (
            <div className="flex items-center justify-center">
              Ask with AI
              <Sparkles className="ml-2 h-5 w-5" />
            </div>
          )}
        </Button>

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </form>
    </Card>
  );
}
