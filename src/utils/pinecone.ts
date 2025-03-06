import { Pinecone, RecordId, RecordValues } from "@pinecone-database/pinecone";

export const pc = new Pinecone({
  apiKey: process.env.PINECONE_VECTOR_KEY!,
});

export const INDEX_NAME = "captions";

export const upsertIndex = async (
  indexName: string,
  data: {
    id: RecordId;
    values: RecordValues;
    metadata?: Record<string, any>;
  }
) => {
  const index = pc.Index(indexName);
  await index.upsert([data]);
};

export const queryIndex = async (
  indexName: string,
  query: {
    vector: RecordValues;
    topK?: number;
    includeMetadata?: boolean;
  }
) => {
  const index = pc.Index(indexName);

  return index.query({
    ...query,
    topK: query.topK || 10,
  });
};
