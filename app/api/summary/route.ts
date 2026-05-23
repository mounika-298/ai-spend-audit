import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { tools, savings, useCase } = body;

    const prompt = `
You are an AI cost optimization auditor.

Generate a professional 100-word summary for a founder.

Use:
- Current AI stack: ${JSON.stringify(tools)}
- Estimated monthly savings: $${savings}
- Use case: ${useCase}

Requirements:
- Be realistic
- Explain why savings exist
- Mention optimization opportunities
- Sound professional and investor-ready
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 150,
    });

    const summary =
      completion.choices[0]?.message?.content ||
      "No summary generated.";

    return NextResponse.json({
      summary,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      summary:
        "AI summary generation temporarily unavailable. Your audit results are still valid.",
    });
  }
}