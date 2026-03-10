import { cva } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import type { NativePropsWithoutRef } from "@/utils/polymorphicProps"

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

type HeadingOwnProps = {
    tone?: 'brand' | 'default' | 'danger' | 'muted'
    size?: 'sm' | 'md' | 'lg'
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export type HeadingProps =
    & HeadingOwnProps
    & NativePropsWithoutRef<'h1', HeadingOwnProps>

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
    className,
    children,
    ...nativeProps
}: HeadingProps) {
    const Component = as
    const resolvedSize = size ?? defaultSizeByTag[as]
    const resolvedClassName = twMerge(HeadingVariants({ tone, size: resolvedSize }), className)

    return (
        <Component
            className={resolvedClassName}
            {...nativeProps}
        >
            {children}
        </Component>
    )
}

export default Heading
