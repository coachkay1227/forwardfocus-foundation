import { toast } from "@/hooks/use-toast";

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 'AUTHORIZATION_ERROR', 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded. Please try again later.') {
    super(message, 'RATE_LIMIT', 429);
    this.name = 'RateLimitError';
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, originalError?: Error) {
    super(message, 'DATABASE_ERROR', 500);
    this.name = 'DatabaseError';
    if (originalError) {
      console.error('Database error details:', originalError);
    }
  }
}

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  rethrow?: boolean;
}

export function handleError(
  error: unknown,
  options: ErrorHandlerOptions = {}
): AppError {
  const {
    showToast: shouldShowToast = true,
    logError = true,
    rethrow = false
  } = options;

  let appError: AppError;

  if (error instanceof AppError) {
    appError = error;
  } else if (error instanceof Error) {
    appError = new AppError(
      error.message,
      'UNKNOWN_ERROR',
      500,
      false
    );
  } else {
    appError = new AppError(
      'An unexpected error occurred',
      'UNKNOWN_ERROR',
      500,
      false
    );
  }

  if (logError) {
    console.error(`[${appError.code}] ${appError.message}`, {
      statusCode: appError.statusCode,
      isOperational: appError.isOperational,
      stack: appError.stack
    });
  }

  if (shouldShowToast) {
    toast({
      title: getErrorTitle(appError),
      description: getErrorMessage(appError),
      variant: 'destructive'
    });
  }

  if (rethrow) {
    throw appError;
  }

  return appError;
}

function getErrorTitle(error: AppError): string {
  switch (error.code) {
    case 'VALIDATION_ERROR':
      return 'Validation Error';
    case 'AUTH_ERROR':
      return 'Authentication Required';
    case 'AUTHORIZATION_ERROR':
      return 'Access Denied';
    case 'NOT_FOUND':
      return 'Not Found';
    case 'RATE_LIMIT':
      return 'Rate Limit Exceeded';
    case 'DATABASE_ERROR':
      return 'Database Error';
    default:
      return 'Error';
  }
}

function getErrorMessage(error: AppError): string {
  // Provide user-friendly messages
  if (error.isOperational) {
    return error.message;
  }
  
  // For non-operational errors, provide a generic message
  return 'An unexpected error occurred. Please try again or contact support if the problem persists.';
}

// Supabase error handler
export function handleSupabaseError(error: any): AppError {
  if (!error) {
    return new AppError('Unknown database error', 'DATABASE_ERROR');
  }

  // Handle specific Supabase error codes
  const code = error.code || error.error_code;
  const message = error.message || 'Database operation failed';

  switch (code) {
    case '23505': // Unique violation
      return new ValidationError('This record already exists');
    case '23503': // Foreign key violation
      return new ValidationError('Cannot delete record with existing dependencies');
    case '42501': // Insufficient privilege
      return new AuthorizationError('You do not have permission to perform this action');
    case 'PGRST116': // No rows returned
      return new NotFoundError('Resource');
    default:
      return new DatabaseError(message, error);
  }
}

// Async error wrapper for React components
export function withErrorHandler<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options?: ErrorHandlerOptions
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, options);
      return null;
    }
  }) as T;
}

// Validation helpers
export function validateRequired(
  value: any,
  fieldName: string
): asserts value is NonNullable<typeof value> {
  if (value === null || value === undefined || value === '') {
    throw new ValidationError(`${fieldName} is required`);
  }
}

export function validateEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email address');
  }
}

export function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string
): void {
  if (value.length < minLength) {
    throw new ValidationError(
      `${fieldName} must be at least ${minLength} characters`
    );
  }
}

export function validateMaxLength(
  value: string,
  maxLength: number,
  fieldName: string
): void {
  if (value.length > maxLength) {
    throw new ValidationError(
      `${fieldName} must not exceed ${maxLength} characters`
    );
  }
}
