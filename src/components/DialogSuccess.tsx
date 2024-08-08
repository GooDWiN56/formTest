import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { IDialogSuccess } from "interfaces";
import { IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

// Диалоговое акно успешного займа
const DialogSuccess: FC<IDialogSuccess> = ({ open, setOpen, text }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    navigate("/person");
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          Поздравляем!
          <IconButton onClick={handleClose} size="small">
            <IconX />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>{text}</DialogContent>
    </Dialog>
  );
};

export default DialogSuccess;
