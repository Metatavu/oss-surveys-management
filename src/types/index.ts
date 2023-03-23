/**
 * Error context type
 */
export type ErrorContextType = {
  error?: string;
  setError: (message: string, error?: any) => void;
};