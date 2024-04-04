import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome to AGreen Nature Connect</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Connecting you with local farms to bring fresh produce to your table.
        </p>
      </div>
      <div className="w-full max-w-sm space-y-4">
        <Button className="w-full">Continue</Button>
      </div>
    </div>
  );
}
