import { forwardRef } from "react";
import { cn } from "~/utils/ui";

interface TextareaProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  row?: number;
}

const TextArea = forwardRef<HTMLInputElement, TextareaProps>(
  ({ label, error, ...textareaProps }, ref) => (
    <>
      <label
        htmlFor={textareaProps.id || textareaProps.name}
        className="block text-sm"
      >
        {label}
      </label>
      <input
        ref={ref}
        className={cn("mt-1 block w-full rounded-md bg-white px-2 shadow-sm", {
          "border-2 border-red-700": error,
        })}
        {...textareaProps}
      />
      {error && (
        <p className="text-left text-xs font-bold text-red-700">{error}</p>
      )}
    </>
  ),
);

TextArea.displayName = "TextArea";

export default TextArea;
