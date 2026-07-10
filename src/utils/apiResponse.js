const success = (res, data= {}, message = 'Success', statusCode = 200) => res.status(statusCode).json({ seccess: true, message, ...data});
const created = (res, data = {}, message = 'Created Successfuly')=> success(res, data, message, 201);

module.exports = { success, created};