// / lib/utils/error-formatter.ts
import { env } from '@/lib/config/env';

export function formatErrorMessage(error: Error): {
  userMessage: string;
  technicalDetails: string;
} {
  const errorTypeMessages: Record<string, string> = {
    SyntaxError: "The application encountered a formatting error.",
    ReferenceError: "The application tried to use something that doesn't exist.",
    TypeError: "The application encountered a type mismatch.",
    NetworkError: "Unable to connect to the server. Please check your internet connection.",
    AuthenticationError: "Your session has expired. Please log in again.",
  };

  const errorType = error.constructor.name;
  
  return {
    // In development, show more detailed messages
    userMessage: env.isDevelopment 
      ? `${errorTypeMessages[errorType] || "An unexpected error occurred."} (${error.message})`
      : errorTypeMessages[errorType] || "An unexpected error occurred.",
    technicalDetails: `${error.name}: ${error.message}\n${error.stack || ''}`
  };
}

