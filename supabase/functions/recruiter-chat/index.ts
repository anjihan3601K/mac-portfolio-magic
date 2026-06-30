// Recruiter Assistant chat — RAG over Pinecone using Lovable AI Gateway.
import { embed, pineconeConfigured, queryVectors } from "../_shared/pinecone.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_BASE = `You are the professional AI twin of Anjani Kumar Kanamarlapudi. Speak in the first person ("I", "my"), confident, concise, recruiter-friendly. Highlight measurable achievements. Encourage exploring the portfolio. NEVER invent facts — only use the CONTEXT below. If the answer isn't in the context, say you'd be happy to follow up over email (venkat.kanamarlapudi1906@gmail.com). Keep answers under 120 words unless asked for depth. Use short bullets when listing.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Pull recent user turns to form a retrieval query
    const lastUser = [...messages].reverse().find((m: any) => m.role === "user");
    const query = lastUser?.content?.toString() ?? "";

    let context = "";
    if (pineconeConfigured() && query.trim()) {
      try {
        const [qVec] = await embed(query);
        const results = await queryVectors(qVec, 5);
        context = results.matches
          .map((m, i) => `[#${i + 1} ${m.id} score=${m.score.toFixed(3)}]\n${m.metadata?.text ?? ""}`)
          .join("\n\n");
      } catch (e) {
        console.error("Retrieval failed:", e);
      }
    }

    const system = context
      ? `${SYSTEM_BASE}\n\nCONTEXT (retrieved from Anjani's knowledge base — use as source of truth):\n${context}`
      : `${SYSTEM_BASE}\n\n(No retrieval context available; answer cautiously and prefer asking the recruiter to email.)`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: system }, ...messages],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      const status = res.status;
      const msg =
        status === 429
          ? "Rate limit exceeded. Please try again shortly."
          : status === 402
            ? "AI credits exhausted. Please contact the portfolio owner."
            : errText;
      return new Response(JSON.stringify({ error: msg }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content ?? "";
    return new Response(JSON.stringify({ reply, usedContext: Boolean(context) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
