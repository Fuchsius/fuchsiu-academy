"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  extraLabel?: React.ReactNode;
}

export default function FormField({
  id,
  name,
  label,
  type,
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  extraLabel,
}: FormFieldProps) {
  if (type === "checkbox") {
    return (
      <div className="mb-6">
        <div className="flex items-start">
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={value as boolean}
            onChange={onChange}
            required={required}
            className="mt-1"
          />
          <label htmlFor={id} className="ml-2 text-sm text-gray-600">
            {label}
          </label>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-myprimary"
        >
          {label}
        </label>
        {extraLabel}
      </div>
      <input
        type={type}
        id={id}
        name={name}
        value={value as string}
        onChange={onChange}
        required={required}
        className={cn(
          "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mysecondary/20 focus:border-mysecondary transition-colors",
          error && "border-red-500"
        )}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
