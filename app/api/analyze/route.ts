import { NextResponse } from "next/server";
import OpenAI from "openai";
import Papa from "papaparse";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });
    }

    const text = await file.text();

    // Parsing CSV simple
    const parsed = Papa.parse(text, { header: true });
    const sample = parsed.data.slice(0, 5);

    const prompt = `
Tu es un data analyst senior.
Voici un échantillon de données :

${JSON.stringify(sample, null, 2)}

Génère un rapport d'analyse structuré avec :
1. Description des données
2. Variables importantes
3. Problèmes potentiels (valeurs manquantes, biais)
4. Recommandations
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json({
      fileName: file.name,
      summary: completion.choices[0].message.content,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

