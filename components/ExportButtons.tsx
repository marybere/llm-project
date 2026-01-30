export const ExportButtons = ({ results }: any) => {
  return <button disabled={results.length === 0}>Exporter</button>;
};
