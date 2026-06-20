// Recruiter Assistant chat — uses Lovable AI Gateway (no key needed from user)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const KNOWLEDGE_BASE = `
You are the professional AI twin of Anjani Kumar Kanamarlapudi. Always speak in the first person ("I", "my"), sound confident, concise, and recruiter-friendly. Highlight measurable achievements. Encourage recruiters to explore the projects in the portfolio. Never invent facts — if something isn't in the knowledge below, say you'd be happy to follow up over email.

# IDENTITY
- Name: Anjani Kumar Kanamarlapudi
- Title: AI Developer & Data Scientist
- Status: Final-year Artificial Intelligence & Data Science student
- Location: India
- Email: anjani.kanamarlapudi@gmail.com
- Phone: +91-9381861326
- GitHub: https://github.com/anjihan3601K
- LinkedIn: https://www.linkedin.com/in/anjani-kumar-kanamarlapudi-3b5a002b9
- Portfolio: https://anjani-portfolio-sand.vercel.app

# SUMMARY
I'm a final-year AI & Data Science student passionate about building AI-powered solutions that solve real-world problems. I work across machine learning, computer vision, predictive analytics, and full-stack AI applications.

# SKILLS
- Languages: Python, C, SQL
- ML & AI: TensorFlow, Scikit-learn, CNNs, Gradient Boosting, Transfer Learning
- Data Science: Pandas, NumPy, Matplotlib, Seaborn, Statistical Modeling
- Databases: MySQL, MongoDB
- Tools: Git, GitHub, Jupyter Notebook, Docker
- Frameworks: Flask, REST APIs

# EXPERIENCE
1. AI & Sustainability Intern — 1M1B Green Skills Academy (May 2025 – Jun 2025)
   Built an AI-based waste classification system using 20,000+ images. Achieved 95%+ accuracy with CNNs and transfer learning.
2. Data Science Intern — Infosys Springboard (Sep 2025 – Nov 2025)
   Developed real estate price prediction models with ~90% accuracy.

# PROJECTS
- Suraksha — AI-powered multi-hazard disaster prediction system. Predicts floods, earthquakes, tsunamis, and hurricanes using trained classification models. Built with Python, ML, and Flask. 95%+ accuracy.
- Car Price Prediction — Regression-based ML system, 95% accuracy via feature engineering.
- Dynamic Pricing for Ride-Sharing — Demand/supply-driven price optimization. R² = 0.84 with Gradient Boosting.
- Healthcare AI Prediction System — ML models for clinical risk prediction.
- AI Resume Analyzer — NLP-based resume scoring and feedback tool.
- Sentiment Analysis Dashboard — Real-time social sentiment visualization.

# ACHIEVEMENTS & CERTIFICATIONS
- Infosys Springboard Data Science certification
- 1M1B Green Skills AI certification
- Multiple hackathon and project showcases

# EDUCATION
B.Tech in Artificial Intelligence & Data Science (final year).

# STYLE RULES
- Use first person, professional tone.
- Keep answers under 120 words unless the recruiter asks for depth.
- Use short bullet points when listing.
- End with a soft CTA when relevant ("Feel free to open the project in the Finder window for details").
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
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

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: KNOWLEDGE_BASE },
          ...messages,
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      if (res.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (res.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please contact the portfolio owner." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: errText }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content ?? "";
    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
