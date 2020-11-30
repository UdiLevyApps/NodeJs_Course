import joi from 'joi';
export const productIdSchemaValidation = joi.string().length(36);
export const productNameSchemaValidation = joi.string().min(3);

// export const newProductSchema = joi.object().keys({
//   id: joi.forbidden(),
//   name: joi
//     .string()
//     .min(3)
//     .required()
//     .label('my label')
//     .error((e) => {
//       return errorResponseMessage(NetResponse.INVALID);
//     }),
//   categoryId: joi.string().length(36),
//   itemInStock: joi.number().optional(),
// });


// export const newProductIdValidation = joi.object().keys({
//   id: joi
//     .string()
//     .min(3)
//     .required()
//     .label('my label')
//     .error((e) => {
//       return errorResponseMessage(NetResponse.INVALID);
//     }),
//   categoryId: joi.string().length(36),
//   itemInStock: joi.number().optional(),
// });
