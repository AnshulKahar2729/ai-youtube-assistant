import {
  RecordMetadata,
  ScoredPineconeRecord,
} from "@pinecone-database/pinecone";
import { generateResponse, getEmbedding } from "./gemini";
import { INDEX_NAME, queryIndex } from "./pinecone";

export const getAnswer = async (query: string, captions: any) => {
  // Get embeddings for the query
  // const queryEmbeddings = await getEmbedding(query);

  // index the query
  // const { matches } = await queryIndex(INDEX_NAME, {
  //   vector: queryEmbeddings,
  //   topK: 1,
  //   includeMetadata: true,
  // });

  // get the answer from the ai with the relevant caption
  // console.log({ matches });

  const answer = await getAnswerFromAI([], query, captions);
  console.log({ answer });
  return answer;
};

export const getAnswerFromAI = async (
  matches: ScoredPineconeRecord<RecordMetadata>[],
  query: string,
  captions: any
) => {
  // Get the relevant caption
  const matchedCaptions = matches.map((match) => ({
    text: match.metadata?.text,
    start: match.metadata?.start,
    embeddings: match.values,
  }));

  console.log({ matchedCaptions });

  const PROMPT = `
    You are a highly intelligent AI designed to answer user questions about YouTube videos by retrieving relevant captions from the transcript. You must:

Understand the User Query - Analyze the user's question and determine which part of the video contains relevant information.
Retrieve Relevant Captions - Search for the most relevant transcript segments based on semantic meaning.
Include Timestamps - For every response, include the exact timestamp(s) where the information is found in the video.
Be Concise Yet Informative - Summarize the retrieved captions into a well-structured answer.
Maintain Context - If multiple segments are needed, merge them logically while keeping timestamps intact.
Indicate Missing Information - If the requested information is not found in the captions, politely inform the user.
Timestamp formatting: Always use mm:ss format for clarity.
No hallucinations: The AI should only answer based on retrieved captions.
  
  Below is the user query 
  ${query}

    The relevant caption with the timestamp is
    ${captions.map((caption: any) => `${caption.text} at ${caption.start}s`)}
  `;

  console.log({ PROMPT });

  const response = await generateResponse(PROMPT);

  return response;
};
