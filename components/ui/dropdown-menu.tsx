"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  children: React.ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  return <div className="relative">{children}</div>;
};

interface DropdownMenuTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ className, asChild = false, children, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(!open);

    if (props.onClick) {
      props.onClick(e);
    }
  };
  if (asChild && React.isValidElement(children)) {
    // Type assertion for the child component
    const child = children as React.ReactElement<{
      className?: string;
      onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    }>;

    // Get any existing className from child
    const childClassName = child.props.className || "";

    // Create a props object without ref (we'll handle ref separately)
    const childProps = {
      onClick: handleClick,
      "aria-expanded": open,
      "aria-haspopup": true,
      ...props,
      className: childClassName, // Preserve the child's className
    };

    // Create a new element with the merged props
    return React.cloneElement(child, childProps);
  }

  return (
    <button
      type="button"
      ref={ref}
      className={cn("", className)}
      aria-expanded={open}
      aria-haspopup={true}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(
  (
    { className, align = "center", sideOffset = 4, children, ...props },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const divRef = React.useRef<HTMLDivElement>(null);

    // Combine refs
    const setRefs = React.useCallback(
      (element: HTMLDivElement | null) => {
        // Update local ref
        divRef.current = element;

        // Forward the ref
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      },
      [ref]
    );

    // Listen for clicks outside to close the dropdown
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (divRef.current && !divRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          divRef.current.setAttribute("data-state", "closed");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div
        ref={setRefs}
        data-dropdown-content
        data-state="closed"
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md",
          "data-[state=closed]:hidden data-[state=open]:block",
          align === "start" && "origin-top-left left-0",
          align === "center" && "origin-top left-1/2 -translate-x-1/2",
          align === "end" && "origin-top-right right-0",
          className
        )}
        style={{ marginTop: sideOffset }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelect?: (event: React.MouseEvent<HTMLDivElement>) => void;
  asChild?: boolean;
  disabled?: boolean; // Added disabled prop
}

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(
  (
    { className, onSelect, asChild = false, disabled, children, ...props },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) {
        // Check if disabled
        event.preventDefault();
        return;
      }
      if (onSelect) {
        onSelect(event);
      }

      // Close the dropdown
      const dropdown = event.currentTarget.closest("[data-dropdown-content]");
      if (dropdown) {
        dropdown.setAttribute("data-state", "closed");
      }

      if (props.onClick) {
        props.onClick(event);
      }
    };
    if (asChild && React.isValidElement(children)) {
      // Type assertion for the child component
      const child = children as React.ReactElement<{
        className?: string;
        onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
      }>;

      // Get any existing className from child
      const childClassName = child.props.className || "";

      // Create a props object without ref (we'll handle ref separately)
      const childProps = {
        onClick: handleClick,
        className: cn(
          "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-myprimary hover:bg-gray-100 hover:text-myprimary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          childClassName
        ),
        "aria-disabled": disabled, // Added aria-disabled
        disabled: disabled, // Pass disabled to child if asChild
        ...props,
      };

      // Create a new element with the merged props
      return React.cloneElement(child, childProps);
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-myprimary hover:bg-gray-100 hover:text-myprimary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        onClick={handleClick}
        aria-disabled={disabled} // Added aria-disabled
        data-disabled={disabled ? "" : undefined} // Added data-disabled for styling
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-gray-100", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, // Added export
  DropdownMenuSeparator, // Added export
};
