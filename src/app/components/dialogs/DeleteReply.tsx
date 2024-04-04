import { FC, Fragment, useState, useTransition } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "@/lib/hooks/use-toast";
import { deleteReply } from "../../../../actions/reply";

interface DeleteDialogProps {
  replyId: string;
  onDelete: () => void;
}

const DeleteDialog: FC<DeleteDialogProps> = ({ replyId, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  let isTrue = false;
  const router = useRouter();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="flex gap-1 hover:underline w-full"
        >
          <AiOutlineDelete /> Delete
        </button>
      </div>

      {/* Delete confirmation dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Are you sure you want to delete your reply?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This will permanently remove your reply from the post
                  </p>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  {/* Button to confirm deletion */}
                  <button
                    type="button"
                    disabled={isPending}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      startTransition(() => {
                        deleteReply(replyId).then((callback) => {
                          if (callback.error) {
                            toast({
                              description: callback.error,
                              variant: "destructive",
                            });
                          }

                          if (callback.success) {
                            toast({
                              description: callback.success,
                            });
                            onDelete();
                          }
                        });
                      });
                    }}
                  >
                    Yes
                  </button>
                  {/* Button to cancel deletion */}
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteDialog;
