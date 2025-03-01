import React, { FC, ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

interface CustomDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}

const CustomDialog: FC<CustomDialogProps> = ({
  isOpen,
  onOpenChange,
  title,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0  bg-black/50 data-[state=open]:animate-none" />
        <Dialog.Content className="fixed z-50 top-[40%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] pt-10 translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="text-2xl font-medium mb-4 text-center text-primaryGray">
            {title || ""}
          </Dialog.Title>
          {children}
          <Dialog.Close asChild>
            <button
              className="absolute top-[10px] right-[10px] inline-flex h-[35px] w-[35px] appearance-none items-center justify-center rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <Cross2Icon className="w-5 h-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CustomDialog;
