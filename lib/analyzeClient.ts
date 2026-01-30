import { AnalysisResult } from "@/components/AnalysisReport";

export async function analyzeFile(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erreur analyse backend");
  }

  return res.json();
}
