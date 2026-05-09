"use server"

export async function chatCompletion(messages: { role: string; content: string }[]) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = "inclusionai/ring-2.6-1t:free";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://interview-iq.com", // Replace with your domain
        "X-Title": "InterviewIQ",
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter Error:", error);
    throw new Error("Failed to get AI completion");
  }
}

export async function analyzeInterview(transcript: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = "inclusionai/ring-2.6-1t:free";
  
  const analysisPrompt = `
    Analyze this interview transcript and return a JSON performance report.
    Transcript: ${transcript}
    
    Output JSON format:
    {
      "overallScore": 0-100,
      "scores": { "technical": 0-100, "communication": 0-100, "confidence": 0-100, "problemSolving": 0-100 },
      "feedback": "...",
      "strengths": ["...", "..."],
      "weaknesses": [{ "title": "...", "desc": "...", "impact": "High|Medium|Low" }],
      "recommendations": ["...", "..."]
    }
  `;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://interview-iq.com",
        "X-Title": "InterviewIQ",
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "system", content: "You are a senior recruiter analyzer. Return only JSON." }, { role: "user", content: analysisPrompt }],
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error("Analysis Error:", error);
    throw new Error("Failed to analyze interview");
  }
}
