import { Popover, Transition } from "@headlessui/react";
import React, { FC, Fragment } from "react";
import { BiLike, BiComment, BiShare } from "react-icons/bi";
import { FiLink } from "react-icons/fi";
import { motion } from "framer-motion";
import LikeButton from "./LikeButton";
import { useToast } from "@/lib/hooks/use-toast";

interface PostButtonsProps {
  comments: number;
  postId: string;
}

const PostButtons: FC<PostButtonsProps> = ({ postId, comments }) => {
  const { toast } = useToast();
  const copyLinkToClipboard = () => {
    const urlToCopy = window.location.href;

    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = urlToCopy;
    document.body.appendChild(tempInput);

    // Select the text in the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Execute the copy command
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    toast({
      title: "Success!",
      description: "Link Copied",
      variant: "default",
    });
  };

  return (
    <div>
      {/**Like, Comment, Share Buttons */}
      <div className="flex items-center justify-end gap-4 border-t-2 border-gray-300 py-2 md:px-10 px-3">
        <LikeButton postId={postId} />
        <motion.button
          whileTap={{ backgroundColor: "ButtonShadow" }}
          type="button"
          className="flex gap-2 items-center justify-center px-4 py-2 font-poppins font-semibold w-[7rem] rounded-3xl bg-[#F0F2F5] dark:bg-transparent"
        >
          <span className="text-[1.5rem] text-gray-600">
            <BiComment />
          </span>
          <h3>{comments}</h3>
        </motion.button>
        <Popover>
          {({ open }) => (
            <>
              <motion.button
                whileTap={{ backgroundColor: "ButtonShadow" }}
                className="rounded-3xl font-poppins font-semibold w-[7rem]"
              >
                <Popover.Button
                  type="button"
                  className="flex gap-2 items-center px-4 py-2 font-normal w-full rounded-3xl bg-[#F0F2F5] dark:bg-transparent"
                >
                  <span className="text-[1.5rem] text-gray-600">
                    <BiShare />
                  </span>
                  Share
                </Popover.Button>
              </motion.button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute bg-white dark:bg-black z-30 px-2 py-1 text-sm drop-shadow-sm shadow-md rounded-lg">
                  <button
                    onClick={copyLinkToClipboard}
                    className="flex rounded-lg items-center px-4 py-2 gap-3"
                  >
                    <FiLink className="text-[1.5rem]" /> Copy link
                  </button>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default PostButtons;
