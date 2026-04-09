

export function errorHandling(err, req, res, next) {
  console.log(err)
  if(err.isOperational) {
    return res.status(err.statusCode).json({ message: err.userMessage })
  }
  return res.status(500).json({message: 'Something went wrong. Please try again later'})
}





// middlewares/error.middleware.js

export function errorHandling(err, req, res, next) {
  // 1. Устанавливаем дефолтные значения, если они не заданы
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // 2. Разделяем логику для Разработки и Продакшена
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
}

// Показываем всё (для тебя, пока кодишь)
function sendErrorDev(err, res) {
  console.error('DEBUG LOG 🔍:', err); // Полный лог в консоль
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack, // Показывает, в какой строке ошибка
    error: err
  });
}

// Показываем только то, что можно юзеру (для продакшена)
function sendErrorProd(err, res) {
  // А) Операционные ошибки (AppError): те, что мы создали сами (например, 401: Неверный пароль)
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message 
    });
  } 
  // Б) Программные ошибки (баги, падение сервера): скрываем детали
  else {
    console.error('FATAL ERROR 💥:', err); // Логируем для себя
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again later.'
    });
  }
}