"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { UploadBox } from "@/components/UploadBox";
import { ResultBox } from "@/components/ResultBox";

export default function Home() {
  const [result, setResult] = useState("");

  async function handleAnalyze(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.result || "Analyse terminée.");
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6">
      <Header />
      <UploadBox onAnalyze={handleAnalyze} />
      {result && <ResultBox result={result} />}
    </main>
  );
}

