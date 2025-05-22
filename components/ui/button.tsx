import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",

          // Variant styles
          variant === "default" &&
            "bg-myprimary text-white hover:bg-myprimary/90",
          variant === "destructive" && "bg-red-500 text-white hover:bg-red-600",
          variant === "outline" &&
            "border border-input bg-background hover:bg-gray-100 hover:text-myprimary",
          variant === "secondary" &&
            "bg-mysecondary text-white hover:bg-mysecondary/90",
          variant === "ghost" && "hover:bg-gray-100 hover:text-myprimary",
          variant === "link" &&
            "text-myprimary underline-offset-4 hover:underline p-0 h-auto",

          // Size styles
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-8 px-3 rounded-md text-xs",
          size === "lg" && "h-12 px-8 rounded-md",
          size === "icon" && "h-9 w-9",

          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
