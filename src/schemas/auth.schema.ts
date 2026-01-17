import z from 'zod';
import { usernameSchema } from './user.schema';

export const authSchema = z.object({
    username: usernameSchema,
    password: z.string().max(255),
})
