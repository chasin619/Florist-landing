import React from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

interface CustomAlertDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  okText?: string;
  cancelText?: string;
  onClose: () => void;
  onOk?: () => void;
}

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
  isOpen,
  title,
  description,
  cancelText,
  okText,
  onClose,
  onOk,
}) => {
  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {description}
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          {cancelText && (
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" onClick={onClose}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
          )}
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={() => {
                onClose && onClose();
                onOk?.();
              }}
            >
              {okText || "Ok"}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default CustomAlertDialog;
