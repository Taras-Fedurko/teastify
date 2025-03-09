import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface FormFeedbackProps {
  message?: string;
  type ?: 'error' | 'success';
}

export function FormFeedback({ message, type }: FormFeedbackProps) {
  if (!message) {
    return null;
  }
  
  return (
    <div className={
      cn(
        "px-2 py-1 text-sm rounded-md flex items-center  gap-x-3 ",
        type === "success" ? "text-emerald-600" : "text-destructive"
      )}
    >
      {type === "success"
        ? <CheckCircledIcon  />
        : <ExclamationTriangleIcon  />}
      <span>{message}</span>
    </div>
  );
}
