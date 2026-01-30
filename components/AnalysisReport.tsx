export type AnalysisResult = {
  fileName: string;
  report: string;
};

export const AnalysisReport = ({ results }: { results: AnalysisResult[] }) => {
  return (
    <div>
      {results.map((r, i) => (
        <div key={i}>
          <h3>{r.fileName}</h3>
          <pre>{r.report}</pre>
        </div>
      ))}
    </div>
  );
};
