import captionsScraper from "youtube-captions-scraper";
import { INDEX_NAME, pc, upsertIndex } from "./pinecone";
import { getEmbedding } from "./gemini";

// Function to extract video ID from a YouTube URL
function extractVideoId(url: string) {
  try {
    const urlObj = new URL(url);
    let videoId = null;

    if (
      urlObj.hostname.includes("youtube.com") ||
      urlObj.hostname.includes("m.youtube.com")
    ) {
      videoId = urlObj.searchParams.get("v"); // Extracts "v" parameter from URL
    } else if (urlObj.hostname.includes("youtu.be")) {
      videoId = urlObj.pathname.substring(1); // Extracts video ID from shortened URL
    } else if (
      urlObj.hostname.includes("youtube.com") &&
      urlObj.pathname.includes("/embed/")
    ) {
      videoId = urlObj.pathname.split("/embed/")[1]; // Extracts video ID from embed URL
    }

    if (!videoId) {
      throw new Error("Invalid YouTube URL format");
    }

    return videoId;
  } catch (error) {
    console.error("Error extracting Video ID:", error);
    return null;
  }
}

export async function getCaptions(videoUrl: string, lang = "en") {
  try {
    const videoId = extractVideoId(videoUrl);
    console.log({ videoId });
    if (!videoId) {
      console.error("Invalid YouTube URL");
      return;
    }

    // Get captions
    const captions = await captionsScraper.getSubtitles({
      videoID: videoId,
      lang: lang, // Change language code if needed
    });

    console.log({ captions });

    // Format captions with timestamps
    captions.forEach((caption) => {
      console.log(`[${caption.start}s] ${caption.text}`);
    });

    const formattedCaptions = captions.map((caption) => ({
      text: caption.text,
      start: parseFloat(caption.start.toString()), // Convert to number
      duration: parseFloat(caption.dur.toString()), // Convert to number
    }));

    return formattedCaptions;
  } catch (error) {
    console.error("Error fetching captions:", error);
  }
}
export async function storeCaptions(
  captions: { text: string; start: number }[]
) {
  try {
    // Store captions in a database
    console.log("Storing captions:", captions);
    const index = pc.Index(INDEX_NAME);
    if(!index) {
      console.error("Index not found");
      return;
    }

    for (const caption of captions) {
      const embeddings = await getEmbedding(caption.text);

      // Use the first embedding
      // Store in Pinecone
      await upsertIndex(INDEX_NAME, {
        id: `caption-${caption.start}`,
        values: embeddings,
        metadata: { text: caption.text, start: caption.start },
      });
    }

    return captions;
  } catch (error) {
    console.error("Error storing captions:", error);
    throw error;
  }
}
