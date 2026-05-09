"use server"

export async function chatCompletion(messages: { role: string; content: string }[]) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  // Fallback to a highly reliable model if the primary one fails
  const model = "inclusionai/ring-2.6-1t:free"; 

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
        messages: messages,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("OPENROUTER API ERROR:", data.error);
      throw new Error(data.error.message || "AI Provider Error");
    }

    if (!data.choices || data.choices.length === 0) {
      console.error("OPENROUTER EMPTY RESPONSE:", data);
      throw new Error("AI returned an empty response.");
    }

    return data.choices[0].message.content;
  } catch (error: any) {
    console.error("OpenRouter Action Error:", error);
    throw new Error(error.message || "Failed to get AI completion");
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
        messages: [
          { role: "system", content: "You are a senior recruiter analyzer. Return only valid JSON." }, 
          { role: "user", content: analysisPrompt }
        ],
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || "Analysis API Error");
    }

    return JSON.parse(data.choices[0].message.content);
  } catch (error: any) {
    console.error("Analysis Error:", error);
    throw new Error(error.message || "Failed to analyze interview");
  }
}
