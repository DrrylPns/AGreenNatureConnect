"use client";
import React from "react";
import { toast } from "@/lib/hooks/use-toast";
import { useState, useTransition } from "react";
import { Input } from "../Ui/Input";
import { Button } from "../Ui/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../Ui/Dialog";
import { replyComment } from "../../../../actions/reply";
import { BiComment } from "react-icons/bi";

interface ReplyCommentDialogProps {
  commentId: string;
  onDelete: () => void;
}

export const ReplyComment: React.FC<ReplyCommentDialogProps> = ({
  commentId,
  onDelete,
}) => {
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex gap-2 items-center justify-center text-[1rem] text-gray-400 px-2 py-1 hover:bg-gray-300"
        >
          <span className="">
            <BiComment />
          </span>
          Reply
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Reply Comment</DialogTitle>

        <Input
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        <Button
          variant="newGreen"
          isLoading={isPending}
          onClick={() => {
            startTransition(() => {
              replyComment(commentId, value).then((data) => {
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
          Reply
        </Button>
      </DialogContent>
    </Dialog>
  );
};
