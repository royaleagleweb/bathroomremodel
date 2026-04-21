import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  error?: string;
  id: string;
};

export function Input({
  label,
  error,
  id,
  className = "",
  ...rest
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="label-above">
        {label}
      </label>
      <input
        id={id}
        className={`luxury-input ${error ? "luxury-input-error" : ""} ${className}`}
        {...rest}
      />
      {error && (
        <p className="mt-2 flex items-center gap-2 text-caption text-error">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-9.75a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zM10 14a1 1 0 100 2 1 1 0 000-2z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export function Select({
  label,
  error,
  id,
  children,
  className = "",
  ...rest
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="label-above">
        {label}
      </label>
      <select
        id={id}
        className={`luxury-input appearance-none pr-12 ${
          error ? "luxury-input-error" : ""
        } ${className}`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230F172A' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 20px center",
          backgroundSize: "20px",
        }}
        {...rest}
      >
        {children}
      </select>
      {error && (
        <p className="mt-2 text-caption text-error">{error}</p>
      )}
    </div>
  );
}

export function Textarea({
  label,
  error,
  id,
  className = "",
  ...rest
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="label-above">
        {label}
      </label>
      <textarea
        id={id}
        className={`luxury-input h-auto py-4 min-h-[160px] resize-y ${
          error ? "luxury-input-error" : ""
        } ${className}`}
        {...rest}
      />
      {error && (
        <p className="mt-2 text-caption text-error">{error}</p>
      )}
    </div>
  );
}
