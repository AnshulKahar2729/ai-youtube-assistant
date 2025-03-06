import { getCaptions } from "@/utils/captions";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { videoUrl } = await req.json();
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

  return NextResponse.json({ captions });
};
