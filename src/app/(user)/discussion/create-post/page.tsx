import Editor from "@/app/components/(user)/Editor";
import { Button } from "@/app/components/Ui/Button";
import React from "react";

const page = async () => {
  return (
    <div className="flex flex-col items-start gap-6 pt-[2rem] md:pt-[4rem] w-full max-sm:px-[0%] px-[25%] pb-20 dark:bg-[#18191A]">
      <div className="w-full text-center border-b border-gray-200  pb-5">
        <h3 className="font-bold font-livvic text-center text-xl leading-6 text-gray-900 dark:text-white ">
          Create Post
        </h3>
      </div>

      {/* Editor.JS */}
      <Editor />

      <div className="w-full flex justify-end">
        <Button
          type="submit"
          className="w-full"
          variant="green"
          form="topic-post-form"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default page;
