type ToastOptions = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function toast({ title, description }: ToastOptions) {
  // version simple pour test local
  console.log("TOAST:", title, description);
  
  // Optionnel : afficher un vrai alert pour visualiser en local
  alert(`${title}${description ? " - " + description : ""}`);
}
