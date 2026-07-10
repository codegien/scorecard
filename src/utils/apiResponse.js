const success = (res, data = {}, message = 'Success', statusCode = 200) =>
  res.status(statusCode).json({ success: true, message, ...data });

const created = (res, data = {}, message = 'Created successfully') =>
  success(res, data, message, 201);

const error = (res, message = 'An error occurred', statusCode = 400, errors = null) =>
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });

const paginated = (res, { data, total, page, limit }, message = 'Success') =>
  res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      total,
      page:       parseInt(page),
      limit:      parseInt(limit),
      totalPages: Math.ceil(total / limit),
      hasNext:    page * limit < total,
      hasPrev:    page > 1,
    },
  });

module.exports = { success, created, error, paginated };
