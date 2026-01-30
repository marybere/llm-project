export const FileUpload = ({ onFilesSelected, isProcessing }: any) => {
  return (
    <input
      type="file"
      multiple
      disabled={isProcessing}
      onChange={(e) => {
        if (!e.target.files) return;
        onFilesSelected(Array.from(e.target.files));
      }}
    />
  );
};

export const FileList = ({ files, onRemove }: any) => {
  return (
    <ul>
      {files.map((file: File, i: number) => (
        <li key={i}>
          {file.name} <button onClick={() => onRemove(i)}>Supprimer</button>
        </li>
      ))}
    </ul>
  );
};
