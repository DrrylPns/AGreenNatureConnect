import { Popover } from "@headlessui/react";
import React, { FC, useEffect, useState, useRef } from "react";
import { BiComment, BiShare } from "react-icons/bi";
import { motion } from "framer-motion";
import { useToast } from "@/lib/hooks/use-toast";
import axios from "axios";
import { Comment, PostTypes } from "@/lib/types";
import { useSession } from "next-auth/react";
import useLoginModal from "@/lib/hooks/useLoginModal";
import { ReactionButton } from "./ReactionButton";
import { ReactionList } from "./ReactionList";
import Link from "next/link";
import { CiShare2 } from "react-icons/ci";

interface PostButtonsProps {
  postId: string;
  comments: Comment[];
}

const PostButtons: FC<PostButtonsProps> = ({ postId, comments }) => {
  const { status } = useSession();
  const loginModal = useLoginModal();
  const { toast } = useToast();
  const [post, setPost] = useState<PostTypes | null>(null); // Assuming you have a Post type
  const [totalComments, setTotalComments] = useState<number>(comments.length)
  useEffect(() => {
    getPostDetails();
    updateTotalComments()
  }, []);

  const getPostDetails = async () => {
    try {
      const response = await axios.get(`/api/user/post/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error("Failed to fetch post details", error);
    }
  };

  const copyLinkToClipboard = async () => {
    if (!post) {
      console.error("Post details not available");
      return;
    }

    const urlToCopy = `${window.location.origin}/discussion/${post.topic.name}/${post.id}?postId=${post.id}`;

    try {
      await navigator.clipboard.writeText(urlToCopy);
      toast({
        title: "Share Success!",
        description: "Link Copied",
        variant: "default",
      });
    } catch (err) {
      console.error("Failed to copy link to clipboard", err);
      toast({
        title: "Share Failed!",
        description: "Unable to copy link",
        variant: "destructive",
      });
    }
  };

  function handleClick() {
    if (status === "unauthenticated") {
      loginModal.onOpen();
      toast({
        description:
          "You need to Login or Register first to share the link post.",
        variant: "destructive",
      });
    } else {
      copyLinkToClipboard();
    }
  }

  const updateTotalComments = () => {
    let total = comments.length;
    comments.forEach((comment) => {
      total += comment.replyOnComent.length;
    });
    setTotalComments(total);
  };

  return (
    <div className="border-t-4 border-gray-300 dark:border-[#18191A] py-3 sm:flex items-center">

      <ReactionList postId={postId} />

      {/**Like, Comment, Share Buttons */}
      <div className="flex items-center justify-end gap-4 py-2 md:px-10 px-3">
        {/* <LikeButton postId={postId} /> */}
        <ReactionButton postId={postId} />

        <Popover>
          <>
          <Link
            href={{
              pathname: `/discussion/${post?.topic.name}/${post?.id}`,
              query: { postId: post?.id },
            }}
            className="flex gap-2 items-center justify-center px-4 py-2 font-poppins font-semibold w-full rounded-3xl bg-[#F0F2F5] dark:bg-transparent dark:border dark:border-zinc-500 dark:hover:opacity-80"
          >
          <span className="text-[1.5rem] text-gray-600 dark:text-white">
            <BiComment />
          </span>
          <h3 className="hidden md:block">{totalComments}</h3>
        </Link>
          </>
        </Popover>
        
        <Popover>
          <>
            <motion.button
              whileTap={{ backgroundColor: "ButtonShadow" }}
              className="rounded-3xl w-full font-poppins font-semibold dark:bg-transparent dark:border dark:border-zinc-500 dark:hover:opacity-80"
            >
              <Popover.Button
                type="button"
                className="flex gap-2 items-center px-4 py-2 font-normal w-full rounded-3xl bg-[#F0F2F5] dark:bg-transparent"
                onClick={handleClick}
              >
                <span className="text-[1.5rem] text-gray-600 dark:text-white">
                  <CiShare2 />
                </span>
                <h3 className="hidden md:block">Share</h3>
              </Popover.Button>
            </motion.button>
          </>
        </Popover>
      </div>
    </div>
  );
};

export default PostButtons;
