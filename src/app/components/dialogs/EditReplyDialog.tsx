"use client";

import { toast } from "@/lib/hooks/use-toast";
import React, { useState, useTransition } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { editReply } from "../../../../actions/reply";
import { Button } from "../Ui/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../Ui/Dialog";
import { Input } from "../Ui/Input";

interface EditReplyDialogProps {
  replyId: string;
  text: string;
  onDelete: () => void;
}

export const EditReplyDialog: React.FC<EditReplyDialogProps> = ({
  replyId,
  text,
  onDelete,
}) => {
  const [value, setValue] = useState<string>(text);
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="flex gap-1 hover:underline w-full">
          <AiOutlineEdit /> Edit
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit replyt</DialogTitle>
        <Input
          defaultValue={text}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        <Button
          variant="newGreen"
          isLoading={isPending}
          onClick={() => {
            startTransition(() => {
              editReply(replyId, value).then((data) => {
                if (data.error) {
                  toast({
                    description: data.error,
                    variant: "destructive",
                  });
                }

                if (data.success) {
                  toast({
                    description: data.success,
                  });
                  onDelete();
                }
              });
            });
          }}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};
