import { Card } from "@/components/ui/card";

export function FAQ() {
    const faqs = [
      {
        question: "How does the AI YouTube Assistant work?",
        answer:
          "Our assistant uses advanced AI to analyze video content, generate summaries, create interactive timestamps, and answer questions about the video content.",
      },
      {
        question: "Is there a limit to how many videos I can process?",
        answer:
          "Free accounts can process up to 5 videos per day. Premium subscribers get unlimited video processing.",
      },
      {
        question: "Does it work with private or unlisted videos?",
        answer:
          "Yes, as long as you have access to the video, our assistant can process it.",
      },
      {
        question: "What languages are supported?",
        answer:
          "Currently, we support English, Spanish, French, German, and Japanese, with more languages coming soon.",
      },
    ];
  
    return (
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Got questions? We've got answers
          </p>
        </div>
  
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-xl font-medium mb-2">{faq.question}</h3>
              <p className="text-slate-600">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </div>
    );
  }