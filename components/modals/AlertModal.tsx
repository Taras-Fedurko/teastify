import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button, ButtonProps } from "@/components/ui/button"

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  buttons: ({ text: string } & ButtonProps)[]
}

export function AlertModal({ open, setOpen, title, description, buttons }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {buttons.map(({ text, ...props }) => (
            <Button key={text} {...props}>{text}</Button>
          ))}
         </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
