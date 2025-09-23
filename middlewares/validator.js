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
            'any.required': 'Email is required',
            'string.min': 'Email must meet minimum required length of 6 characters'
        }),
    password: Joi.string().min(8).required()
        .pattern(new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};': \"\\\\|,.<>\\/\\?])[A-Za-z\\d!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/\\?]{8,30}$")
        )
        .messages({ 
            'string.pattern.base': 'Password must be 8-30 characters long and include at least one uppercase, lowercase, number and special character',
            'string.empty': 'Password cannot be empty',
            'any.required': 'Password is required',
            'string.min': 'Password must meet minimum required length of 8 characters'
        })
});

export const signinSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({
            tlds: { allow: ['com', 'net'] },
        }).messages({
            'string.email': 'Email must be a valid email of format username@domain.com',
            'string.empty': 'Email cannot be empty',
            'any.required': 'Email is required',
            'string.min': 'Email must meet minimum required length of 6 characters'
        }),
    password: Joi.string().min(6).required()
        .pattern(new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};': \"\\\\|,.<>\\/\\?])[A-Za-z\\d!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/\\?]{8,30}$")
        )
        .messages({ 
            'string.pattern.base': 'Password must be 8-30 characters long and include at least one uppercase, lowercase, number and special character',
            'string.empty': 'Password cannot be empty',
            'any.required': 'Password is required',
            'string.min': 'Password must meet minimum required length of 6 characters'
        })
});