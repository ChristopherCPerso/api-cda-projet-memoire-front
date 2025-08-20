import { forwardRef } from "react";
import { cn } from "~/utils/ui";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...inputProps }, ref) => (
    <>
      <label
        htmlFor={inputProps.id || inputProps.name}
        className="block text-sm"
      >
        {label}
      </label>
      <input
        ref={ref}
        className={cn("mt-1 block w-full rounded-md bg-white px-2 shadow-sm", {
          "border-2 border-red-700": error,
        })}
        {...inputProps}
      />
      {error && (
        <p className="text-left text-xs font-bold text-red-700">{error}</p>
      )}
    </>
  ),
);

Input.displayName = "Input";

export default Input;
