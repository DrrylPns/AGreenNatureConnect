import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900",
  {
    variants: {
      variant: {
        default: "bg-zinc-900 text-zinc-100 hover:bg-zinc-800",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 outline outline-1 outline-zinc-300",
        subtle: "hover:bg-zinc-200 bg-zinc-100 text-zinc-900",
        ghost:
          "bg-transparent hover:bg-zinc-100 text-zinc-800 data-[state=open]:bg-transparent data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
        green:
          "bg-[#BAEBD4] px-3 py-2 font-medium font-poppins rounded-lg hover:shadow-lg hover:bg-[#4DE69E]/90 text-black font-bold",
        productTable: "bg-transparent text-white hover:text-opacity-50",
        newGreen:
          "bg-[#099073] hover:bg-[#099073]/80 px-3 py-2 font-medium font-poppins rounded-lg hover:shadow-lg text-black font-bold text-white ",
        darkGreen:
          " font-medium font-poppins text-black dark:text-white font-bold bg-transparent top-24",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        xs: "h-8 px-1.5 rounded-sm",
        lg: "h-11 px-8 rounded-md",
        darkthemebut: "h-2 pr-[20px] px-0",
        darkthemebut1: "h-8 mb-3 pr-[20px] px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
