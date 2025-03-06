import { getCaptions, storeCaptions } from "@/utils/captions";
import { getAnswer } from "@/utils/query";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  // Extract captions from video
  const {
    videoUrl,
    query,
  }: {
    videoUrl: string;
    query: string;
  } = await req.json();
  console.log({ videoUrl });
  let captions = null;

  const startTime = Date.now();
  captions = await getCaptions(videoUrl, "en");
  const endTime = Date.now();
  const executionTime = endTime - startTime;
  console.log(`getCaptions execution time: ${executionTime}ms`);

  if (!captions) {
    return NextResponse.json(
      { error: "Error fetching captions" },
      { status: 500 }
    );
  }

  // store the embeddings in the captions object
  // await storeCaptions(captions);

  // answer the query
  const answer = await getAnswer(query, captions);

  return NextResponse.json({ answer: answer });
};
