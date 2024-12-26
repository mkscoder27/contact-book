import React from 'react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

export function LoadingSpinner({ fullScreen = true }: LoadingSpinnerProps) {
  const spinnerClasses = "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600";
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className={spinnerClasses} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className={spinnerClasses} />
    </div>
  );
}