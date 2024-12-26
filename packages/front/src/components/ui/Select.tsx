import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'}
            focus:ring-2 focus:ring-blue-500 p-2
            ${className}
          `}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';