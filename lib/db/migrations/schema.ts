import { pgTable, index, unique, serial, text, vector, jsonb } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const financialRegulationsOs = pgTable("financial_regulations_os", {
	id: serial().primaryKey().notNull(),
	vectorId: text("vector_id").notNull(),
	embedding: vector({ dimensions: 768 }),
	metadata: jsonb().default({}),
},
(table) => {
	return {
		vectorIdx: index("financial_regulations_os_vector_idx").using("ivfflat", table.embedding.asc().nullsLast().op("vector_cosine_ops")).with({lists: "100"}),
		financialRegulationsOsVectorIdKey: unique("financial_regulations_os_vector_id_key").on(table.vectorId),
	}
});