import { cva } from "class-variance-authority"
import type { ReactNode } from "react"

const TextVariants = cva([
    'font-sans',
    'font-regular',
], {
    variants: {
        tone: {
            default: ['text-fg'],
            brand: ['text-primary'],
            danger: ['text-danger'],
            muted: ['text-muted'],
        },
        size: {
            sm: ['text-sm'],
            md: ['text-base'],
            lg: ['text-lg'],
        },
    },
    defaultVariants: {
        tone: 'default',
        size: 'md',
    },
})

interface TextProps {
    tone?: 'default' | 'brand' | 'danger' | 'muted'
    size?: 'sm' | 'md' | 'lg'
    as?: 'p' | 'span'
    children: ReactNode
}

function Text({
    tone = 'default',
    size = 'md',
    as = 'p',
    children,
}: TextProps) {
    const Component = as

    return (
        <Component className={TextVariants({ tone, size })}>
            {children}
        </Component>
    )
}

export default Text
