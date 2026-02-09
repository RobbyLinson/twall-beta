"use client";

import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-0 right-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:right-0 sm:top-0 sm:flex-col md:max-w-105">
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        open,
        ...props
      }) {
        return (
          <div
            key={id}
            className={`group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all ${
              variant === "destructive"
                ? "border-red-500 bg-red-50 text-red-900"
                : "border-trinity-blue-200 bg-white"
            } ${open === false ? "opacity-0 translate-y-2" : "opacity-100"}`}
            {...props}
          >
            <div className="grid gap-1">
              {title && <div className="text-sm font-semibold">{title}</div>}
              {description && (
                <div className="text-sm opacity-90">{description}</div>
              )}
            </div>
            {action}
            <button
              type="button"
              onClick={() => dismiss(id)}
              className="absolute right-2 top-2 rounded p-1 text-gray-500 transition hover:text-gray-900"
              aria-label="Dismiss toast"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
