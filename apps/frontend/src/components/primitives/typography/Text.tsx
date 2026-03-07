import { cva } from "class-variance-authority"

const TextVariants = cva([
    'font-sans',
    'font-regular',
], {
    variants: {
        variant: {
            primary: ['text-primary'],
            secondary: ['text-fg'],
            danger: ['text-danger'],
        },
        size: {
            sm: ['text-sm'],
            md: ['text-base'],
            lg: ['text-lg'],
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
    },
})

interface TextProps {
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    label: string
    htmlTag?: 'p' | 'span'
}

function Text({
    variant = 'secondary',
    size = 'md',
    label,
    htmlTag = 'p',
}: TextProps) {
    const Component = htmlTag

    return (
        <Component className={TextVariants({ variant, size })}>
            {label}
        </Component>
    )
}

export default Text
