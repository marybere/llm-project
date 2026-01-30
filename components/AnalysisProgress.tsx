export const AnalysisProgress = ({ isProcessing, fileCount, completedCount }: any) => {
  return (
    <div>
      {isProcessing && (
        <p>Analyse en cours : {completedCount} / {fileCount}</p>
      )}
    </div>
  );
};
