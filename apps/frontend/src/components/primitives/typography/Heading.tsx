import { cva } from "class-variance-authority"
import type { ReactNode } from "react"

const HeadingVariants = cva([
    'font-sans',
], {
    variants: {
        tone: {
            brand: ['text-primary'],
            default: ['text-fg'],
            danger: ['text-danger'],
            muted: ['text-muted'],
        },
        size: {
            sm: ['text-heading-sm'],
            md: ['text-heading-md'],
            lg: ['text-heading-lg'],
        }
    },
    defaultVariants: {
        tone: 'default',
    }
})

interface HeadingProps {
    tone?: 'brand' | 'default' | 'danger' | 'muted'
    size?: 'sm' | 'md' | 'lg'
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    children: ReactNode
}

const defaultSizeByTag = {
    h1: 'lg',
    h2: 'lg',
    h3: 'md',
    h4: 'md',
    h5: 'sm',
    h6: 'sm',
} as const

function Heading({
    tone = 'default',
    size,
    as = 'h3',
    children,
}: HeadingProps) {
    const Component = as
    const resolvedSize = size ?? defaultSizeByTag[as]

    return (
        <Component className={HeadingVariants({ tone, size: resolvedSize })}>
            {children}
        </Component>
    )
}

export default Heading
