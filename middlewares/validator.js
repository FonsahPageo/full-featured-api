import Joi from 'joi';

export const signupSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({
            tlds: { allow: ['com', 'net'] },
        }).messages({
            'string.email': 'Email must be a valid email of format username@domain.com',
            'string.empty': 'Email cannot be empty',
        }),
    password: Joi.string().min(6).required()
        .pattern(new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};': \"\\\\|,.<>\\/\\?])[A-Za-z\\d!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/\\?]{8,30}$")
        )
        .messages({
            'string.pattern.base': 'Password must be 8-30 characters long and include at least one uppercase, lowercase, number and special character',
            'string.empty': 'Password cannot be empty',
        })
});