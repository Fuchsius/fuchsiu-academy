"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
));
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center rounded-md bg-gray-100 p-1", className)}
    {...props}
  />
));
TabsList.displayName = "TabsList";

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    // Create context for active tab state
    const [activeTab, setActiveTab] = React.useState<string | null>(null);
    // Create a local ref to use in the useEffect hook
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    // Setup combined ref
    const setRefs = React.useCallback(
      (element: HTMLButtonElement | null) => {
        // Update our local ref
        buttonRef.current = element;

        // Update the forwarded ref
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      },
      [ref]
    );

    // Find the Tabs parent to get the default value
    React.useEffect(() => {
      if (buttonRef.current) {
        // Find closest parent with data-state
        const closestTabsEl = buttonRef.current.closest("[data-state]");
        if (closestTabsEl) {
          setActiveTab(closestTabsEl.getAttribute("data-state"));
        }
      }
    }, []);

    const isActive = activeTab === value;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Set the active tab state
      setActiveTab(value);

      // If there's an onClick handler, call it
      if (props.onClick) {
        props.onClick(e);
      }

      // Find the TabsContent with this value and show it
      const tabsContent = document.querySelector(`[data-content="${value}"]`);
      if (tabsContent) {
        // Hide all tabs content
        document.querySelectorAll("[data-content]").forEach((el) => {
          el.setAttribute("data-state", "inactive");
          el.classList.add("hidden");
        });

        // Show this one
        tabsContent.setAttribute("data-state", "active");
        tabsContent.classList.remove("hidden");
      }
    };
    return (
      <button
        ref={setRefs}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        value={value}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mysecondary focus-visible:ring-offset-2",
          isActive
            ? "bg-white text-myprimary shadow-sm"
            : "text-gray-600 hover:text-myprimary",
          className
        )}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    // Check if this tab should be visible by default
    const isDefault = React.useRef(false);
    // Create a local ref to use in the useEffect hook
    const contentRef = React.useRef<HTMLDivElement | null>(null);

    // Setup combined ref
    const setRefs = React.useCallback(
      (element: HTMLDivElement | null) => {
        // Update our local ref
        contentRef.current = element;

        // Update the forwarded ref
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      },
      [ref]
    );

    // This happens once when component mounts
    React.useEffect(() => {
      if (contentRef.current) {
        // Find closest Tabs component and check if its default value matches this tab
        const closestTabsEl = contentRef.current.closest("[data-tabs]");
        if (closestTabsEl) {
          const defaultValue = closestTabsEl.getAttribute("data-default-value");
          isDefault.current = defaultValue === value;
        }
      }
    }, [value]);
    return (
      <div
        ref={setRefs}
        role="tabpanel"
        data-content={value}
        data-state={isDefault.current ? "active" : "inactive"}
        className={cn(
          "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mysecondary focus-visible:ring-offset-2",
          !isDefault.current && "hidden",
          className
        )}
        {...props}
      />
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
