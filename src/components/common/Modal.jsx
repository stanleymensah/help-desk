import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) {
  const sizeClassMap = {
    sm: "sm:max-w-md",
    md: "sm:max-w-xl",
    lg: "sm:max-w-3xl",
    xl: "sm:max-w-5xl",
    full: "sm:max-w-[90vw]",
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      <DialogContent
        showCloseButton={false}
        className={`max-h-[90vh] overflow-y-auto gap-2 px-3 py-2 text-xs ${sizeClassMap[size] || sizeClassMap.md}`}
      >
        <DialogHeader className="flex-row items-center justify-between gap-3">
          <DialogTitle className="text-sm">{title}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon-sm">
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}