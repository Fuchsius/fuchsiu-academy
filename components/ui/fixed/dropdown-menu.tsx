"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Create a context to manage dropdown state
interface DropdownMenuContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownMenuContext = React.createContext<
  DropdownMenuContextType | undefined
>(undefined);

// Hook to use dropdown context
const useDropdownMenu = () => {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a DropdownMenu");
  }
  return context;
};

interface DropdownMenuProps {
  children: React.ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownMenuContext.Provider>
  );
};

interface DropdownMenuTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ className, asChild = false, children, ...props }, ref) => {
  const { open, setOpen } = useDropdownMenu();

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
      ref: ref,
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
    const { open } = useDropdownMenu();

    return (
      <div
        ref={ref}
        data-dropdown-content
        data-state={open ? "open" : "closed"}
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
    const { setOpen } = useDropdownMenu();

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
      setOpen(false);

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

// Create a context for sub menus
interface DropdownSubMenuContextType {
  subOpen: boolean;
  setSubOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownSubMenuContext = React.createContext<
  DropdownSubMenuContextType | undefined
>(undefined);

const useDropdownSubMenu = () => {
  const context = React.useContext(DropdownSubMenuContext);
  if (!context) {
    throw new Error(
      "Dropdown submenu components must be used within a DropdownMenuSub"
    );
  }
  return context;
};

// New Sub Components
const DropdownMenuSub = ({ children }: DropdownMenuProps) => {
  const [subOpen, setSubOpen] = React.useState(false);

  return (
    <DropdownSubMenuContext.Provider value={{ subOpen, setSubOpen }}>
      <div className="relative group">{children}</div>
    </DropdownSubMenuContext.Provider>
  );
};
DropdownMenuSub.displayName = "DropdownMenuSub";

interface DropdownMenuSubTriggerProps
  extends Omit<DropdownMenuTriggerProps, "onClick"> {
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DropdownMenuSubTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuSubTriggerProps
>(({ className, children, disabled, ...props }, ref) => {
  const { subOpen, setSubOpen } = useDropdownSubMenu();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    e.stopPropagation(); // Prevent closing parent menus immediately
    setSubOpen(!subOpen);

    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <button
      type="button"
      ref={ref}
      data-state={subOpen ? "open" : "closed"}
      className={cn(
        "flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-100 data-[state=open]:bg-gray-100 hover:bg-gray-100",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
      <span className="ml-auto pl-2 text-xs">▶</span>
    </button>
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ className, children, align = "start", sideOffset = 2, ...props }, ref) => {
  const { subOpen } = useDropdownSubMenu();

  return (
    <div
      ref={ref}
      data-state={subOpen ? "open" : "closed"}
      className={cn(
        "absolute top-0 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-lg",
        "data-[state=closed]:hidden data-[state=open]:block",
        align === "start" && "left-full",
        align === "end" && "right-full",
        className
      )}
      style={{
        ...(align === "start" && { marginLeft: sideOffset }),
        ...(align === "end" && { marginRight: sideOffset }),
        marginTop: -(sideOffset + 30),
      }}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

const DropdownMenuPortal = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
DropdownMenuPortal.displayName = "DropdownMenuPortal";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
};
