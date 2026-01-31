export type AnalysisResult = {
  summary: string;
  insights?: string[];
  stats?: Record<string, number>;
};
