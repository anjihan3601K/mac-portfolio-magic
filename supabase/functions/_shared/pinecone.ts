// Tiny Pinecone REST client (no SDK). Works against the per-index host URL.

const HOST = Deno.env.get("PINECONE_INDEX_HOST");
const API_KEY = Deno.env.get("PINECONE_API_KEY");

function normalizeHost(host: string) {
  if (host.startsWith("http")) return host.replace(/\/+$/, "");
  return `https://${host.replace(/\/+$/, "")}`;
}

export function pineconeConfigured() {
  return Boolean(HOST && API_KEY);
}

async function call(path: string, body: unknown) {
  if (!HOST || !API_KEY) throw new Error("Pinecone env vars missing");
  const res = await fetch(`${normalizeHost(HOST)}${path}`, {
    method: "POST",
    headers: {
      "Api-Key": API_KEY,
      "Content-Type": "application/json",
      "X-Pinecone-API-Version": "2024-07",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pinecone ${path} ${res.status}: ${text}`);
  }
  return res.json();
}

export type PineconeVector = {
  id: string;
  values: number[];
  metadata?: Record<string, unknown>;
};

export async function upsertVectors(vectors: PineconeVector[], namespace = "anjani") {
  return call("/vectors/upsert", { vectors, namespace });
}

export async function queryVectors(
  values: number[],
  topK = 4,
  namespace = "anjani",
) {
  return call("/query", {
    vector: values,
    topK,
    namespace,
    includeMetadata: true,
  }) as Promise<{
    matches: { id: string; score: number; metadata?: { text?: string } }[];
  }>;
}

const EMBED_URL = "https://ai.gateway.lovable.dev/v1/embeddings";

export async function embed(input: string | string[]): Promise<number[][]> {
  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) throw new Error("LOVABLE_API_KEY missing");
  const res = await fetch(EMBED_URL, {
    method: "POST",
    headers: {
      "Lovable-API-Key": key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/text-embedding-3-small",
      input,
      dimensions: 1024,
    }),
  });
  if (!res.ok) {
    throw new Error(`Embed ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  return data.data.map((d: { embedding: number[] }) => d.embedding);
}
