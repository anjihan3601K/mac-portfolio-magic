// One-shot seeder: embeds all knowledge chunks and upserts them to Pinecone.
// Call with: supabase.functions.invoke('seed-knowledge')
import { KNOWLEDGE_CHUNKS, KNOWLEDGE_VERSION } from "../_shared/knowledge.ts";
import { embed, pineconeConfigured, upsertVectors } from "../_shared/pinecone.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!pineconeConfigured()) {
      return new Response(
        JSON.stringify({ error: "Pinecone env vars not set" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const inputs = KNOWLEDGE_CHUNKS.map((c) => c.text);
    const embeddings = await embed(inputs);

    const vectors = KNOWLEDGE_CHUNKS.map((c, i) => ({
      id: `${KNOWLEDGE_VERSION}:${c.id}`,
      values: embeddings[i],
      metadata: { text: c.text, chunk: c.id, version: KNOWLEDGE_VERSION },
    }));

    await upsertVectors(vectors);

    return new Response(
      JSON.stringify({ ok: true, upserted: vectors.length, version: KNOWLEDGE_VERSION }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
