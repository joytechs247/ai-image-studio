// ✅ app/api/edit-image/route.ts
export async function POST(req: Request) {
  try {
    const { prompt, images } = await req.json();

    const API_KEY = process.env.OPENROUTER_API_KEY;
    if (!API_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing OpenRouter API key" }),
        { status: 500 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert AI image editor. Analyze the given images and prompt, and if possible, output an edited image as a base64 data URL.",
          },
          {
            role: "user",
            content: `${images.join("\n\n")}\n\nPrompt: ${prompt}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return new Response(JSON.stringify({ error: text }), { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.error("❌ OpenRouter API error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
