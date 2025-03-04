import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";

import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: (e: boolean) => void;
  width?: string;
  height?: string;
  title?: string;
}

export function Modal({
  children,
  onClose,
  width = "1000px",
  title,
}: ModalProps) {
  return (
    <Dialog
      modal
      open={true}
      onOpenChange={(e) => {
        onClose(e);
      }}
    >
      <DialogContent className={`sm:max-w-[${width}] w-[${width}]`}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
