import { embed, tool } from 'ai';
import { db } from '@/lib/db';
import { cosineDistance, desc, gt, sql } from 'drizzle-orm';
import { financialRegulationsOs } from '@/lib/db/schema';
import { fireworks } from '@ai-sdk/fireworks';
import { z } from 'zod';

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll('\\n', ' ');
  const { embedding } = await embed({
    model: fireworks.textEmbeddingModel('nomic-ai/nomic-embed-text-v1.5'),
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  console.log('Finding relevant content for:', userQuery);
  // const { embedding: financialRegulationsOs } = await db
  //   .select()
  //   .from(financialRegulationsOs)
  //   .where(sql`metadata->>'text' = 'Saudi Financial Regulations'`)
  //   .limit(1)
  //   .get();
  const userQueryEmbedded = await generateEmbedding(userQuery);
  const similarity = sql<number>`1 - (${cosineDistance(
    financialRegulationsOs.embedding,
    userQueryEmbedded,
  )})`;
  const similarGuides = await db
    .select({ name: financialRegulationsOs.content, metadata: financialRegulationsOs.metadata, similarity })
    .from(financialRegulationsOs)
    .where(gt(similarity, 0.5))
    .orderBy((t) => desc(t.similarity))
    .limit(5);
  console.log('similarGuides', similarGuides);
  return similarGuides;
};

export const vectorQueryTool = tool({
  description:
    'Query the vector database for relevant content about Saudi financial regulations.',
  parameters: z.object({
    query: z.string(),
  }),
  execute: async ({ query }) => findRelevantContent(query),
});
