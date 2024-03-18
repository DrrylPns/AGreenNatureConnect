import { LucideAlertTriangle } from 'lucide-react';

interface FormErrorProps {
  message?: string;
};

export const FormError = ({
  message,
}: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 dark:bg-destructive/50 dark:text-white p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <LucideAlertTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};