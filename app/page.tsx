"use client"; // important pour Next.js App Router si tu utilises useState

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { FileUpload, FileList } from "@/components/FileUpload";
import { AnalysisReport, type AnalysisResult } from "@/components/AnalysisReport";
import { AnalysisProgress } from "@/components/AnalysisProgress";
import { ExportButtons } from "@/components/ExportButtons";
import { EmptyState } from "@/components/EmptyState";

// **ici ton nouveau client backend**
import { analyzeFile } from "@/lib/analyzeClient";

import { toast } from "@/hooks/use-toast";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    setIsProcessing(true);
    setCompletedCount(0);

    toast({
      title: "Analyse en cours",
      description: `${newFiles.length} fichier(s) en cours de traitement...`,
    });

    try {
      const newResults: AnalysisResult[] = [];
      
      for (const file of newFiles) {
        const result = await analyzeFile(file);
        newResults.push(result);
        setCompletedCount(prev => prev + 1);
      }
      
      setResults(prev => [...prev, ...newResults]);
      
      toast({
        title: "Analyse terminée",
        description: `${newFiles.length} fichier(s) analysé(s) avec succès !`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'analyse.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setResults(prev => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-glow)', opacity: 0.5 }}
      />
      
      <Header />
      
      <main className="container mx-auto px-6 py-12 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Analysez vos données</span>
              <br />
              <span className="gradient-text">en quelques secondes</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Importez vos fichiers et laissez notre IA générer des rapports d'analyse clairs et exploitables.
            </p>
          </motion.div>

          <div className="mb-8">
            <FileUpload onFilesSelected={handleFilesSelected} isProcessing={isProcessing} />
          </div>

          <AnimatePresence>
            {files.length > 0 && (
              <motion.div className="mb-8" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Fichiers importés ({files.length})
                </h2>
                <FileList files={files} onRemove={handleRemoveFile} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isProcessing && <AnalysisProgress isProcessing={isProcessing} fileCount={files.length} completedCount={completedCount} />}
          </AnimatePresence>

          <div className="mt-12">
            <AnimatePresence mode="wait">
              {results.length > 0 ? (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                      <span className="w-1 h-8 bg-primary rounded-full" />
                      Rapports d'analyse
                    </h2>
                    <ExportButtons results={results} />
                  </div>
                  <AnalysisReport results={results} />
                </motion.div>
              ) : !isProcessing && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <EmptyState />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

