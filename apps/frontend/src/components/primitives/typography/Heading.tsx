import { cva } from "class-variance-authority"

const HeadingVariants = cva([
    'font-sans',
], {
    variants: {
        variant: {
            primary: ['text-primary'],
            secondary: ['text-fg'],
            danger: ['text-danger'],
        },
        size: {
            sm: ['text-heading-sm'],
            md: ['text-heading-md'],
            lg: ['text-heading-lg'],
        }
    },
    defaultVariants: {
        variant: 'secondary',
    }
})

interface HeadingProps {
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    label: string
    htmlTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
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
    variant = 'secondary',
    size,
    label,
    htmlTag = 'h3',
}: HeadingProps) {
    const Component = htmlTag
    const resolvedSize = size ?? defaultSizeByTag[htmlTag]

    return (
        <Component className={HeadingVariants({ variant, size: resolvedSize })}>
            {label}
        </Component>
    )
}

export default Heading
