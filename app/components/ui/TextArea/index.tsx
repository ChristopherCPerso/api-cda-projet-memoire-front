"use client";
import { forwardRef } from "react";
import { cn } from "~/utils/ui";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  row?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, row, ...textareaProps }, ref) => (
    <>
      <label htmlFor={textareaProps.name} className="block text-sm">
        {label}
      </label>
      <textarea
        id={textareaProps.name}
        ref={ref}
        rows={row}
        className={cn(
          "mt-1 block w-full resize-none rounded-md bg-white px-2 shadow-sm",
          {
            "border-2 border-red-700": error,
          },
        )}
        {...textareaProps}
      ></textarea>
      {error && (
        <p className="text-left text-xs font-bold text-red-700">{error}</p>
      )}
    </>
  ),
);

TextArea.displayName = "TextArea";

export default TextArea;
