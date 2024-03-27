"use client";
import { toast } from "@/lib/hooks/use-toast";
import useLoginModal from "@/lib/hooks/useLoginModal";
import { CreateLikeType } from "@/lib/validations/createLikeSchema";
import axios from "axios";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";

export default function LikeButton({ postId }: { postId: string }) {
  const { status } = useSession();
  const loginModal = useLoginModal();
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0);

  useEffect(() => {
    getTheNumberOfLikes();
  }, [numberOfLikes]);

  const getTheNumberOfLikes = async () => {
    const response = await axios.get(`/api/user/post/${postId}/likes`);
    const data = response.data;
    setNumberOfLikes(data);
  };

  const likedOrUnlikedPost = async () => {
    const payload: CreateLikeType = {
      postId,
    };
    const response = await axios.post(
      `/api/user/post/${postId}/likes`,
      payload
    );
    const data = response.data;
    console.log(data);
    data === "Liked"
      ? setNumberOfLikes((prev) => prev + 1)
      : setNumberOfLikes((prev) => prev - 1);

    if (data === "Liked") {
      toast({
        description: "You liked the post.",
      });
    } else {
      toast({
        description: "You unliked the post.",
        variant: "destructive",
      });
    }
  };

  function handleClick() {
    likedOrUnlikedPost();
    if (status === "unauthenticated") {
      loginModal.onOpen();
      toast({
        description: "You need to Login or Register first to liked the post.",
        variant: "destructive",
      });
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ backgroundColor: "ButtonShadow" }}
      type="button"
      className="flex gap-2 items-center justify-center px-4 py-2 font-poppins font-semibold w-[7rem] rounded-3xl bg-[#F0F2F5] dark:bg-transparent"
    >
      <span className="text-[1.5rem] text-gray-600">
        <BiLike />
      </span>
      <h3>{numberOfLikes}</h3>
    </motion.button>
  );
}
