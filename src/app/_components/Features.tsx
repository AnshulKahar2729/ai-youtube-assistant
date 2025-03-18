import { Card } from "@/components/ui/card";
import { Link, Sparkles, Youtube } from "lucide-react";

export function Features() {
    const features = [
      {
        title: "AI-Powered Summaries",
        description:
          "Get concise summaries of any video content without watching the entire video.",
        icon: <Sparkles className="h-10 w-10 text-primary" />,
      },
      {
        title: "Interactive Timestamps",
        description:
          "Jump to specific parts of the video based on content and topics.",
        icon: <Link className="h-10 w-10 text-primary" />,
      },
      {
        title: "Smart Q&A",
        description:
          "Ask questions about the video and get instant answers from our AI.",
        icon: <Youtube className="h-10 w-10 text-primary" />,
      },
    ];
  
    return (
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our AI assistant transforms how you interact with YouTube videos
          </p>
        </div>
  
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    );
  }