import * as z from 'zod';

export const usernameSchema = z.string()
    .regex(/^[a-zA-Z0-9]+$/, { message: 'Only alphabets and numbers are allowed' })
    .max(255);

export const registerSchema = z
    .object({
        username: usernameSchema,
        email: z.email({ message: 'Not valid email format' }),
        password: z.string().max(255),
        passwordConfirm: z.string().max(255)
    })
    .refine((schema) => schema.password === schema.passwordConfirm, {
        message: 'password confirmation is different from password',
        path: ['password', 'passwordConfirm']
    });
