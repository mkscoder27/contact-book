import React from 'react';
import { Button } from '../ui/Button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => (
  <div className="min-h-screen flex items-center justify-center" role="alert">
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Une erreur est survenue</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <Button onClick={resetErrorBoundary}>
        Réessayer
      </Button>
    </div>
  </div>
);