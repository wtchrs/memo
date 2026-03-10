import { cva } from "class-variance-authority"
import type { PolymorphicPropsWithoutRef } from "@/utils/polymorphicProps"
import { twMerge } from "@/utils/customTailwindMerge"

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

type TextOwnProps = {
    tone?: 'default' | 'brand' | 'danger' | 'muted'
    size?: 'sm' | 'md' | 'lg'
}

export type TextProps = PolymorphicPropsWithoutRef<
    'p',
    'span',
    TextOwnProps,
    'dangerouslySetInnerHTML'
>


function Text({
    tone = 'default',
    size = 'md',
    as = 'p',
    className,
    children,
    ...nativeProps
}: TextProps) {
    const Component = as
    const resolvedClassName = twMerge(TextVariants({ tone, size }), className)

    return (
        <Component
            className={resolvedClassName}
            {...nativeProps}
        >
            {children}
        </Component>
    )
}

export default Text
