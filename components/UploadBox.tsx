"use client";

import { useState } from "react";

export function UploadBox({ onAnalyze }: { onAnalyze: (file: File) => void }) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="w-full max-w-xl mx-auto p-8 border-2 border-dashed border-purple-400 rounded-xl bg-gradient-to-br from-purple-50 to-violet-100 shadow-lg flex flex-col items-center transition hover:border-purple-600">
      <label className="flex flex-col items-center cursor-pointer w-full">
        <span className="text-purple-700 mb-3">
          <svg width="50" height="50" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="block text-2xl font-bold mb-2 text-purple-900">Importer un fichier CSV</span>
        <span className="text-sm text-purple-700 mb-6 font-medium">Glissez-déposez ou cliquez pour sélectionner</span>
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) setFile(e.target.files[0]);
          }}
        />
        <div className="w-full h-14 flex items-center justify-center bg-white border-2 border-purple-300 rounded-lg mb-6 shadow-sm">
          {file ? (
            <span className="text-purple-900 text-sm font-medium truncate px-4">{file.name}</span>
          ) : (
            <span className="text-purple-500 text-sm">Aucun fichier sélectionné</span>
          )}
        </div>
      </label>
      <button
        disabled={!file}
        onClick={() => file && onAnalyze(file)}
        className="mt-2 w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-4 rounded-lg font-bold shadow-lg hover:from-purple-700 hover:to-violet-700 transition disabled:opacity-40 disabled:cursor-not-allowed text-lg"
      >
        <span className="inline-flex items-center gap-2">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Lancer l'analyse
        </span>
      </button>
    </div>
  );
}
