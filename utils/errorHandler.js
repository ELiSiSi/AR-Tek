import AppError from './appError.js';

// ===================== ERROR HANDLERS =====================

// Mongoose Validation Error (required fields, etc.)
const handleValidationError = (err) => {
  const messages = Object.values(err.errors).map((el) => el.message);
  const message = messages.join('. ');
  return new AppError(message, 400);
};

// Mongoose Duplicate Key Error (unique fields)
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];

  const fieldNames = {
    name: 'اسم المنتج',
    slug: 'اسم المنتج',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
  };

  const fieldLabel = fieldNames[field] || field;
  const message = `${fieldLabel} "${value}" موجود بالفعل، من فضلك استخدم قيمة مختلفة`;
  return new AppError(message, 400);
};

// Mongoose Cast Error (invalid ID format)
const handleCastError = (err) => {
  const message = `قيمة غير صحيحة للحقل: ${err.path}`;
  return new AppError(message, 400);
};

// ===================== SEND ERROR =====================

const sendError = (err, res) => {
  // Operational errors — رسائل مقصودة نبعتها للـ client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Unknown errors — منطبعش التفاصيل للـ client
  console.error('💥 ERROR:', err);
  return res.status(500).json({
    status: 'error',
    message: 'حدث خطأ غير متوقع، من فضلك حاول مرة أخرى',
  });
};

// ===================== GLOBAL ERROR HANDLER =====================

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = Object.assign(Object.create(Object.getPrototypeOf(err)), err);
  error.message = err.message;

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    error = handleValidationError(err);
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    error = handleDuplicateKeyError(err);
  }

  // Mongoose Cast Error (bad ID)
  if (err.name === 'CastError') {
    error = handleCastError(err);
  }

  sendError(error, res);
};

export default globalErrorHandler;
