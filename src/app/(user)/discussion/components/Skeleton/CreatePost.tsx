import Skeleton from "react-loading-skeleton";

export default function CreatePostSkeleton() {
  return (
    <div className="flex justify-between items-center gap-5 bg-white dark:bg-[#18191A] rounded-lg drop-shadow-lg w-full px-5 py-5">
      <div className="pl-3">
        <Skeleton circle width={32} height={32} />
      </div>
      <div className="flex-1">
        <Skeleton height={32} />
      </div>
      <div className="pr-3">
        <Skeleton height={32} width={60} />
      </div>
    </div>
  );
}
