import z from 'zod'

export const createMemoSchema = z.object({
    type: z.enum(['TEXT', 'LINK', 'MEDIA'], { message: 'type must be TEXT, LINK or MEDIA' }),
    title: z.string(),
    content: z.string(),
    tags: z
        .array(z.string().nonempty({ message: 'Empty tag is not allowed' }))
        .optional()
})

export const updateMemoSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    tags: z
        .array(z.string().nonempty({ message: 'Empty tag is not allowed' }))
        .optional(),
})

export const memoIdSchema = z.uuid({ message: 'Memo id must be UUID' })
