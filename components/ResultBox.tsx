export function ResultBox({ result }: { result: string }) {
  return (
    <div className="w-full max-w-xl mx-auto mt-10 p-8 bg-gradient-to-br from-purple-50 to-violet-100 border-2 border-purple-200 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-purple-900">
        Résultat de l'analyse
      </h2>
      <pre className="text-sm text-purple-800 whitespace-pre-wrap bg-white p-4 rounded-lg border border-purple-200 shadow-sm">
        {result}
      </pre>
    </div>
  );
}
