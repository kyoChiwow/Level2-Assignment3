import { Response } from 'express';
import mongoose from 'mongoose';

const handleValidationError = (res: Response, error: mongoose.Error.ValidationError) => {
  const errors: Record<string, any> = {};
  
  Object.keys(error.errors).forEach((key) => {
    const err = error.errors[key];
    errors[key] = {
      message: err.message,
      name: err.name,
      properties: err.properties,
      kind: err.kind,
      path: err.path,
      value: err.value
    };
  });

  return res.status(400).json({
    message: 'Validation failed',
    success: false,
    error: {
      name: error.name, 
      errors           
    }
  });
};

export const handleCastError = (res: Response, error: mongoose.Error.CastError) => {
  return res.status(400).json({
    message: 'Invalid ID format',
    success: false,
    error: {
      name: error.name,
      message: `Invalid ${error.path}: ${error.value}`,
      path: error.path,
      value: error.value,
      kind: error.kind
    }
  });
};

export const handleError = (res: Response, error: any) => {
  if (error instanceof mongoose.Error.ValidationError) {
    return handleValidationError(res, error);
  }
  if (error instanceof mongoose.Error.CastError) {
    return handleCastError(res, error);
  }
  
  if (error.name === 'InsufficientCopiesError') {
    return res.status(400).json({
      message: error.message,
      success: false,
      error: {
        name: error.name,
        details: error.details
      }
    });
  }

  res.status(500).json({
    message: 'Internal server error',
    success: false,
    error: {
      name: error.name || 'UnknownError',
      message: error.message
    }
  });
};