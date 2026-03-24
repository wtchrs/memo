import { cva } from "class-variance-authority"
import type { PolymorphicPropsWithoutRef, PropsOfWithoutRef } from "@/utils/polymorphicProps"
import { twMerge } from "@/utils/customTailwindMerge"

const TextVariants = cva([
    'font-sans',
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

        weight: {
            regular: ['font-regular'],
            semibold: ['font-semibold'],
        },

        italic: {
            true: ['italic'],
        },

        strikethrough: {
            true: ['line-through'],
        },
    },
})

type TextOwnProps = {
    tone?: 'default' | 'brand' | 'danger' | 'muted'
    size?: 'sm' | 'md' | 'lg'
    weight?: 'regular' | 'semibold'
    italic?: boolean
    strikethrough?: boolean
}

export type TextProps = PolymorphicPropsWithoutRef<
    'p',
    'span' | 'strong' | 'em' | 'del',
    TextOwnProps,
    'dangerouslySetInnerHTML'
>

const semanticDefaults: Record<'p' | 'span' | 'strong' | 'em' | 'del', TextOwnProps> = {
    p: {},
    span: {},
    strong: {
        tone: 'brand',
        weight: 'semibold',
    },
    em: { italic: true },
    del: { strikethrough: true },
} as const


function Text({
    tone: t,
    size = 'md',
    weight: w,
    italic: i,
    strikethrough: s,
    as = 'p',
    className,
    children,
    ...nativeProps
}: TextProps) {
    const tone = t ?? semanticDefaults[as]?.tone ?? 'default'
    const weight = w ?? semanticDefaults[as]?.weight ?? 'regular'
    const italic = i ?? semanticDefaults[as]?.italic ?? false
    const strikethrough = s ?? semanticDefaults[as]?.strikethrough ?? false

    const resolvedClassName = twMerge(
        TextVariants({ tone, size, weight, italic, strikethrough }),
        className
    )

    switch (as) {
        // Cases of 'p' and 'del' are specified due to the type problem of `nativeProps`.
        case 'p': return (
            <p
                className={resolvedClassName}
                {...nativeProps as PropsOfWithoutRef<'p'>}
            >
                {children}
            </p>
        )

        case 'del': return (
            <del
                className={resolvedClassName}
                {...nativeProps as PropsOfWithoutRef<'del'>}
            >
                {children}
            </del>
        )

        default: {
            const Component = as
            return (
                <Component
                    className={resolvedClassName}
                    {...nativeProps}
                >
                    {children}
                </Component>
            )
        }
    }
}

export default Text
