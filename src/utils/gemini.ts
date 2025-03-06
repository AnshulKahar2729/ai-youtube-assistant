import { GoogleGenerativeAI } from "@google/generative-ai";
import { streamText } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getEmbedding(text: string) {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const result = await model.embedContent(text);
  return result.embedding.values; // Returns an array of embeddings
}

export async function generateResponse(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  const answer = result.response.candidates
    ?.map((candidate) =>
      candidate.content.parts.map((part) => part.text).join("")
    )
    .join("\n");
  console.log(JSON.stringify(result, null, 2));
  return answer;
}
